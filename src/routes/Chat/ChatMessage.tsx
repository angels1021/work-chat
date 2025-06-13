import { useEffect, useRef } from 'react';
import { type Message, type MessageType, type InputType, MESSAGE_TYPES } from '../../api';
import { Greeting } from '@components';
import { MessageInput } from './MessageInput';
import { MessageAction } from './MessageAction';

const components = {
    [MESSAGE_TYPES.input]: MessageInput,
    [MESSAGE_TYPES.action]: MessageAction,
    [MESSAGE_TYPES.text]: (props: any) => null,
}

interface Props {
    message: Message<MessageType, InputType | undefined>;
}

export const ChatMessage = ({ message }: Props) => {
    const Component = components[message.type];

    if (!Component) return null;

    return (
        <div className="flex flex-col gap-10 justify-center items-center">
            <Greeting>{message.content}</Greeting>
            <Component {...message} />
        </div>
    );
};