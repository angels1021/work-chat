import { useQuery } from '@tanstack/react-query';
import { useParams, data } from 'react-router';

import { ChatProvider } from './ChatProvider';
import { ChatPlayer } from './ChatPlayer';
import { chatQueryOptions } from './loader';
    
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

