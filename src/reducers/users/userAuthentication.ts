import {TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED} from '../../constants/actionTypes';

export const userAuthentication = (prevState: string | null, action: Action): string | null => {
    switch (action.type) {
        case TOMATO_APP_AUTHENTICATION_TOKEN_RECEIVED:
            return action.payload.authenticator;
        default:
            return prevState;
    }
};
