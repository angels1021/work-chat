import { Outlet, type RouteObject, Navigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { Home } from './Home';
import { Dashboard, dashboardQueryOptions } from './Dashboard';
import { Chat, chatQueryOptions, Error as ChatError } from './Chat';
import { Review, reviewQueryOptions, Error as ReviewError } from './Review';
import { Login } from './Login';
import { Join } from './Join';
import { AuthenticatedRoute } from './AuthenticatedRoute';

export const QUERY_CLIENT = new QueryClient();

export const APP_ROUTES: RouteObject[] = [
    {
        path: '/',
        Component: () => (
            <div className="w-full h-full min-h-screen bg-background">
                <Outlet />
            </div>
        ),
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/join',
                Component: Join
            },
            {
                Component: AuthenticatedRoute,
                children: [
                    {
                        path: '/',
                        Component: Home,
                        children: [
                            {
                                index: true,
                                Component: Dashboard,
                                loader: () => {
                                    return QUERY_CLIENT.ensureQueryData(dashboardQueryOptions());
                                },
                            },
                            {
                                path: 'review/:historyId',
                                loader: ({ params: { historyId } }) => {
                                    return QUERY_CLIENT.ensureQueryData(reviewQueryOptions(historyId as string));
                                },
                                Component: Review,
                                ErrorBoundary: ReviewError
                            }

                        ],
                    },
                    {
                        path: '/chat/:chatId',
                        Component: Chat,
                        loader: ({ params: { chatId } }) => {
                            return QUERY_CLIENT.ensureQueryData(chatQueryOptions(chatId as string));
                        },
                        ErrorBoundary: ChatError
                    },
                    
                ],
            }, 
        ]
    },
    {
        path: '*',
        Component: () => <Navigate to="/" />
    }
    
];
