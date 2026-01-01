'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MovieBox } from '../MovieBox';
import { CarouselPrevButton, CarouselNextButton } from '@/modules/catalog/components/movie-box-rail/CarouselNavigation';

interface MovieBoxRailProps {
    movies?: any;
    items?: any;
}

const MovieBoxRail = ({ movies, items = 10 }: MovieBoxRailProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        skipSnaps: false,
        dragFree: true,
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [slidesInView, setSlidesInView] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    const updateSlidesInView = useCallback(() => {
        if (!emblaApi) return;
        setSlidesInView(emblaApi.slidesInView());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        updateSlidesInView();

        emblaApi.on('select', onSelect);
        emblaApi.on('slidesInView', updateSlidesInView);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('reInit', updateSlidesInView);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('slidesInView', updateSlidesInView);
            emblaApi.off('reInit', onSelect);
            emblaApi.off('reInit', updateSlidesInView);
        };
    }, [emblaApi, onSelect, updateSlidesInView]);

    // Re-initialize Embla when container width changes (e.g., sidebar toggle)
    useEffect(() => {
        if (!containerRef.current || !emblaApi) return;

        const resizeObserver = new ResizeObserver(() => {
            emblaApi.reInit();
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [emblaApi]);

    return (
        <div ref={containerRef}>
            <div className="flex items-center">
                <h2>Trending</h2>
                <div className="ml-auto flex items-center gap-2">
                    <CarouselPrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                    <CarouselNextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </div>
            </div>
            <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4 [&>div]:flex-shrink-0 [&>div]:basis-[55%] sm:[&>div]:basis-[40%] md:[&>div]:basis-[35%] lg:[&>div]:basis-[33%]">
                        {Array.from({ length: items }).map((_, index) => (
                            <div
                                key={index}
                            >
                                <MovieBox
                                    type="slider"
                                    movie={movies[index]}
                                    inView={slidesInView.includes(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieBoxRail;
