"use client";

import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export const ProductSkeleton = () => {
  return (
    <Card className="w-full max-w-sm border border-gold-light/5 bg-white/20 dark:bg-black/20 backdrop-blur-md overflow-hidden h-[500px] shadow-none">
      {/* Image Skeleton with Gold Hint */}
      <div className="relative h-64 w-full bg-default-100/50 flex items-center justify-center p-8 overflow-hidden">
        <Skeleton className="h-full w-full rounded-2xl bg-primary/10" />
        {/* Shine highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent animate-pulse" />
      </div>

      <CardBody className="px-4 pt-6 pb-1 flex-grow flex flex-col justify-between">
        <div className="space-y-4 flex flex-col items-center">
          {/* Title Skeleton */}
          <Skeleton className="w-4/5 h-7 rounded-xl bg-default-200/50" />
          <Skeleton className="w-1/2 h-5 rounded-lg bg-default-100/50" />
          
          {/* Description Skeleton */}
          <div className="space-y-2 w-full mt-4">
            <Skeleton className="w-full h-2.5 rounded-full bg-default-100/30" />
            <Skeleton className="w-11/12 h-2.5 rounded-full mx-auto bg-default-100/30" />
          </div>
        </div>

        {/* Price & Variant Row Skeleton */}
        <div className="flex items-center justify-between px-2 mt-8 w-full border-t border-default-100 pt-4">
          <div className="space-y-2">
            <Skeleton className="w-10 h-2 rounded-full bg-default-100/50" />
            <Skeleton className="w-24 h-8 rounded-xl bg-primary/10" />
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="w-16 h-2 rounded-full bg-default-100/50" />
            <Skeleton className="w-32 h-8 rounded-full bg-default-200/50" />
          </div>
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-6 pt-2 flex flex-col gap-3">
        {/* Button Skeletons */}
        <Skeleton className="w-full h-12 rounded-full bg-primary/20" />
        <Skeleton className="w-full h-10 rounded-xl bg-default-200/40" />
      </CardFooter>
    </Card>
  );
};
