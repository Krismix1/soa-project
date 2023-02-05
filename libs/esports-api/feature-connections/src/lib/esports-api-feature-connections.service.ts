import { HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConnectionType } from '@project-assignment/shared/data-models-api';
import type { Node, Relationship } from 'neo4j-driver';
import * as Neode from 'neode';

export interface Neo4jUser {
  user_id: string;
}

export interface FriendshipConnection {
  connected_at: Date;
}

export interface RequestConnection {
  requested_at: Date;
}

export type UserConnection = { id: string | number; type: ConnectionType } & ({ to: string } | { from: string });

@Injectable()
export class EsportsApiFeatureConnectionsService implements OnModuleInit, OnModuleDestroy {
  private instance: Neode | undefined;
  private userModel!: Neode.Model<Neo4jUser>;

  async onModuleInit() {
    this.instance = new Neode('bolt://localhost:7687', 'username', 'password');
    this.userModel = this.instance.model('User', {
      user_id: {
        primary: true,
        type: 'string',
        required: true,
        unique: true,
      },
    });

    this.userModel.relationship(
      'requested',
      'relationships',
      'REQUESTED_CONNECTION',
      'out',
      'User',
      {
        requested_at: {
          type: 'datetime',
          required: true,
        },
      },
      true,
    );

    this.userModel.relationship(
      'connected',
      'relationships',
      'CONNECTED_WITH',
      'out',
      'User',
      {
        connected_at: {
          type: 'datetime',
          required: true,
        },
      },
      true,
    );

    await this.userModel.deleteAll();
    await Promise.all(['1', '2', '3', '4'].map((id) => this.createUser(id)));
    await Promise.all(
      ['2', '4'].map((id) => this.requestConnection('1', id).then(() => this.acceptConnection('1', id))),
    );
    await this.requestConnection('1', '3');
  }

  onModuleDestroy() {
    this.instance?.close();
  }

  async createUser(id: string) {
    await this.userModel?.create({ user_id: id });
  }

  async requestConnection(id_from: string, id_to: string) {
    if (id_from === id_to) {
      throw new HttpException("can't connect to self", HttpStatus.BAD_REQUEST);
    }
    if ((await this.areConnected(id_from, id_to)) || (await this.areWaitingForConnection(id_from, id_to))) {
      throw new HttpException(
        'users are already connected or have a pending connection request',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [fromNode, toNode] = await Promise.all([this.userModel.find(id_from), this.userModel.find(id_to)]);
    const relantionship = await fromNode.relateTo(toNode, 'requested', { requested_at: new Date() });
    return relantionship.id();
  }

  async acceptConnection(id_from: string, id_to: string) {
    if (!(await this.areWaitingForConnection(id_from, id_to))) {
      throw new HttpException('must request connection first', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.deleteConnection(id_from, id_to);

    const [fromNode, toNode] = await Promise.all([this.userModel.find(id_from), this.userModel.find(id_to)]);
    await fromNode.relateTo(toNode, 'connected', { connected_at: new Date() });
  }

  async deleteConnection(id_from: string, id_to: string) {
    const [fromNode, toNode] = await Promise.all([this.userModel.find(id_from), this.userModel.find(id_to)]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (fromNode as any).detachFrom(toNode);
  }

  async getConnections(id: string, opts: { includePending: boolean }): Promise<UserConnection[]> {
    const connections = await this.getAcceptedConnections(id);
    const c = connections.map((record) => {
      const relantionship = record.get(1) as Relationship;
      const connectedTo = record.get(2) as Node;
      return {
        id: relantionship.elementId,
        type: relantionship.type as ConnectionType,
        to: connectedTo.properties['user_id'] as string,
      };
    });
    const outgoingPendingConnection = opts.includePending ? await this.getPendingConnections(id, 'outgoing') : [];
    const outgoingPC = outgoingPendingConnection.map((record) => {
      const relantionship = record.get(1) as Relationship;
      const connectedTo = record.get(2) as Node;
      return {
        id: relantionship.elementId,
        type: relantionship.type as ConnectionType,
        to: connectedTo.properties['user_id'] as string,
      };
    });

    const incomingPendingConnection = opts.includePending ? await this.getPendingConnections(id, 'incoming') : [];
    const incomingPC = incomingPendingConnection.map((record) => {
      const relantionship = record.get(1) as Relationship;
      const connectedTo = record.get(2) as Node;
      return {
        id: relantionship.elementId,
        type: relantionship.type as ConnectionType,
        from: connectedTo.properties['user_id'] as string,
      };
    });

    return [...c, ...outgoingPC, ...incomingPC];
  }

  private async getAcceptedConnections(user1: string) {
    const result = await this.instance.cypher(
      'MATCH ( (u1:User {user_id: $idFrom})-[r:CONNECTED_WITH]->(u2:User) ) RETURN u1, r, u2 UNION ALL MATCH ( (u1:User {user_id: $idFrom})<-[r:CONNECTED_WITH]-(u2:User) ) RETURN u1, r, u2;',
      {
        idFrom: user1,
      },
    );
    return result.records;
  }

  private async getPendingConnections(user1: string, type: 'incoming' | 'outgoing') {
    const query =
      type === 'outgoing'
        ? 'MATCH ( (u1:User {user_id: $idFrom})-[r:REQUESTED_CONNECTION]->(u2:User) ) RETURN u1, r, u2'
        : 'MATCH ( (u1:User {user_id: $idFrom})<-[r:REQUESTED_CONNECTION]-(u2:User) ) RETURN u1, r, u2';

    const result = await this.instance.cypher(query, {
      idFrom: user1,
    });
    return result.records;
  }

  async areConnected(user1: string, user2: string): Promise<boolean> {
    const result = await this.instance.cypher(
      'RETURN EXISTS( (:User {user_id: $idFrom})-[:CONNECTED_WITH]-(:User {user_id: $idTo}) )',
      { idFrom: user1, idTo: user2 },
    );
    return result.records[0].get(0);
  }

  async areWaitingForConnection(user1: string, user2: string): Promise<boolean> {
    const result = await this.instance.cypher(
      'RETURN EXISTS( (:User {user_id: $idFrom})-[:REQUESTED_CONNECTION]-(:User {user_id: $idTo}) )',
      { idFrom: user1, idTo: user2 },
    );
    return result.records[0].get(0);
  }
}
