import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

type TParameterTooltipProps = {
    message: React.ReactNode;
    children: React.ReactNode;
    fieldRef: React.RefObject<HTMLDivElement>;
};

const ParameterTooltip = ({ message, children, fieldRef }: TParameterTooltipProps) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
    const triggerRef = React.useRef<HTMLSpanElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    const calculatePosition = React.useCallback(() => {
        if (!fieldRef.current || !tooltipRef.current) return;

        const fieldRect = fieldRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Position tooltip to the left of the field, vertically centered
        const top = fieldRect.top + scrollY + fieldRect.height / 2 - tooltipRect.height / 2;
        const left = fieldRect.left + scrollX - tooltipRect.width - 12; // 12px gap

        setTooltipPosition({ top, left });
    }, [fieldRef]);

    React.useEffect(() => {
        if (isVisible) {
            calculatePosition();
            window.addEventListener('scroll', calculatePosition);
            window.addEventListener('resize', calculatePosition);

            return () => {
                window.removeEventListener('scroll', calculatePosition);
                window.removeEventListener('resize', calculatePosition);
            };
        }
    }, [isVisible, calculatePosition]);

    const handleMouseEnter = React.useCallback(() => {
        setIsVisible(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleFocus = React.useCallback(() => {
        setIsVisible(true);
    }, []);

    const handleBlur = React.useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsVisible(false);
        }
    }, []);

    const tooltipId = React.useId();

    return (
        <>
            <span
                ref={triggerRef}
                className='trade-params__tooltip-trigger'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role='button'
                aria-describedby={isVisible ? tooltipId : undefined}
            >
                {children}
            </span>
            {typeof document !== 'undefined' &&
                isVisible &&
                createPortal(
                    <div
                        id={tooltipId}
                        ref={tooltipRef}
                        role='tooltip'
                        aria-live='polite'
                        className={classNames('trade-params__parameter-tooltip')}
                        style={{
                            position: 'absolute',
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            zIndex: 9999,
                        }}
                    >
                        <div className='trade-params__parameter-tooltip-content'>{message}</div>
                        <div className='trade-params__parameter-tooltip-arrow' />
                    </div>,
                    document.body
                )}
        </>
    );
};

export default ParameterTooltip;
