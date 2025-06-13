import { queryOptions } from '@tanstack/react-query';
import { getChatTopics } from '@api';

export const dashboardQueryOptions = () =>
    queryOptions({
        queryKey: ['chatTopics'],
        queryFn: () => getChatTopics(),
    });