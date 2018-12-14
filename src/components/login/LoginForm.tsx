import * as React from 'react';
import '../../styles/base.scss';
import '../../styles/login.scss';
import {IUser} from '../../models/IUser';
import * as Immutable from 'immutable';

export interface ILoginFormOwnProps {
    readonly users: Immutable.List<IUser>;
    readonly user: IUser;
}

export interface ILoginFormDispatchProps {
    readonly onUserAdd: (username: string) => void;
    readonly onUserLogin: (id: Uuid) => void;
    readonly onUserAuthentication: (email: string) => void;
}

type IProps = ILoginFormOwnProps & ILoginFormDispatchProps;

interface ILoginState {
    readonly username: string;
    readonly password: string;
}

export class LoginForm extends React.Component<IProps, ILoginState> {
    handleLoginChange = (event: any) => {
        event.persist();
        this.setState(() => ({ username: event.target.value }));
    };
    handlePasswordChange = (event: any) => {
        event.persist();
        this.setState(() => ({ password: event.target.value }));
    };
    handleSubmit = (event: any) => {
        event.preventDefault();
        // TODO: Move - this needs to be handled by thunk
        const newUser = this.props.users.find((user: IUser) => (user.nickname === this.state.username));
        if (newUser === null || newUser === undefined) {
            return;
        }

        this.props.onUserLogin(newUser.id);
        this.setState(_ => ({ username: '', password: '' }));
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render(): JSX.Element {
        return (
        <div className="login-form col-md-6 col-md-offset-4">
            <div className="box col-md-6 row justify-content-center align-items-center">
            <div className="shape1"/>
            <div className="shape2"/>
            <div className="float">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h4> Login </h4>
                    <div className="form-group">
                        <label placeholder="Username"
                               className="text-white"> Username: </label>
                        <br/>
                        <input type="text"
                               name="username"
                               id="username"
                               value={this.state.username}
                               onChange={this.handleLoginChange}
                               className="form-control" />
                    </div>
                    <div className="form-group">
                        <label placeholder="Password"
                               className="text-white"> Password: </label>
                        <br/>
                        <input type="password"
                               name="password"
                               id="password"
                               value={this.state.password}
                               onChange={this.handlePasswordChange}
                               className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               name="login"
                               className="btn btn-primary"
                               value="Login" />
                    </div>
                </form>
            </div>
            </div>
        </div>
        );
    }
}
