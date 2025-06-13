import { FaCirclePlay } from 'react-icons/fa6';
import type { Message } from '@api';
import { Input, Button, ErrorMessage } from '@components';
import { useChat } from '../context';

type Props = Message<'input', 'text'>

export const InputText = ({ validation }: Props) => {
    const { saveResponse } = useChat();
    const handleSubmit = (formData: FormData) => {
        const value = formData.get('value') as string;
        // validation on the input so would be blocked by form;
        // todo: add sanitation?

        saveResponse(value);
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-10 items-center w-full">
            <div className="flex flex-col items-stretch w-full">
                <Input type="text" name="value" className="w-full" autoFocus pattern={validation.pattern} minLength={validation.minLength} maxLength={validation.maxLength} required={validation.required} />
                <ErrorMessage className="invisible peer-user-invalid:visible">{validation.errorMessage}</ErrorMessage>
            </div>
            <Button type="submit" size="lg" color="secondary">
                <span className="inline-flex items-center gap-4">
                    Continue <FaCirclePlay className="text-[1em]" />
                </span>
            </Button>
        </form>
    );
};