/**
 * {
  "id": "string",        // Unique identifier for the chat
  "title": "string",     // Display title of the chat service
  "description": "string", // Brief description of the chat service
  "messages": [          // Array of message objects
    {
      "id": "string",    // Unique identifier for the message
      "type": "string",  // Message type: "text", "input", or "action"
      "content": "string", // The message content or prompt
      "continue": "boolean", // Optional: if true, this next message should be sent immediately after this one
      "inputType": "string", // Required for "input" type: "text", "select", or "date"
      "options": [       // Required for "select" type: array of option strings
        "string"
      ],
      "validation": {    // Optional: validation rules for input
        "required": "boolean",
        "minLength": "number", // For "text" type
        "maxLength": "number", // For "text" type
        "pattern": "string", // For "text" type: regex pattern for validation
        "errorMessage": "string" // Error message to display if validation fails
      },
      "actions": [       // Required for "action" type: array of action objects
        {
          "type": "string", // "approve" or "deny"
          "label": "string" // Display text for the action button
        }
      ]
    }
  ]
}
 */

export const MESSAGE_TYPES = {
    text: 'text',
    input: 'input',
    action: 'action',
} as const;

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];

export const INPUT_TYPES = {
    text: 'text',
    select: 'select',
    date: 'date',
} as const;

export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];

export const ACTION_TYPES = {
    approve: 'approve',
    deny: 'deny',
} as const;

export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

export type Action = {
    type: ActionType;
    label: string;
}

type Validation<T extends InputType> = {
  required: boolean;
  errorMessage: string;
} & (T extends 'text' ? {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
} : unknown);

type InputMessage <T extends InputType> = {
  inputType: T;
  validation: Validation<T>;
} & (T extends 'select' ? {
  options: string[];
} : unknown);

type InputVerify<T extends InputType | undefined> = (
  T extends InputType ?
  InputMessage<T> :
  unknown);

export type Message<T extends MessageType, I extends InputType | undefined = undefined> = {
  id: string;
  type: T;
  content: string;
  continue?: boolean;
  inputType?: I;
} & (T extends 'action' ? { actions: Action[] } : T extends 'input' ? InputVerify<I> : unknown);

export interface Chat {
  id: string;
  title: string;
  description: string;
  messages: Message<MessageType, InputType | undefined>[];
}

export interface ChatTopic {
  id: string;
  title: string;
  description: string;
}

// guards
export const isTextMessage = (message: Message<MessageType, InputType | undefined>): message is Message<'input', 'text'> => message.type === MESSAGE_TYPES.input && message?.inputType === INPUT_TYPES.text;
export const isSelectMessage = (message: Message<MessageType, InputType | undefined>): message is Message<'input', 'select'> => message.type === MESSAGE_TYPES.input && message?.inputType === 'select';
export const isDateMessage = (message: Message<MessageType, InputType | undefined>): message is Message<'input', 'date'> => message.type === MESSAGE_TYPES.input && message?.inputType === 'date';
