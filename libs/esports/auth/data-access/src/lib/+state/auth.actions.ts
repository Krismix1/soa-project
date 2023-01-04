/* eslint-disable @ngrx/prefer-inline-action-props */
import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '@project-assignment/shared/data-models-api';
import { SignUpCreds, UserCreds } from '../auth.service';

export const logIn = createAction('[Auth Page] Log in', props<UserCreds>());
export const logInSuccess = createAction('[Auth/API] Log in Success', props<LoginResponse>());
export const logInFailure = createAction('[Auth/API] Log in Failure', props<{ error: string }>());

export const logout = createAction('[Auth Page] Log out');

export const signUp = createAction('[Auth Page] Sign up', props<SignUpCreds>());
export const signUpSuccess = createAction('[Auth/API] Sign up Success');
export const signUpFailure = createAction('[Auth/API] Sign up Failure', props<{ error: string }>());

// export const LoginActions = createActionGroup({
//   source: 'Auth',
//   events: {
//     Login: props<UserCreds>(),
//     'Login Success': props<LoginResponse>(),
//     'Login Failure': props<{ error: string | null }>(),
//   },
// });
