import { useState, useRef, useEffect } from 'react';
import { FaCalendar } from 'react-icons/fa6';
import { inputStringFromDate } from '../../utilities';
import { Input } from '../Input';
import { CalanderPicker } from './CalanderPicker';
import './datePicker.css';

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'value' | 'onChange'> {
    value: Date | null;
    onChange: (inputValue: string, date?: Date | null) => void;
    className?: string;
    min?: Date;
    max?: Date;
}

export const DatePicker = ({ value, onChange, className, min, max, ...props }: DatePickerProps) => {
    const [inputValue, setInputValue] = useState(value ? inputStringFromDate(value) : '');
    const [dateValue, setDateValue] = useState(value || null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setInputValue(date);
        setDateValue(new Date(date));
        onChange?.(date, new Date(date));
        setIsOpen(false);
    }

    const handlePickerChange = (date: Date | null) => {
        const stringDate = date ? inputStringFromDate(date) : '';
        setInputValue(stringDate);
        setDateValue(date);
        onChange?.(stringDate, date);
        setIsOpen(false);
    }

    const handleInputClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${className || ''}`} ref={containerRef}>
            <FaCalendar className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-[2em]" onClick={handleInputClick} />
            <Input
                {...props}
                type="date"
                value={inputValue}
                onClick={handleInputClick}
                onChange={handleInputChange}
            />
            {isOpen && (
                <CalanderPicker value={dateValue} onSelect={handlePickerChange} min={min} max={max} className="absolute mt-2" />
            )}
        </div>
    );
}; 