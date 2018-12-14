import { Dispatch } from 'redux';
import { updateUser as updateUserApi, getUsers as getUsersApi} from '../../api/chatRepository';
import {
    TOMATO_APP_USER_LOGIN_STARTED,
    TOMATO_APP_USER_LOGIN_SUCCESS,
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_CHANNELS_STARTED,
    TOMATO_APP_USER_CHANNELS_SUCCESS,
    TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED
} from '../../constants/actionTypes';
import {IUser} from '../../models/IUser';
import {IState} from '../../common/IState';
import * as Immutable from 'immutable';
import axios from 'axios';
import {USER_AUTH_URI} from '../../constants/apiConstanst';

const updateUserStarted = (): Action => ({
    type: TOMATO_APP_USER_LOGIN_STARTED,
});

const userAuthenticationFailed = (): Action => ({
    type: TOMATO_APP_USER_LOGIN_FAILED,
});

const userAuthenticateSuccess = (authenticationToken: String): Action => ({
    type: TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED,
    payload: {
        authenticator: `Bearer ${authenticationToken}`
    }
});

const updateUserSuccess = (user: IUser): Action => ({
    type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user,
    }
});

const updateUserChannelsStarted = (): Action => ({
    type: TOMATO_APP_USER_CHANNELS_STARTED,
});

const updateUserChannelsSuccess = (users: Immutable.List<IUser>): Action => ({
    type: TOMATO_APP_USER_CHANNELS_SUCCESS,
    payload: {
        users,
    }
});

export const authenticateUser = (email: String): any =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch(updateUserStarted());

        const config = {
            headers: {
                accept: 'text/plain',
                'Content-Type': 'application/json'
            }
        };

        const data = {
            email: `${email}`
        };

        return axios.post(USER_AUTH_URI, data, config)
            .then((response) => {
                dispatch(userAuthenticateSuccess(response.data.token));
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
                dispatch(userAuthenticationFailed());
            });
    };

export const logInUser = (id: Uuid): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateUserStarted());

        const loggedUser = getState().tomatoApp.users.usersById.get(id);

        dispatch(updateUserSuccess(loggedUser));
    };

export const updateUserChannels = (id: Uuid, channels: Immutable.List<Uuid>): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<void> => {
        dispatch(updateUserChannelsStarted());

        const oldUser = getState().tomatoApp.users.usersById.get(id);
        const user = await updateUserApi({ ...oldUser, channels });

        dispatch(updateUserChannelsSuccess(Immutable.List(await getUsersApi())));
        dispatch(updateUserSuccess(user));
    };
