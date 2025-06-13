import { createContext, useContext } from 'react';
import type { Message, MessageType, InputType, Response } from '@api';

export type SummaryMessage<T extends InputType> = {
    id: string;
    response: Response<T>['response'];
    inputType: InputType;
    question: string;
}

export type ChatSummary = {
    responses: SummaryMessage<InputType>[];
    title: string;
}

type ChatContextType = {
    callNext: (caller?: number) => void;
    saveResponse: (response: Response<InputType>['response']) => void;
    activeIndex: number;
    activeMessage?: Message<MessageType, InputType>;
    getChatSummary: () => ChatSummary;
}

export const ChatContext = createContext<ChatContextType>({
    callNext: (_caller?: number) => {},
    saveResponse: (_response: Response<InputType>['response']) => {},
    activeIndex: 0,
    getChatSummary: () => ({ responses: [], title: '' }),
});

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}