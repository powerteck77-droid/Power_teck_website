'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: string;
  src: string;
  alt: string;
  link: string;
  title: string;
  badge?: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 'slide-family-comfort',
    src: '/branding/ChatGPT-Image-Jul-21-2026-12_41_15-PM.png',
    alt: 'Powerteck Runs Faster Than Air - High Speed Ceiling & Pedestal Fans for Whole Family Living Room Comfort',
    link: '/products?category=ceiling-and-bldc-fans',
    title: 'Family Comfort & Powerful Airflow',
    badge: 'Runs Faster Than Air',
  },
  {
    id: 'slide-air-coolers',
    src: '/branding/resized_1600x586.jpg.png',
    alt: 'Powerteck Air Coolers - Heavy Duty Desert, Commercial and Glass Top Coolers with Honeycomb Pads',
    link: '/products?category=air-coolers',
    title: 'High-Performance Air Coolers',
    badge: 'Heavy Duty Cooling',
  },
  {
    id: 'slide-home-appliances',
    src: '/branding/resized_1600x586-1.jpg.png',
    alt: 'Powerteck Complete Range of Home Appliances - Air Coolers, Ceiling Fans, Mixer Grinders, Kitchen Chimneys, Home Theaters and Irons',
    link: '/products',
    title: 'Complete Range of Home Appliances',
    badge: 'Manufacturing Excellence',
  },
  {
    id: 'slide-ceiling-fans',
    src: '/branding/1655884628433-scaled-1.png',
    alt: 'Powerteck Decorative High Speed Ceiling Fans & BLDC Energy Saving Fans - 100% Copper Motor',
    link: '/products?category=ceiling-and-bldc-fans',
    title: 'Decorative High-Speed Ceiling Fans',
    badge: '100% Copper Motor',
  },
  {
    id: 'slide-mixer-grinder',
    src: '/branding/new-mixer-baqnner.png',
    alt: 'Powerteck Pulsar Juicer & Mixer Grinder - Heavy Duty 550W Copper Motor with Stainless Steel Jars',
    link: '/products?category=mixer-grinders-and-juicers',
    title: 'Heavy-Duty Mixer Grinders',
    badge: 'High Torque Grinding',
  },
  {
    id: 'slide-electric-iron',
    src: '/branding/iron-scaled-1.png',
    alt: 'Powerteck Heavy Weight Plancha Dry Iron - Gold Non-Stick Soleplate & Precision Thermostat',
    link: '/products?category=irons-and-heating',
    title: 'Heavy-Weight Plancha Dry Iron',
    badge: 'Salon-Grade Crease Removal',
  },
];

export function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = bannerSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      ref={sliderRef}
      className="relative w-full bg-[#292929] overflow-hidden select-none"
      aria-label="Powerteck Promotional Hero Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* 1600:586 Aspect Ratio Responsive Container */}
      <div
        className="relative w-full aspect-[1600/700] sm:aspect-[1600/586] min-h-[240px] max-h-[586px] flex items-center justify-center bg-[#242424]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {bannerSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                isActive
                  ? 'opacity-100 z-10 pointer-events-auto'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <Link
                href={slide.link}
                className="relative w-full h-full block flex items-center justify-center group"
                tabIndex={isActive ? 0 : -1}
                aria-label={slide.alt}
              >
                {/* Background subtle blur fill for irregular aspect ratios */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-xl scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${slide.src})` }}
                />

                {/* Main banner image with contain to preserve all original text, logos & people */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-contain relative z-10"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </Link>
            </div>
          );
        })}

        {/* Previous Slide Arrow Button (matching reference) */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E50914] shadow-xl cursor-pointer"
          aria-label="Previous banner slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Slide Arrow Button (matching reference) */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E50914] shadow-xl cursor-pointer"
          aria-label="Next banner slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Circular Pagination Dots (matching reference) */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                currentIndex === index
                  ? 'w-3 h-3 bg-[#E50914] ring-2 ring-white/80'
                  : 'w-2.5 h-2.5 bg-white/80 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
