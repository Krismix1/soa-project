import { UserDetails } from '../auth/user.dto';

export type ConnectionType = 'CONNECTED_WITH' | 'REQUESTED_CONNECTION';
type ConnectionBase = {
  id: string | number;
  type: ConnectionType;
};
export type FriendConnection = ConnectionBase & {
  type: 'CONNECTED_WITH';
  to: UserDetails;
};

export type OutgoingPendingConnection = ConnectionBase & {
  type: 'REQUESTED_CONNECTION';
  to: UserDetails;
};
export type IncomingPendingConnection = {
  type: 'REQUESTED_CONNECTION';
  from: UserDetails;
};

export type PendingConnection = OutgoingPendingConnection | IncomingPendingConnection;
export type GetConnectionDTO = FriendConnection | PendingConnection;
