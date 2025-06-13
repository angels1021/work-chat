# Work Chat

A chat application for helping employees run through common request

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd work-chat
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Folder Structure

```
src/
├── api/
│   ├── mocks/
│   │   ├── access.json
│   │   ├── access.ts
│   │   ├── feature.json
│   │   ├── feature.ts
│   │   ├── onboarding.json
│   │   └── onboarding.ts
│   ├── auth.ts
│   ├── auth.types.ts
│   ├── chats.ts
│   ├── chats.types.ts
│   ├── history.ts
│   ├── history.types.ts
│   └── index.ts
├── assets/
│   └── react.svg
├── auth/
│   ├── AuthProvider.tsx
│   ├── context.tsx
│   └── index.ts
├── components/
│   ├── DatePicker/
│   │   ├── CalanderPicker.tsx
│   │   ├── DatePicker.tsx
│   │   ├── datePicker.css
│   │   └── index.ts
│   ├── Button.tsx
│   ├── CheckboxButton.tsx
│   ├── ErrorMessage.tsx
│   ├── Failed.tsx
│   ├── Greeting.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── NavLink.tsx
│   └── index.ts
├── routes/
│   ├── Chat/
│   │   ├── MessageAction/
│   │   │   ├── SummaryModal.tsx
│   │   │   └── index.tsx
│   │   ├── MessageInput/
│   │   │   ├── InputDate.tsx
│   │   │   ├── InputSelect.tsx
│   │   │   ├── InputText.tsx
│   │   │   └── index.tsx
│   │   ├── Chat.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatPlayer.tsx
│   │   ├── ChatProvider.tsx
│   │   ├── Error.tsx
│   │   ├── context.tsx
│   │   ├── index.ts
│   │   └── loader.ts
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── index.ts
│   │   └── loader.ts
│   ├── Home/
│   │   ├── HistoryList.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.tsx
│   ├── Review/
│   │   ├── Error.tsx
│   │   ├── MessageResponse.tsx
│   │   ├── Review.tsx
│   │   ├── index.ts
│   │   └── loader.tsx
│   ├── AuthenticatedRoute.tsx
│   ├── Join.tsx
│   ├── Login.tsx
│   └── index.tsx
├── utilities/
│   ├── date.ts
│   ├── global.ts
│   ├── index.ts
│   └── storage.ts
├── index.css
├── main.tsx
└── vite-env.d.ts
```

## Built With

*   [React](https://reactjs.org/) - The web framework used
*   [Vite](https://vitejs.dev/) - Build tool
*   [TypeScript](https://www.typescriptlang.org/) - Language
*   [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
*   [React Query](https://tanstack.com/query/latest) - Data fetching and state management
*   [React Hook Form](https://react-hook-form.com/) - Form validation
*   [React Router](https://reactrouter.com/) - Routing
*   [React Icons](https://react-icons.github.io/react-icons/) - Icons
*   [UUID](https://github.com/uuidjs/uuid) - For generating unique IDs
*   [ESLint](https://eslint.org/) - Linter
