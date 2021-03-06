import {
    TOMATO_APP_MESSAGE_EDITING_FAILED,
    TOMATO_APP_CHANNEL_EDITING_FAILED,
    TOMATO_APP_LOADING_USERS_FAILED,
    TOMATO_APP_LOADING_CHANNELS_FAILED,
    TOMATO_APP_LOADING_MESSAGES_FAILED,
    TOMATO_APP_USER_LOGIN_FAILED,
    TOMATO_APP_USER_LOGOUT_FAILED,
    TOMATO_APP_AUTHENTICATION_TOKEN_FAILED,
    TOMATO_APP_USER_UPDATE_FAILED,
    TOMATO_APP_USER_REGISTER_FAILED,
    TOMATO_APP_MESSAGE_CREATE_FAILED,
    TOMATO_APP_MESSAGE_UPDATE_FAILED,
    TOMATO_APP_MESSAGE_DELETE_FAILED,
    TOMATO_APP_CHANNEL_CREATE_FAILED,
    TOMATO_APP_CHANNEL_DELETE_FAILED,
    TOMATO_APP_FILE_CREATE_FAILED,
    TOMATO_APP_GET_FILE_FAILED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED,
    TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS, TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED
} from '../constants/actionTypes';

export const errorMessage = (prevState: string | null = null, action: Action): string | null  => {
    switch (action.type) {
        case TOMATO_APP_MESSAGE_EDITING_FAILED:
        case TOMATO_APP_CHANNEL_EDITING_FAILED:
        case TOMATO_APP_LOADING_USERS_FAILED:
        case TOMATO_APP_LOADING_CHANNELS_FAILED:
        case TOMATO_APP_LOADING_MESSAGES_FAILED:
        case TOMATO_APP_USER_LOGIN_FAILED:
        case TOMATO_APP_USER_LOGOUT_FAILED:
        case TOMATO_APP_AUTHENTICATION_TOKEN_FAILED:
        case TOMATO_APP_USER_UPDATE_FAILED:
        case TOMATO_APP_USER_REGISTER_FAILED:
        case TOMATO_APP_MESSAGE_CREATE_FAILED:
        case TOMATO_APP_MESSAGE_UPDATE_FAILED:
        case TOMATO_APP_MESSAGE_DELETE_FAILED:
        case TOMATO_APP_CHANNEL_CREATE_FAILED:
        case TOMATO_APP_CHANNEL_DELETE_FAILED:
        case TOMATO_APP_FILE_CREATE_FAILED:
        case TOMATO_APP_GET_FILE_FAILED:
        case TOMATO_APP_CLEAR_ERROR_MESSAGE_FAILED:
            return action.payload;

        case TOMATO_APP_CLEAR_ERROR_MESSAGE_SUCCESS:
            return null;

        case TOMATO_APP_CLEAR_ERROR_MESSAGE_STARTED:
        default:
            return prevState;
    }
};
