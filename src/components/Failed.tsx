import { useNavigate } from 'react-router';
import { Button } from './Button';

interface Props {
    title: string;
    children?: React.ReactNode;
}

export const Failed = ({ title, children }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col flex-auto justify-between p-8 gap-4">
            <div className="flex flex-col gap-4 items-center justify-center h-full">
                <div className="text-6xl animate-pulse">😟</div>
                <div className="text-4xl font-bold text-center">{title}</div>
                {children}
                <Button onClick={() => navigate('/')}>Go to home</Button>
            </div>
        </div>
    );
}