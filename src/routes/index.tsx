import { Outlet, type RouteObject, redirect, Navigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { Home } from './Home';
import { Dashboard, dashboardQueryOptions } from './Dashboard/Dashboard';
import { Chat, chatQueryOptions, Error as ChatError } from './Chat';
import { Review, reviewQueryOptions, Error as ReviewError } from './Review';
import { Login } from './Login';
import { Join } from './Join';
import { AuthenticatedRoute } from './AuthenticatedRoute';

export const queryClient = new QueryClient();

const App = () => (
    <div className="w-full h-full min-h-screen bg-cyan-600">
        <Outlet />
    </div>
)

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
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
                                    return queryClient.ensureQueryData(dashboardQueryOptions());
                                },
                            },
                            {
                                path: 'review/:historyId',
                                loader: ({ params: { historyId } }) => {
                                    return queryClient.ensureQueryData(reviewQueryOptions(historyId as string));
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
                            return queryClient.ensureQueryData(chatQueryOptions(chatId as string));
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
