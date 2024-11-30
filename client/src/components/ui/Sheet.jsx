import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { cn } from '../../Utilis/classNames'; // Utility function for conditional classes (optional)

export function Sheet({ children, ...props }) {
    return <Dialog.Root {...props}>{children}</Dialog.Root>;
}

export const SheetTrigger = forwardRef(({ children, ...props }, ref) => (
    <Dialog.Trigger ref={ref} {...props}>
        {children}
    </Dialog.Trigger>
));

SheetTrigger.displayName = 'SheetTrigger';

export const SheetContent = forwardRef(({ className, children, ...props }, ref) => (
    <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40" />
        <Dialog.Content
            ref={ref}
            {...props}
            className={cn(
                'fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transition-transform transform-gpu',
                'translate-x-0',
                className
            )}
        >
            {children}
            <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                ✕
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
));

SheetContent.displayName = 'SheetContent';
