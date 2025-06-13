import { mergeClasses } from '@utilities';

const sizes = {
    sm: 'text-base p-2 min-w-10 rounded-md',
    md: 'text-lg py-2 px-4 min-w-20 rounded-lg',
    lg: 'text-2xl p-8 min-w-40 rounded-xl',
    fit: 'text-[0.85em] py-[0.25em] px-[0.5em] min-w-[2.5em] rounded-[0.25em]'
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: 'checkbox' | 'radio';
    className?: string;
    sizing?: keyof typeof sizes;
    children?: React.ReactNode;
}

const baseClasses = 'font-bold text-center bg-black/30 cursor-pointer transition-colors duration-200 shadow-xl';
const checkedClasses = 'has-checked:bg-accent-700 has-checked:ring-accent-700 has-checked:inset-shadow-sm';
const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';
const readOnlyClasses = 'read-only:pointer-events-none read-only:cursor-default';
const hoverClasses = 'hover:bg-accent-700';

export const CheckboxButton = ({ type = 'checkbox', children, id, className, readOnly, sizing = 'lg', ...props }: Props) => {
    const classes = mergeClasses(baseClasses, checkedClasses, disabledClasses, hoverClasses, readOnly ? readOnlyClasses : '', sizes[sizing], className);

    return (
        <label
            htmlFor={id}
            className={classes}
        >
            <input type={type} id={id} className="hidden" readOnly={readOnly} {...props} />
            {children}
        </label>
    )
}