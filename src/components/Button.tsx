const sizes = {
    sm: 'text-sm py-1 px-2 rounded-md',
    md: 'text-md py-2 px-4 rounded-lg',
    lg: 'text-4xl py-4 px-8 rounded-xl',
    fit: 'text-[0.85em] py-[0.5em] px-[0.75em] rounded-[0.25em]'
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary' | 'secondary' | 'highlight' | 'error';
    size?: keyof typeof sizes;
};

const baseClasses = 'rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active transition-colors duration-300',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active transition-colors duration-300',
    highlight: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active transition-colors duration-300',
    error: 'bg-error text-white hover:bg-error-hover active:bg-error-active transition-colors duration-300',
}

export const Button = ({ children, color = 'primary', size = 'md', className, ...props }: Props) => {
    return (
        <button className={[baseClasses, variants[color], sizes[size], className].filter(Boolean).join(' ')} {...props}>
            {children}
        </button>
    )
}