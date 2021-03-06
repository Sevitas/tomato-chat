import {List} from 'immutable';
import {IUserServerModel} from '../../../models/IUserServerModel';
import {TOMATO_APP_USER_CHANNELS_STARTED, TOMATO_APP_USER_LOGIN_SUCCESS} from '../../../constants/actionTypes';
import {IUser} from '../../../models/IUser';

export const userServerModelHelper = {email: 'test@test.com',
    customData: {id: 'as6d4as', selectedChannel: 'qqqqqq', nickname: 'nick',
        avatarId: 'sddadas', channels: List(['aaaaa'])}} as IUserServerModel;

export const userServerModelHelper_2 = {email: 'test2@test.com',
    customData: {id: 'as6d4as2', selectedChannel: 'qqqqqq', nickname: 'nick2',
        avatarId: 'sddadas', channels: List(['aaaaa'])}} as IUserServerModel;

export const userServerModelHelperWithUri = {email: userServerModelHelper.email,
    customData: {...userServerModelHelper.customData, avatarUrl: 'aa.ddd.cccc'}};

export const userHelper = {id: 'as6d4as', channels: List(['aaaaa']), selectedChannel: 'qqqqqq', nickname: 'nick',
                           avatarId: 'sddadas', email: 'test@test.com', avatarUrl: 'aa.ddd.cccc'} as IUser;
export const userHelper_2 = {id: 'as6d4as2', channels: List(['aaaaa']), selectedChannel: 'qqqqqq', nickname: 'nick2',
    avatarId: 'sddadas', email: 'test2@test.com', avatarUrl: 'aa.ddd.cccc'} as IUser;

export const expectedUserChannelStarted = {type: TOMATO_APP_USER_CHANNELS_STARTED};

export const expectedLoginSuccess = {type: TOMATO_APP_USER_LOGIN_SUCCESS,
    payload: {
        user: userHelper,
    }};

export const getDownloadLinkApiCallTest = (fileId: Uuid, authToken: AuthToken) => {
    return Promise.resolve({data: {fileUri: userHelper.avatarUrl}});
};

export const getDownloadLinkApiCallTestReject = (fileId: Uuid, authToken: AuthToken) => {
    return Promise.reject({error: {}});
};
