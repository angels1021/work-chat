import { FaDoorOpen, FaHouse } from 'react-icons/fa6';

import { NavLink } from '@components';
import { useAuth } from '../../auth';
import { HistoryList } from './HistoryList';

export const Sidebar = () => {
    const { logout } = useAuth();

    return (
        <div className="h-full overflow-x-hidden">
            <div className="flex flex-col flex-auto gap-4 justify-between h-full py-4 border-r-1 border-primary p-4">
                <nav className="flex flex-col justify-start gap-4 min-w-fit flex-1">
                    <NavLink to="/">
                        <FaHouse /> Home
                    </NavLink>
                    <HistoryList />
                </nav>
                <button onClick={logout} className="w-fit cursor-pointer hover:text-error-hover active:text-error-active">
                    <span className="flex gap-2 items-center">
                        <FaDoorOpen /> Logout
                    </span>
                </button>
            </div>
        </div>
    );
}