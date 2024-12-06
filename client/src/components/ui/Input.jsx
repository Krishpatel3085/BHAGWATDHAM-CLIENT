'use client';

import React from 'react';
import clsx from 'clsx';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={clsx(
                'block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 placeholder:text-muted',
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'Input';
