import * as Immutable from 'immutable';
import { combineReducers} from 'redux';
import { IMessages } from '../../models/ITomatoApp';
import { IMessage } from '../../models/IMessage';
import {
    TOMATO_APP_LOADING_MESSAGES_STARTED,
    TOMATO_APP_LOADING_MESSAGES_SUCCESS,
    TOMATO_APP_MESSAGE_CREATE_SUCCESS, TOMATO_APP_MESSAGE_DELETE_SUCCESS,
    TOMATO_APP_MESSAGE_UPDATE_SUCCESS,
} from '../../constants/actionTypes';

const messagesById = (prevState = Immutable.Map<Uuid, IMessage>(), action: Action): Immutable.Map<Uuid, IMessage> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_MESSAGES_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_MESSAGES_SUCCESS:
            return Immutable.Map(action.payload.messages.map((message: IMessage) => [message.id, message]));
        case TOMATO_APP_MESSAGE_CREATE_SUCCESS:
            return prevState.set(action.payload.message.id, action.payload.message);
        case TOMATO_APP_MESSAGE_UPDATE_SUCCESS: {
            const { message } = action.payload;

            return prevState.set(message.id, { ...message });
        }
        case TOMATO_APP_MESSAGE_DELETE_SUCCESS: {
            const { deletedMessageId } = action.payload;

            return prevState.delete(deletedMessageId);
        }
        default:
            return prevState;
    }
};

const allMessagesByIds = (prevState: Immutable.List<Uuid> = Immutable.List(), action: Action): Immutable.List<Uuid> => {
    switch (action.type) {
        case TOMATO_APP_LOADING_MESSAGES_STARTED:
            return prevState;
        case TOMATO_APP_LOADING_MESSAGES_SUCCESS:
            return Immutable.List(action.payload.messages.map((message: IMessage) => message.id));
        case TOMATO_APP_MESSAGE_CREATE_SUCCESS:
            return prevState.push(action.payload.message.id);
        case TOMATO_APP_MESSAGE_DELETE_SUCCESS: {
            const { deletedMessageId } = action.payload;
            return prevState.delete(prevState.indexOf(deletedMessageId));
        }
        default:
            return prevState;
    }
};

export const messages = combineReducers<IMessages>({
    allMessagesByIds,
    messagesById,
});
