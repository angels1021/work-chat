import { queryOptions, useQuery } from '@tanstack/react-query';
import { useParams, data } from 'react-router';

import { FaCheck } from 'react-icons/fa';
import { getChatHistoryById, type MessageType, type MessageWithResponse, type InputType, type Message, isHistoryText, isHistorySelect, isHistoryDate } from "@api";
import { formatDateForDisplay } from "@utilities";
import { CheckboxButton, Button } from '@components';

export const reviewQueryOptions = (historyId: string) =>
    queryOptions({
        queryKey: ['review', historyId],
        queryFn: () => getChatHistoryById(historyId),
    });

const Answer = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 bg-foreground rounded-xl">{children}</div>
)

const renderInput = (message: MessageWithResponse<MessageType, InputType>) => {
    if (!message.inputType) return null;
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
}

export const Review = () => {
    const { historyId } = useParams();
    const { data: history, isLoading, isError } = useQuery(reviewQueryOptions(historyId as string));

    if (isLoading) return <div>Loading...</div>;
    if (isError || !history) throw data('Not found', { status: 404 });

    return (
        <div className="relative flex flex-col flex-auto justify-between p-8 gap-4 m-4 border border-white rounded-lg bg-white/10 text-xl">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-cyan-300 text-2xl font-bold">{history?.title}</h1>
                    <div className="text-white text-sm font-light">
                        Played: {formatDateForDisplay(history.started, true)}
                    </div>
                </div>
                {history?.messages.map((message) => (
                    <div key={message.id}>
                        <div className="text-gray-400 mb-2">{message.content}</div>
                        <>
                            {message.response && message.type === 'input' ? (
                                <Answer>{renderInput(message)}</Answer>
                            ): null}
                            {message.type === 'action' ? (
                                <Answer>
                                    <Button size="fit" color="highlight" disabled>
                                        <span className="inline-flex gap-2 items-center">
                                            {(message as Message<'action'>)?.actions?.[0].label} <FaCheck />
                                        </span>
                                    </Button>
                                </Answer>
                            ) : null}
                        </>
                    </div>
                ))}
            </div>
        </div>
    );
}