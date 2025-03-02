import { useEffect, useRef, type ReactNode } from 'react';

interface ExpandableProps {
    expanded: boolean;
    children: ReactNode;
    className?: string;
}

export function Expandable({ expanded, children, className }: ExpandableProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        if (expanded) {
            content.style.maxHeight = `${content?.scrollHeight}px`;
            content.style.opacity = '1';
        } else {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            content.style.overflow = 'hidden';
        }
    }, [expanded]);

    const onAnimationEnd = () => {
        if (contentRef.current && expanded) {
            contentRef.current.style.overflow = 'visible';
        }
    };

    return (
        <div
            className={className}
            ref={contentRef}
            style={{
                transition:
                    'max-height 300ms ease-in-out, opacity 150ms ease-in-out',
            }}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </div>
    );
}
