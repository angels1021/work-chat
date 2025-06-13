import { type Chat, type InputType, type MessageType, type Message , MESSAGE_TYPES, INPUT_TYPES} from './chats.types';


export type Response<T extends InputType> = {
    id: string;
    response: T extends 'date' ? number : T extends 'select' ? string[] : string;
}

export type ChatHistory = {
    id: string;
    chatId: string;
    userId: string;
    title: string;
    started: number;
    ended: number;
    responses: Response<InputType>[];
}

export type ChatHistoryState = Omit<ChatHistory, 'id' | 'userId'>;

export type MessageWithResponse<T extends MessageType, I extends InputType | undefined> = Message<T, I> & {
    response?: T extends 'input' ? I extends InputType ? Response<I>['response'] : unknown : unknown;
};

export type ChatWithResponses = Omit<Chat, 'messages'> & {
    messages: MessageWithResponse<MessageType, InputType>[];
}

export type FullChatHistory = Omit<ChatHistory, 'responses'> & {
    messages: MessageWithResponse<MessageType, InputType>[];
}

// guards
export const isHistorySelect = (message: MessageWithResponse<MessageType, InputType>): message is MessageWithResponse<'input', 'select'>  => {
    return message.type === MESSAGE_TYPES.input && message.inputType === INPUT_TYPES.select && message.response instanceof Array;
}

export const isHistoryText = (message: MessageWithResponse<MessageType, InputType>): message is MessageWithResponse<'input', 'text'>  => {
    return message.type === MESSAGE_TYPES.input && message.inputType === INPUT_TYPES.text && typeof message.response === 'string';
}

export const isHistoryDate = (message: MessageWithResponse<MessageType, InputType>): message is MessageWithResponse<'input', 'date'>  => {
    return message.type === MESSAGE_TYPES.input && message.inputType === INPUT_TYPES.date && typeof message.response === 'number';
}