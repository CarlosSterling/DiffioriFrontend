"use client";
import { Card, CardBody, Skeleton } from "@heroui/react";

export const BlogSkeleton = () => {
  return (
    <Card className="w-full max-w-sm h-full border-none bg-default-50/50">
      {/* Top Image Skeleton */}
      <Skeleton className="h-48 w-full" />

      <CardBody className="flex flex-col h-full gap-4 p-6">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            {/* Avatar Skeleton */}
            <Skeleton className="w-8 h-8 rounded-full" />
            {/* Title Skeleton */}
            <Skeleton className="w-3/4 h-6 rounded-lg" />
          </div>

          {/* Date Skeleton */}
          <div className="flex items-center gap-1 mb-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-24 h-4 rounded-lg" />
          </div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="bg-default-50/50 p-4 rounded-xl border border-default-100/50 h-[90px] flex flex-col justify-center gap-2">
            <Skeleton className="w-full h-3 rounded-lg" />
            <Skeleton className="w-full h-3 rounded-lg" />
            <Skeleton className="w-2/3 h-3 rounded-lg" />
        </div>

        {/* Link Skeleton */}
        <div className="pt-2">
          <Skeleton className="w-20 h-4 rounded-lg" />
        </div>
      </CardBody>
    </Card>
  );
};
