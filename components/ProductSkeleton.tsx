"use client";

import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";

export const ProductSkeleton = () => {
  return (
    <Card className="w-full max-w-sm border-none overflow-hidden h-[450px]">
      {/* Image Skeleton */}
      <Skeleton className="h-56 w-full" />

      <CardBody className="px-4 pt-4 pb-1 flex-grow flex flex-col justify-between">
        <div className="space-y-3 flex flex-col items-center">
          {/* Title Skeleton */}
          <Skeleton className="w-3/4 h-6 rounded-lg" />
          <Skeleton className="w-1/2 h-6 rounded-lg" />
          
          {/* Description Skeleton */}
          <div className="space-y-2 w-full mt-2">
            <Skeleton className="w-full h-3 rounded-lg" />
            <Skeleton className="w-5/6 h-3 rounded-lg mx-auto" />
          </div>
        </div>

        {/* Price & Variant Row Skeleton */}
        <div className="flex items-center justify-between px-2 mt-4 w-full">
          <Skeleton className="w-20 h-7 rounded-lg" />
          <Skeleton className="w-24 h-7 rounded-lg" />
        </div>
      </CardBody>

      <CardFooter className="px-4 pb-5 pt-2 flex flex-col gap-2">
        {/* Button Skeletons */}
        <Skeleton className="w-full h-12 rounded-full" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </CardFooter>
    </Card>
  );
};
