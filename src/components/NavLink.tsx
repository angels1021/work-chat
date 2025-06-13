import { Link, useMatch, type LinkProps } from 'react-router';

import { mergeClasses } from '@utilities';

const baseClasses = "text-xl font-black flex gap-2 items-center transition-colors duration-300";
const activeClasses = "text-primary";
const inactiveClasses = "text-white hover:text-primary hover:bg-foreground";

const sizes = {
    md: "text-base",
    lg: "text-xl",
}

interface Props extends LinkProps {
    activeClass?: string;
    inactiveClass?: string;
    sizing?: keyof typeof sizes;
    dummy?: boolean;
}

export const NavLink = ({ to, sizing = 'lg', children, className, activeClass, inactiveClass, dummy, ...props }: Props) => {
    const isActive = useMatch(to as string);
    const classes = mergeClasses(
        baseClasses,
        isActive ? mergeClasses(activeClasses, activeClass) : mergeClasses(inactiveClasses, inactiveClass),
        sizes[sizing],
        className
    );

    return dummy ? (
        <div className={classes} {...props as React.HTMLAttributes<HTMLDivElement>}>{children}</div>
    ) : (
        <Link to={to} className={classes} {...props}>{children}</Link>
    );
}
