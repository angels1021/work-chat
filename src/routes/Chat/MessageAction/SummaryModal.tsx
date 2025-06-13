import type { InputType } from '@api';
import { Modal, Button } from '@components';
import { formatDateForDisplay } from '@utilities';
import type { SummaryMessage, ChatSummary } from '../context';

interface Props {
    summary: ChatSummary;
    isOpen: boolean;
    onClose: () => void;
}

export const SummaryModal = ({isOpen, onClose, summary}: Props) => (
    <Modal isOpen={isOpen} title={`${summary.title} summary`} onClose={onClose}>
        <div className="flex flex-col gap-8 overflow-y-auto">
            {summary.responses.map((response: SummaryMessage<InputType>) => (
                <div key={response.id} className="flex flex-col gap-2 text-gray-400">
                    <div className="text-lg font-bold">{response.question}</div>
                    <div className="px-4 bg-foreground text-primary-400">
                        {response.inputType === 'date' && formatDateForDisplay(new Date((response as SummaryMessage<'date'>).response))}
                        {response.inputType === 'select' && (response as SummaryMessage<'select'>)?.response?.map((option: string) => <div key={option}>{option}</div>)}
                        {response.inputType === 'text' && response.response}
                    </div>
                </div>
            ))}
            <Button color="highlight" size="md" className="self-end" onClick={onClose}>Close summary</Button>
        </div>
    </Modal>
);