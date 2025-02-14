"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    title: "Healthcare Industry Insights",
    description: "Latest trends and developments in the healthcare sector",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2091",
    link: "/industry/medical"
  },
  {
    title: "Pharmaceutical Breakthroughs",
    description: "New developments in pharmaceutical research and innovation",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=2070",
    link: "/industry/pharmaceutical"
  },
  {
    title: "Medical Device Innovation",
    description: "Cutting-edge advancements in medical technology",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2087",
    link: "/industry/medical-devices"
  },
  {
    title: "Digital Health Revolution",
    description: "The future of healthcare technology and digital transformation",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    link: "/industry/digital-healthcare"
  },
  {
    title: "Health & Wellness Trends",
    description: "Latest developments in health supplements and wellness",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2070",
    link: "/industry/health-supplements"
  }
];

export function HeroSlider() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full flex flex-col justify-center px-12 text-white">
                <h2 className="text-4xl font-bold mb-4 text-white">{slide.title}</h2>
                <p className="text-xl mb-8 text-gray-300">{slide.description}</p>
                <Button asChild className="w-fit" variant="outline">
                  <Link href={slide.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}