import { queryOptions, useQuery } from '@tanstack/react-query';
import { useParams, data } from 'react-router';

import { getChatById } from '@api';
import { ChatProvider } from './context';
import { ChatPlayer } from './ChatPlayer';


export const chatQueryOptions = (chatId: string) =>
    queryOptions({
        queryKey: ['chat', chatId],
        queryFn: async () => {
            try {
                return await getChatById(chatId);
            } catch (error) {
                throw new Error('Chat not found');
            }
        },
    });
    
export const Chat = () => {
    const { chatId } = useParams();
    const { data: chat, isLoading, isError } = useQuery(chatQueryOptions(chatId as string));

    if (isLoading) return <div>Loading...</div>;
    if (isError || !chat) throw data('Not found', { status: 404 });;

    return (
        <ChatProvider chat={chat}>
            <ChatPlayer />
        </ChatProvider>
    );
};

