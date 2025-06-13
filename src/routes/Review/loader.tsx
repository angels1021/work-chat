import { queryOptions } from '@tanstack/react-query';

import { getChatHistoryById } from '@api';

export const reviewQueryOptions = (historyId: string) =>
    queryOptions({
        queryKey: ['review', historyId],
        queryFn: () => getChatHistoryById(historyId),
    });