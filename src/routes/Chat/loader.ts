import { queryOptions } from '@tanstack/react-query';

import { getChatById } from '@api';

export const chatQueryOptions = (chatId: string) =>
    queryOptions({
        queryKey: ['chat', chatId],
        queryFn: async () => getChatById(chatId),
    });
