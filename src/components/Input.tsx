import { mergeClasses } from '@utilities';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    sizing?: 'sm' | 'md' | 'lg';
};

const baseClasses = 'border-b-3 text-white border-white peer user-invalid:border-red-700 [.invalid]:border-red-700';
const focusClasses = 'focus:outline-hidden focus:border-cyan-900';
const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';
const readOnlyClasses = 'read-only:focus:border-white';

const sizes = {
    sm: 'text-base',
    md: 'text-xl py-1',
    lg: 'text-4xl py-2',
}

export const Input = ({ className, sizing = 'lg', ...props }: Props) => {
    const calsses = mergeClasses(baseClasses, focusClasses, disabledClasses, readOnlyClasses, sizes[sizing], className);
    return (
        <input
            className={calsses}
            {...props}
        />
    )
}