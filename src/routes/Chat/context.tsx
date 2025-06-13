import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { type Chat, type Message, type MessageType, type InputType, saveHistory, type ChatHistoryState, type Response } from '@api';

type Props = {
    children: React.ReactNode;
    chat: Chat;
}

// chat state to store
// id
// key
// started time
// ended time
// responses
//  - message index
//  - response
//  - message content
//  - message.type

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
    callNext: (caller?: number) => {},
    saveResponse: (response: Response<InputType>['response']) => {},
    activeIndex: 0,
    getChatSummary: () => ({ responses: [], title: '' }),
});

export const ChatProvider = ({ children, chat }: Props) => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [history, setHistory] = useState<ChatHistoryState>({ chatId: chat.id, title: chat.title, started: Date.now(), ended: 0, responses: [] });
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const activeMessage = chat.messages[activeIndex];

    const callNext = useCallback((caller?: number) => {
        setActiveIndex(current => {
            const to = (caller ?? current) + 1;
            if (to > chat.messages.length) return current;
            if (to === chat.messages.length) {
                saveHistory({ ...history, ended: Date.now() });
                // exit stack to not interupt the state update
                setTimeout(() => navigate('/'), 0);
                return current;
            };

            const message = chat.messages[to];
            if (timerRef.current) clearTimeout(timerRef.current);
            if (message && message.continue) {
                timerRef.current = setTimeout(() => callNext(to), 3000);
            }
            return to;
        });
    }, [chat.messages, history]);

    const saveResponse = useCallback((response: Response<InputType>['response']) => {
        setHistory(current => ({ ...current, responses: [...current.responses, { id: activeMessage.id, response }] }));
        callNext();
    }, [callNext, activeIndex]);

    const getChatSummary = useCallback(() => ({
        title: chat.title,
        responses: history.responses.map((response) => {
            const index = chat.messages.findIndex(message => message.id === response.id);
            if (index === -1) return null;
            const message = chat.messages[index];

            return {
                id: response.id,
                index,
                response: response.response,
                inputType: message.inputType as InputType,
                question: message.content,
            }
        }).filter(Boolean) as SummaryMessage<InputType>[]
    }), [chat.messages, history]);

    useEffect(() => {
        // play first message
        if (activeIndex === 0) {
            callNext(-1);
        }
    }, [activeIndex, callNext]);

    useEffect(() => {
        setHistory(current => ({ ...current, started: Date.now(), title: chat.title, chatId: chat.id }));
    }, [chat]);

    return (
        <ChatContext.Provider value={{ callNext, saveResponse, activeIndex, activeMessage, getChatSummary }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}