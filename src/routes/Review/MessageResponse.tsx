import type { MessageWithResponse, MessageType, InputType } from '@api';
import { isHistoryText, isHistorySelect, isHistoryDate } from '@api';
import { formatDateForDisplay } from '@utilities';
import { CheckboxButton } from '@components';

type Props = MessageWithResponse<MessageType, InputType>;

export const MessageResponse = (message: Props) => {
    if (!message.response) return <div className="opacity-50">No response</div>;

    if (isHistoryText(message)) return <div dangerouslySetInnerHTML={{ __html: message.response }} />;
    
    if (isHistorySelect(message)) return (
        <div className="flex flex-wrap gap-4">
            {message.options?.map((option: string) => (
                <CheckboxButton key={option} sizing="fit" id={option} name="selection" value={option} checked={message?.response?.includes(option)} readOnly>
                    {option}
                </CheckboxButton>
            ))}
        </div>
    );
    if (isHistoryDate(message)) return <div>{formatDateForDisplay(message?.response)}</div>

    return null;
};

