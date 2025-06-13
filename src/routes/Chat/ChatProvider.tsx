import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import type { Chat, InputType, ChatHistoryState, Response } from '@api';
import { saveHistory } from '@api';
import { ChatContext, type SummaryMessage } from './context';

type Props = {
    children: React.ReactNode;
    chat: Chat;
}

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
    }, [chat.messages, history, navigate]);

    const saveResponse = useCallback((response: Response<InputType>['response']) => {
        setHistory(current => ({ ...current, responses: [...current.responses, { id: activeMessage.id, response }] }));
        callNext();
    }, [callNext, activeMessage.id]);

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
    }), [chat.messages, chat.title, history]);

    useEffect(() => {
        // play first message
        if (activeIndex === 0) {
            callNext(-1);
        }
    }, [activeIndex, callNext]);

    useEffect(() => {
        setHistory(current => ({ ...current, started: Date.now(), title: chat.title, chatId: chat.id }));
    }, [chat.title, chat.id]);

    return (
        <ChatContext.Provider value={{ callNext, saveResponse, activeIndex, activeMessage, getChatSummary }}>
            {children}
        </ChatContext.Provider>
    );
}
