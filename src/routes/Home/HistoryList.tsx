import { useState } from 'react';
import { FaRegComments, FaPlay, FaChevronDown } from 'react-icons/fa6';

import { getRecentHistory } from '@api';
import { formatDateForDisplay } from '@utilities';
import { NavLink } from '@components';

export const HistoryList = () => {
    const [isOpen, setIsOpen] = useState(true);
    const savedHistory = getRecentHistory() ?? [];

    const gridRows = isOpen ? 'grid-rows-[auto_1fr]' : 'grid-rows-[auto_0]';

    return (
        <div className={`grid ${gridRows} flex-1 transition-all duration-200 items-start`}>
            <NavLink to="/review/*" dummy onClick={() => setIsOpen(!isOpen)}>
                <span className="flex gap-2 justify-between w-full items-center">
                    <span className="flex gap-2 items-center">
                        <FaRegComments /> Recents
                    </span>
                    <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
            </NavLink>
            <div className="overflow-hidden h-full">
                <div className="flex flex-col py-2 gap-2 overflow-y-auto">
                    {savedHistory?.map(({ id, title, started }) => (
                        <NavLink key={id} to={`/review/${id}`} sizing="md" className="flex gap-2 items-center justify-between" activeClass="[&>:last-child]:visible" inactiveClass="hover:[&>:last-child]:visible">
                            <div>
                                <div className="text-base font-light text-nowrap text-ellipsis overflow-hidden">{title}</div>
                                <div className="text-xs font-light">{formatDateForDisplay(started)}</div>
                            </div>
                            <FaPlay className="invisible" />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}