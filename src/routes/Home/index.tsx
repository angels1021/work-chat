import { useState } from 'react';
import { Outlet } from 'react-router';
import { FaChevronLeft } from 'react-icons/fa6';

import { Sidebar } from './Sidebar';

export const Home = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`grid bg-foreground ${isOpen ? 'grid-cols-[18%_1fr]' : 'grid-cols-[0_1fr]'} h-screen w-screen transition-all duration-300`}>
            <aside className="relative text-white w-full h-full">
                <Sidebar />
                <button onClick={() => setIsOpen(!isOpen)} className={`absolute top-0 right-0 rounded-full  bg-white text-gray-800 p-2 transition-all duration-300 delay-100 ${isOpen ? 'translate-1/2' : 'translate-x-10 translate-y-1/2 rotate-180'}`}>
                    <FaChevronLeft />
                </button>
            </aside>
            <main className="flex flex-col p-8 bg-gradient-to-br bg-foreground max-h-screen overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};