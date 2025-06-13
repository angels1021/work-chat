import { mergeClasses } from "../utilities";

export const Greeting = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={mergeClasses("text-6xl leading-16 text-white leading-10", className)} {...props}>
        {children}
    </div>
);
