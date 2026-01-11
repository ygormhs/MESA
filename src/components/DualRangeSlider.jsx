import { useState, useRef, useEffect, useCallback } from 'react';

export function DualRangeSlider({ min = 0, max = 24, step = 1, value, onChange }) {
    const sliderRef = useRef(null);
    const [dragging, setDragging] = useState(null); // 'min' or 'max' or null

    // Calculate percentage for position
    const getPercent = useCallback((val) => {
        return Math.round(((val - min) / (max - min)) * 100);
    }, [min, max]);

    // Convert mouse position to value
    const getValueFromClientX = useCallback((clientX) => {
        if (!sliderRef.current) return 0;
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        const rawValue = min + percent * (max - min);
        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
    }, [min, max, step]);

    const handleMouseDown = (thumbType) => (e) => {
        e.preventDefault();
        setDragging(thumbType);
    };

    const handleTouchStart = (thumbType) => (e) => {
        setDragging(thumbType);
    };

    useEffect(() => {
        const handleMove = (clientX) => {
            if (!dragging) return;

            const newValue = getValueFromClientX(clientX);

            if (dragging === 'min') {
                const newMin = Math.min(newValue, value[1] - step);
                if (newMin !== value[0]) onChange([newMin, value[1]]);
            } else {
                const newMax = Math.max(newValue, value[0] + step);
                if (newMax !== value[1]) onChange([value[0], newMax]);
            }
        };

        const handleMouseUp = () => {
            setDragging(null);
        };

        const onMouseMove = (e) => handleMove(e.clientX);
        const onTouchMove = (e) => handleMove(e.touches[0].clientX);
        const onTouchEnd = () => setDragging(null);

        if (dragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [dragging, value, onChange, step, getValueFromClientX]);

    return (
        <div className="relative w-full h-12 flex items-center select-none touch-none" ref={sliderRef}>
            {/* Track Background */}
            <div className="absolute w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                {/* Active Range */}
                <div
                    className="absolute h-full bg-primary transition-all duration-75 ease-out"
                    style={{
                        left: `${getPercent(value[0])}%`,
                        width: `${getPercent(value[1]) - getPercent(value[0])}%`
                    }}
                />
            </div>

            {/* Min Thumb */}
            <div
                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg z-10 cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform flex items-center justify-center -translate-x-1/2"
                style={{ left: `${getPercent(value[0])}%` }}
                onMouseDown={handleMouseDown('min')}
                onTouchStart={handleTouchStart('min')}
            >
                {/* Inner dot for styling */}
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {/* Expaced touch target */}
                <div className="absolute inset-[-12px]" />
            </div>

            {/* Max Thumb */}
            <div
                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg z-20 cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform flex items-center justify-center -translate-x-1/2"
                style={{ left: `${getPercent(value[1])}%` }}
                onMouseDown={handleMouseDown('max')}
                onTouchStart={handleTouchStart('max')}
            >
                {/* Inner dot for styling */}
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {/* Expanded touch target */}
                <div className="absolute inset-[-12px]" />
            </div>

            {/* Labels below */}
            <div className="absolute top-8 w-full flex justify-between text-[10px] text-muted-foreground font-semibold tracking-wide pointer-events-none opacity-70">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
            </div>
        </div>
    );
}
