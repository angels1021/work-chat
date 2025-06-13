import { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import type { Message } from '@api';
import { Button, ErrorMessage, CheckboxButton } from '@components';
import { useChat } from '../context';

type Props = Message<'input', 'select'>

export const InputSelect = ({ options, validation }: Props) => {
    const [error, setError] = useState(false);
    const { saveResponse } = useChat();

    const handleSelection = (formData: FormData) => {
        const selection = formData.getAll('selection') as string[];
        if (validation.required && !selection?.length) {
            setError(true);
            return;
        }
        saveResponse(selection);
    }
    const onSelect = () => {
        setError(false);
    }

    return (
        <form className="flex flex-col gap-10 items-center" action={handleSelection}>
            <div className="flex flex-wrap gap-6 justify-center">
            {options.map((option) => (
                <CheckboxButton key={option} id={option} name="selection" value={option} onChange={onSelect}>{option}</CheckboxButton>
            ))}
        </div>
            <div className="flex flex-col gap-2">
                <ErrorMessage className={!error ? 'invisible' : ''}>{validation.errorMessage}</ErrorMessage>
                <Button type="submit" size="lg" color="secondary">
                    <span className="inline-flex items-center gap-4">
                        Continue <FaCirclePlay className="text-[1em]" />
                    </span>
                </Button>
            </div>
        </form>
    );
};