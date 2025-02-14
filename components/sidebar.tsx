"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, BookOpen, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-full space-y-6">
      {/* Author Profile */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square relative rounded-full overflow-hidden w-32 mx-auto">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
              alt="Author"
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Dr. Sarah Kim</h3>
            <p className="text-sm text-muted-foreground">
              Healthcare Industry Expert & Consultant
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            With over 15 years of experience in healthcare industry analysis and consulting,
            providing insights on market trends and innovations.
          </p>
        </CardContent>
      </Card>

      {/* YouTube Channel */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5" />
            Latest Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="border-0"
            />
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="https://youtube.com" target="_blank">
              Visit Channel <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Publications */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recent Publications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {/* Publications Grid for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <li className="text-sm">
                <Link href="#" className="hover:underline block">
                  Healthcare Industry Trends 2024
                </Link>
                <p className="text-muted-foreground mt-1">
                  Comprehensive analysis of emerging trends
                </p>
              </li>
              <li className="text-sm">
                <Link href="#" className="hover:underline block">
                  Digital Health Revolution
                </Link>
                <p className="text-muted-foreground mt-1">
                  Impact of technology on healthcare
                </p>
              </li>
              <li className="text-sm">
                <Link href="#" className="hover:underline block">
                  Future of Medical Devices
                </Link>
                <p className="text-muted-foreground mt-1">
                  Innovation and market outlook
                </p>
              </li>
            </div>
          </ul>
        </CardContent>
      </Card>

      {/* Latest Updates */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Updates Grid for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="text-sm border-l-2 border-primary pl-4">
              <span className="text-muted-foreground">March 15, 2024</span>
              <p className="mt-1">New research paper published in Healthcare Journal</p>
            </div>
            <div className="text-sm border-l-2 border-primary pl-4">
              <span className="text-muted-foreground">March 10, 2024</span>
              <p className="mt-1">Upcoming webinar on Medical Device Regulations</p>
            </div>
            <div className="text-sm border-l-2 border-primary pl-4">
              <span className="text-muted-foreground">March 5, 2024</span>
              <p className="mt-1">Featured in Healthcare Industry Today magazine</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}