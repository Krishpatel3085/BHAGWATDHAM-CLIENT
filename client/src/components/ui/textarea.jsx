import React from 'react'

export const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
        />
    )
}
