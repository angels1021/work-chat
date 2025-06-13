import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { mergeClasses } from '../../utilities';

interface CalanderPickerProps {
    value: Date | null;
    onSelect: (date: Date | null) => void;
    className?: string;
    min?: Date;
    max?: Date;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export const CalanderPicker = ({ value, onSelect, min, max, className }: CalanderPickerProps) => {
    const [viewDate, setViewDate] = useState(value || new Date());

    const prevMonth = () => {
        setViewDate(current => new Date(current.getFullYear(), current.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setViewDate(current => new Date(current.getFullYear(), current.getMonth() + 1, 1));
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value, 10), 1));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setViewDate(new Date(parseInt(e.target.value, 10), viewDate.getMonth(), 1));
    };

    const handleDayClick = (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        onSelect(newDate);
    };

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const numDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    const startYear = min ? min.getFullYear() : new Date().getFullYear() - 100;
    const endYear = max ? max.getFullYear() : new Date().getFullYear() + 10;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    const prevMonthDisabled = min ? new Date(year, month, 0) < new Date(min.toDateString()) : false;
    const nextMonthDisabled = max ? new Date(year, month + 1, 1) > new Date(max.toDateString()) : false;

    return (
        <div className={mergeClasses("p-4 bg-white text-black rounded-lg shadow-2xl z-10 border border-gray-200", className)}>
            <div className="w-80">
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={prevMonth} disabled={prevMonthDisabled} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FaChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="flex gap-2">
                        <select
                            value={month}
                            onChange={handleMonthChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-white text-gray-800"
                        >
                            {monthNames.map((name, index) => {
                                const monthIsDisabled = (min && new Date(year, index + 1, 0) < new Date(min.toDateString())) || 
                                                        (max && new Date(year, index, 1) > new Date(max.toDateString()));
                                return <option key={name} value={index} disabled={monthIsDisabled}>{name}</option>;
                            })}
                        </select>
                        <select
                            value={year}
                            onChange={handleYearChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-white text-gray-800"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <button type="button" onClick={nextMonth} disabled={nextMonthDisabled} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FaChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {dayNames.map(day => <div key={day} className="font-semibold text-sm text-gray-500 py-2">{day}</div>)}
                    {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                    {days.map(day => {
                        const dayDate = new Date(year, month, day);
                        const isSelected = value && value.toDateString() === dayDate.toDateString();
                        const isToday = new Date().toDateString() === dayDate.toDateString();
                        const isDisabled = (min && dayDate < new Date(min.toDateString())) || (max && dayDate > new Date(max.toDateString()));
                        
                        const dayClasses = `p-2 rounded-full transition-colors duration-200 ${
                            isDisabled
                                ? 'text-gray-300 cursor-not-allowed'
                                : isSelected 
                                ? 'bg-cyan-600 text-white' 
                                : isToday 
                                ? 'bg-cyan-100 text-cyan-800' 
                                : 'text-gray-700 hover:bg-cyan-50 cursor-pointer'
                        }`;
                        
                        return (
                            <div key={day} className={dayClasses} onClick={() => !isDisabled && handleDayClick(day)}>
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}; 