"use client";
import { Card, CardBody, Skeleton } from "@heroui/react";

export const ClientSkeleton = () => {
  return (
    <Card className="w-full max-w-sm h-full border-none bg-default-50/50">
      {/* Client Logo/Image Skeleton */}
      <Skeleton className="h-48 w-full" />

      <CardBody className="flex flex-col h-full gap-4 p-6">
        <div className="flex-grow space-y-3">
          {/* Badge Skeleton */}
          <Skeleton className="w-24 h-5 rounded-full" />
          
          {/* Title Skeleton */}
          <Skeleton className="w-3/4 h-7 rounded-lg" />

          {/* Location/Link Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-32 h-4 rounded-lg" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="pt-2">
            <Skeleton className="w-full h-10 rounded-xl" />
        </div>
      </CardBody>
    </Card>
  );
};
