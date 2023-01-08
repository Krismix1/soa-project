import { createAction, props } from '@ngrx/store';
import { UserDetails } from '@project-assignment/shared/data-models-api';

export const getCurrentUserDetails = createAction('[User Page] Get current user details');
export const getCurrentUserDetailsSuccess = createAction(
  '[User/API] Get current user details Success',
  props<{ user: UserDetails }>(),
);
export const getCurrentUserDetailsFailure = createAction(
  '[User/API] Get current user details Failure',
  props<{ error: string }>(),
);

export const getUserDetails = createAction('[User Page] Get user details', props<{ id: number | string }>());
export const getUserDetailsSuccess = createAction(
  '[User/API] Get user details Success',
  props<{ user: UserDetails }>(),
);
export const getUserDetailsFailure = createAction('[User/API] Get user details Failure', props<{ error: string }>());
