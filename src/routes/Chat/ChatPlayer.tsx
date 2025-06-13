
import { useChat } from './context';
import { ChatMessage } from './ChatMessage';

export const ChatPlayer = () => {
    const { activeMessage } = useChat();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
            <div className="w-2/3">
                {activeMessage && (
                    <ChatMessage message={activeMessage} />
                )}
            </div>
        </div>
    );
};
