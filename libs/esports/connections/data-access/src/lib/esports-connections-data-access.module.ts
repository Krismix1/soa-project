import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ConnectionsEffects } from './+state/connections.effects';
import { ConnectionsFacade } from './+state/connections.facade';
import * as fromConnections from './+state/connections.reducer';
import { ConnectionsService } from './connections.service';

@NgModule({
  providers: [
    ConnectionsService,
    provideState(fromConnections.CONNECTIONS_FEATURE_KEY, fromConnections.connectionsReducer),
    provideEffects([ConnectionsEffects]),
    ConnectionsFacade,
  ],
})
export class EsportsConnectionsDataAccessModule {}
