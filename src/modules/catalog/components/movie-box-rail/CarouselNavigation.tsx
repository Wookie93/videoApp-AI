import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const CarouselPrevButton: React.FC<CarouselButtonProps> = ({ onClick, disabled }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            aria-label="Previous slide"
        >
            <ChevronLeft className="h-6 w-6" />
        </Button>
    );
};

export const CarouselNextButton: React.FC<CarouselButtonProps> = ({ onClick, disabled }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            aria-label="Next slide"
        >
            <ChevronRight className="h-6 w-6" />
        </Button>
    );
};
