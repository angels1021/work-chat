import { type Message, type InputType, isTextMessage, isSelectMessage, isDateMessage } from '@api';
import { InputText } from './InputText';
import { InputSelect } from './InputSelect';
import { InputDate } from './InputDate';

type Props = Message<'input', InputType>

export const MessageInput = (props: Props) => {
    if (isTextMessage(props)) {
        return <InputText {...props} />;
    }
    if (isSelectMessage(props)) {
        return <InputSelect {...props} />;
    }
    if (isDateMessage(props)) {
        return <InputDate {...props} />;
    }
    return null;
};