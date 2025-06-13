import { useState } from 'react';
import { FaCheck, FaReply } from 'react-icons/fa';

import type { Message } from '@api';
import { Button } from '@components';
import { useChat } from '../context';
import { SummaryModal } from './SummaryModal';

type Props = Message<'action'>

export const MessageAction = ({ actions }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [confirm, again] = actions;
    const { getChatSummary, callNext } = useChat();
    const summary = getChatSummary();

    return (
        <>
            <div className="flex gap-4">
                <Button color="secondary" size="lg" onClick={() => setIsModalOpen(true)}>
                    <span className="inline-flex gap-4">
                        {again.label} <FaReply />
                    </span>
                </Button>
                <Button color="highlight" size="lg" onClick={() => callNext()}>
                    <span className="inline-flex gap-4">
                        {confirm.label} <FaCheck />
                    </span>
                </Button>
            </div>
            <SummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} summary={summary} />
        </>
    )
};