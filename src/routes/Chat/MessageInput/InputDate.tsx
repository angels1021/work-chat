import type { Message } from '@api';
import { DatePicker, ErrorMessage } from '@components';
import { useChat } from '../context';

type Props = Message<'input', 'date'>

export const InputDate = ({ validation }: Props) => {
    const { saveResponse } = useChat();

    const handleDateChange = (_inputValue: string, date?: Date | null) => {
        if (date) {
            saveResponse(date.getTime());
        }
    }
    return (
        <div className="self-center">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                <DatePicker value={null} onChange={handleDateChange} required />
                <ErrorMessage className="hidden peer-user-invalid:visible">{validation.errorMessage}</ErrorMessage> 
            </label>
        </div>
    );
};