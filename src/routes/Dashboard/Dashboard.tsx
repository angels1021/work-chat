import { Link } from 'react-router';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getChatTopics } from '@api';

export const dashboardQueryOptions = () =>
    queryOptions({
        queryKey: ['chatTopics'],
        queryFn: () => getChatTopics(),
    });

export const Dashboard = () => {
    const { data: chatTopics } = useQuery(dashboardQueryOptions());

    return (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
                <h1 className="text-6xl font-bold">What whould you like to do?</h1>
                {chatTopics?.map(({ title, description, id }) => (
                    <Link
                        key={id}
                        to={`/chat/${id}`}
                        aria-label={description}
                        className="w-1/2 shadow-lg p-6 bg-gray-900 font-bold text-5xl text-white hover:bg-primary transition-colors duration-300"
                    >
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-base font-light">{description}</p>
                    </Link>
                ))}
            </div>
    );
};