import { type Chat } from '../chats.types';

const featureChat: Chat = {
  "id": "650e8400-e29b-41d4-a716-446655440003",
  "title": "Feature Request",
  "description": "Submit a new feature request to our Product team.",
  "messages": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "text",
      "content": "Welcome to the Feature Request process. Let's help you submit your feature request.",
      "continue": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "type": "text",
      "content": "First, let's understand what type of feature you're requesting:",
      "continue": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "type": "input",
      "content": "Select the feature category:",
      "inputType": "select",
      "options": [
        "User Interface",
        "Backend System",
        "API Enhancement",
        "Performance Optimization",
        "Security Feature",
        "Integration",
        "Other"
      ],
      "validation": {
        "required": true,
        "errorMessage": "Please select a feature category"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "type": "text",
      "content": "Please provide a clear title for your feature request:",
      "continue": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "type": "input",
      "content": "Enter feature title:",
      "inputType": "text",
      "validation": {
        "required": true,
        "minLength": 10,
        "maxLength": 100,
        "errorMessage": "Title must be between 10 and 100 characters"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440005",
      "type": "text",
      "content": "Now, let's understand the problem this feature will solve:",
      "continue": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440006",
      "type": "input",
      "content": "Describe the problem:",
      "inputType": "text",
      "validation": {
        "required": true,
        "minLength": 50,
        "maxLength": 1000,
        "errorMessage": "Description must be between 50 and 1000 characters"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440007",
      "type": "action",
      "content": "Please review your feature request. Would you like to submit?",
      "actions": [
        {
          "type": "approve",
          "label": "Submit Request"
        },
        {
          "type": "deny",
          "label": "Review Again"
        }
      ]
    }
  ]
};

export default featureChat; 