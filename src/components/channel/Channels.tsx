import * as React from 'react';
import {List} from 'immutable';
import {ChannelListContainer} from '../../containers/channel/ChannelListContainer';
import {IMessage} from '../../models/IMessage';
import {IUser} from '../../models/IUser';

export interface IChannelsStateProps {
    readonly loggedUser: IUser;
}

export interface IChannelsDispatchProps {
    readonly onChannelAdd: (name: string, order: number, messages: List<IMessage>, users: List<Uuid>) => void;
}

interface IState {
    readonly value: string;
    readonly nextOrder: number;
}

export class Channels extends React.Component<IChannelsStateProps & IChannelsDispatchProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            nextOrder: Object.values(this.props.loggedUser.channels).length,
        };
    }

    handleChannelCreation = (event: any) => {
        event.preventDefault();

        this.props.onChannelAdd(this.state.value, this.state.nextOrder, List(), List<Uuid>().push(this.props.loggedUser.id));

        this.setState(prevState => ({ value: '', nextOrder: prevState.nextOrder + 1 }));
    };

    handleNewChannelNameChange = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ value }));
    };

    render(): JSX.Element {
        return (
            <div className="channels">
                <header>
                    <h4>Channels</h4>
                </header>
                <ChannelListContainer />
                <div className="channel-creation">
                    <form onSubmit={this.handleChannelCreation}>
                        <input
                            value={this.state.value}
                            onChange={this.handleNewChannelNameChange}
                            placeholder="New Channel" />
                    </form>
                </div>
            </div>
        );
    }
}
