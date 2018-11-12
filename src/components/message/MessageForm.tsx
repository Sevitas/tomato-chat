import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { IUser } from '../../models/IUser';

export interface IMessageFormStateProps {

}

export interface IMessageFormOwnProps {
    readonly loggedUser: IUser;
}

export interface IMessageFormDispatchProps {
    readonly onMessageAdd: (text: string, username: string) => void;
}

interface IState {
    readonly value: string;
}

type IProps = IMessageFormDispatchProps & IMessageFormOwnProps & IMessageFormStateProps;

export class MessageForm extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: '',
        };
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.onMessageAdd(this.state.value, this.props.loggedUser.nickname);

        this.setState(_ => ({ value: '' }));
    };

    private onValueChanged = (event: any) => {
        const { value } = event.currentTarget;
        this.setState(_ => ({ value }));
    };

    render(): JSX.Element {
        return (
            <form className="message-form">
                <FormGroup controlId="formBasicText">
                    <ControlLabel> Message </ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        value={this.state.value}
                        placeholder="Click here to start typing..."
                        onChange={this.onValueChanged}
                    />
                </FormGroup>
                <button
                    type="submit"
                    className="btn btn-primary"
                    value={this.state.value}
                    onClick={this.onSubmit}
                >
                    Send
                </button>
            </form>
        );
    }
}
