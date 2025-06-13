import { mergeClasses } from '../utilities';

const baseClasses = 'text-red-700 text-sm';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const ErrorMessage = ({ className, ...props }: Props) => (
    <p className={mergeClasses(baseClasses, className)} {...props} role="alert" />
)