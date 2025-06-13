import onboardingChat from './mocks/onboarding.json';
import accessChat from './mocks/access.json';
import featureChat from './mocks/feature.json';
// import featureChat from './mocks/feature';
// import accessChat from './mocks/access';
// import onboardingChat from './mocks/onboarding';


import { type Chat,type ChatTopic } from './chats.types';

const chatsasDB = [onboardingChat, accessChat, featureChat];

export const getChatTopics = (): Promise<ChatTopic[]> => new Promise((resolve) => {
    const topics = chatsasDB.map(({ id, title, description }) => ({
        id,
        title,
        description,
    }));

    resolve(topics);
});

export const getChatById = (id: string): Promise<Chat> => new Promise((resolve, reject) => {
    const chat = chatsasDB.find(chat => chat.id === id);
    if (!chat) {
        reject(new Error(`Chat not found: ${id}`));
    }
    resolve(chat as Chat);
});
