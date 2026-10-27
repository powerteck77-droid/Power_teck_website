'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface OEMSlide {
  id: string;
  src: string;
  alt: string;
  link?: string;
  title: string;
}

export const oemSliderSlides: OEMSlide[] = [
  {
    id: 'slide-water-heater',
    src: '/images/oem-slider/water-heater-banner.png',
    alt: 'Powerteck Water Heater - A Warm and Fuzzy Bathing Experience',
    link: '/oem-manufacturing',
    title: 'Powerteck Water Heater Appliance Manufacturing',
  },
  {
    id: 'slide-room-heater',
    src: '/images/oem-slider/room-heater-banner.png',
    alt: 'Powerteck Room Heater - Heating When You Need It, Cooling When You Want It',
    link: '/oem-manufacturing',
    title: 'Powerteck Room Heater OEM Production',
  },
  {
    id: 'slide-dry-iron',
    src: '/images/oem-slider/powerteck-dry-iron-banner.png',
    alt: 'Smooth and Easy Ironing with Powerteck Dry Irons - Keep Your Family Clothes Wrinkle-Free',
    link: '/oem-manufacturing',
    title: 'Powerteck Electric Dry Iron Private Label Supply',
  },
];

interface OEMImageSliderProps {
  slides?: OEMSlide[];
  autoSlideInterval?: number;
}

export function OEMImageSlider({
  slides = oemSliderSlides,
  autoSlideInterval = 5000,
}: OEMImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const isMultiple = totalSlides > 1;

  const nextSlide = useCallback(() => {
    if (!isMultiple) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides, isMultiple]);

  const prevSlide = useCallback(() => {
    if (!isMultiple) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides, isMultiple]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer with pause on hover/focus & respect for reduced motion
  useEffect(() => {
    if (!isMultiple) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoSlideInterval, isMultiple]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMultiple) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMultiple) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMultiple || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isMultiple) return;
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  if (totalSlides === 0) return null;

  return (
    <section
      ref={sliderRef}
      className="py-6 sm:py-8 bg-white border-t border-slate-200"
      aria-label="Powerteck OEM & Appliance Solutions Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full aspect-[16/8] sm:aspect-[16/6.5] lg:aspect-[16/6] rounded-2xl overflow-hidden bg-[#242424] shadow-xs border border-slate-200/80 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            const content = (
              <div className="relative w-full h-full flex items-center justify-center bg-[#1F1F1F]">
                {/* Background subtle blur fill for seamless fitting */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-lg scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${slide.src})` }}
                />

                {/* Main banner image preserving all client promotional text and layout without distortion */}
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                  className="object-contain relative z-10"
                  priority={index === 0}
                />
              </div>
            );

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  isActive
                    ? 'opacity-100 z-10 pointer-events-auto'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${totalSlides}: ${slide.title}`}
              >
                {slide.link ? (
                  <Link
                    href={slide.link}
                    className="relative w-full h-full block focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-2xl"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={slide.alt}
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}

          {/* Previous Arrow Button */}
          {isMultiple && (
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#292929]/80 hover:bg-[#292929] text-white flex items-center justify-center transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E50914] shadow-md cursor-pointer backdrop-blur-xs"
              aria-label="Previous OEM banner slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Next Arrow Button */}
          {isMultiple && (
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#292929]/80 hover:bg-[#292929] text-white flex items-center justify-center transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E50914] shadow-md cursor-pointer backdrop-blur-xs"
              aria-label="Next OEM banner slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Pagination Indicators */}
          {isMultiple && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    currentIndex === index
                      ? 'w-6 h-2 bg-[#E50914] rounded-full'
                      : 'w-2 h-2 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
                  aria-current={currentIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
