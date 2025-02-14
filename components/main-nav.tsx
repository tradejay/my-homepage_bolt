"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const industryItems = [
  { title: "의료", href: "/industry/medical" },
  { title: "제약", href: "/industry/pharmaceutical" },
  { title: "의료기기", href: "/industry/medical-devices" },
  { title: "화장품", href: "/industry/cosmetics" },
  { title: "건강기능식품", href: "/industry/health-supplements" },
  { title: "디지털헬스케어", href: "/industry/digital-healthcare" },
];

const mediaReviewItems = [
  { title: "뉴스", href: "/media-review/news" },
  { title: "매거진", href: "/media-review/magazine" },
  { title: "도서", href: "/media-review/books" },
];

const keyScheduleItems = [
  { title: "연간일정", href: "/schedule/annual" },
  { title: "월간일정", href: "/schedule/monthly" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-primary/80 mt-1">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNav() {
  return (
    <NavigationMenu className="flex justify-center py-2">
      <NavigationMenuList className="space-x-0.5">
        {/* Home */}
        <NavigationMenuItem>
          <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 px-2 py-2">
            Home
          </Link>
        </NavigationMenuItem>

        {/* Report */}
        <NavigationMenuItem>
          <Link href="/report" className="text-sm font-medium text-primary hover:text-primary/80 px-2 py-2">
            Report
          </Link>
        </NavigationMenuItem>

        {/* 경제동향 */}
        <NavigationMenuItem>
          <Link href="/economic-trends" className="text-sm font-medium text-primary hover:text-primary/80 px-2 py-2">
            경제동향
          </Link>
        </NavigationMenuItem>

        {/* 산업동향 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            산업동향
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {industryItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 기업동향 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            기업동향
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {industryItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href.replace('industry', 'company')}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 정책동향 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            정책동향
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {industryItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href.replace('industry', 'policy')}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 언론동향 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            언론동향
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {industryItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href.replace('industry', 'media')}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 인물 */}
        <NavigationMenuItem>
          <Link href="/people" className="text-sm font-medium text-primary hover:text-primary/80 px-2 py-2">
            인물
          </Link>
        </NavigationMenuItem>

        {/* 미디어리뷰 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            미디어리뷰
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {mediaReviewItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* 주요일정 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-primary hover:text-primary/80 bg-transparent hover:bg-transparent px-2">
            주요일정
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-[400px] gap-2 p-4 grid-cols-2">
              {keyScheduleItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}