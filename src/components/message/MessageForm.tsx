import * as React from 'react';
import { IUser } from '../../models/IUser';
import {IMessageServerModel} from '../../models/IMessageServerModel';
import {Editor} from 'react-draft-wysiwyg';
import '../../styles/react-draft-wysiwyg.css';
import {
    convertToRaw,
    EditorState,
} from 'draft-js';
import {IUserAnnotation} from '../../models/IUserAnnotation';

export interface IMessageFormOwnProps {
    readonly loggedUser: IUser;
    readonly authToken: AuthToken;
    readonly selectedChannel: Uuid;
    readonly usersForAnnotation: ReadonlyArray<IUserAnnotation>;
}

export interface IMessageFormDispatchProps {
    readonly onMessageAdd: (message: IMessageServerModel, channelId: Uuid, authToken: AuthToken) => void;
}

interface IState {
    readonly value: string;
    readonly imageSrc: string;
    readonly editorState: EditorState;
}

type IProps = IMessageFormDispatchProps & IMessageFormOwnProps;

/**
 * Message Editor Class
 */
export class MessageForm extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: '',
            imageSrc: '',
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount(): any {
        document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    }

    private onSubmit = (): void => {
        const contentState = this.state.editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);

        if (rawContent.blocks[0].text === '') {
            return;
        }

        const newMessage = {
            value: JSON.stringify(rawContent),
            customData: {
                upvotes: 0,
                downvotes: 0,
            }
        };

        this.props.onMessageAdd(newMessage, this.props.selectedChannel, this.props.authToken);

        this.setState(_ => ({
            value: '',
            editorState: EditorState.createEmpty()
        }));
    };

    private onEditorStateChange = (editorState: EditorState) => (this.setState(() => ({ editorState })));

    private onKeyDown(e: KeyboardEvent): void {
        if (document.activeElement.className !== 'message-editor') {
            return;
        }
        if (!e.ctrlKey || e.key !== 'Enter') {
            return;
        }
        this.onSubmit();
    }

    uploadImageCallback = (file: File): Promise<any> => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                    this.setState(_ => ({
                        imageSrc: response.link || response.url,
                    }));
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    };

    public render(): JSX.Element | null {
        return (
            <div className="message-rich-text-input-container">
                <div id="rich-text-editor">
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="message-toolbar"
                        editorClassName="message-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            inline: { inDropdown: false },
                            blockType: {inDropdown: true},
                            list: { inDropdown: true },
                            textAlign: { inDropdown: false},
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            image: { uploadCallback: this.uploadImageCallback, alt: { present: true, mandatory: false },  alignmentEnabled: false },
                        }}
                        placeholder="Tell us your message..."

                        mention={{
                            separator: ' ',
                            trigger: '@',
                            suggestions: this.props.usersForAnnotation,
                        }}
                    />
                    <div id="message-submit-button">
                        <button type={'submit'} className={'btn btn-primary message-input-button'}
                                onClick={this.onSubmit}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}
