import { ITomatoApp } from '../models/ITomatoApp';
import { editedMessageId } from './message/editedMessageId';
import { editedChannelId } from './channel/editedChannelID';
import {user, userId} from './users/userId';
import { isEditing } from './isEditing';
import { isTyping } from './isTyping';
import { users } from './users/users';
import { messageFilter } from './message/messageFilter';
import { channelFilter } from './channel/channelFilter';
import { channels } from './channel/channels';
import { messages } from './message/messages';
import {userAuthentication} from './users/userAuthentication';

export const tomatoApp = (prevState = {} as ITomatoApp, action: Action): ITomatoApp => ({
    users: users(prevState.users, action),
    messages: messages(prevState.messages, action),
    channels: channels(prevState.channels, action),
    editedMessageId: editedMessageId(prevState.editedMessageId, action),
    editedChannelId: editedChannelId(prevState.editedChannelId, action),
    messageFilter: messageFilter(prevState.messageFilter, action),
    channelFilter: channelFilter(prevState.channelFilter, action),
    isEditing: isEditing(prevState.isEditing, action),
    isTyping: isTyping(prevState.isTyping, action),
    userId: userId(prevState.userId, action),
    loggedUser: user(prevState.loggedUser, action),
    authToken: userAuthentication(prevState.authToken, action),
});
