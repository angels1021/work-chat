import { v4 as uuid } from 'uuid';

import { historyStorage } from '@utilities';
import { getChatById } from './chats';
import { getCurrentUser } from './auth';
import type { ChatHistory, ChatHistoryState, FullChatHistory } from './history.types';

export const getHistory = (): ChatHistory[] => historyStorage.get();

export const getUserHistory = (): ChatHistory[] => {
    const userId = getCurrentUser()?.id;
    if (!userId) return [];
    const history: ChatHistory[] = getHistory() ?? [];
    return history.filter(h => h.userId === userId);
}

export const getRecentHistory = (): ChatHistory[] => {
    return getUserHistory().sort((a, b) => new Date(b.started).getTime() - new Date(a.started).getTime());
}

export const saveHistory = (history: ChatHistoryState) => {
    const userId = getCurrentUser()?.id;
    if (!userId) {
        console.warn('No userId provided, history will not be saved');
        return;
    }
    historyStorage.set([...getHistory(), { ...history, id: uuid(), userId }]);
}

export const getChatHistoryById = async(id: string): Promise<FullChatHistory> => {
    const history = getHistory().find(history => history.id === id);
    if (!history) {
        throw new Error('History not found');
    }
    const chat = await getChatById(history.chatId);
    const { responses, ...rest } = history;
    const messages = chat.messages.map((message) =>({ 
        ...message,
        response: responses.find(res => res.id === message.id)?.response
    }));
    return { ...rest, messages, title: chat.title };
}
