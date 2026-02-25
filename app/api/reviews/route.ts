import { NextResponse } from "next/server";
import { googleReviews } from "@/data/google-reviews";

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID; // Diffiori Café Place ID

export async function GET() {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    console.warn("Google API Keys missing, serving mock data.");
    return NextResponse.json({ reviews: googleReviews });
  }

  try {
    // Fetch details including reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}&language=es`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    const data = await response.json();

    if (!data.result || !data.result.reviews) {
       console.warn("No reviews found in API response, serving mock data.");
       return NextResponse.json({ reviews: googleReviews });
    }

    // Transform data to match our interface
    const reviews = data.result.reviews.map((review: any) => ({
      id: review.time.toString(), // unique enough
      author_name: review.author_name,
      author_url: review.author_url,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching Google Reviews, serving mock data:", error);
    return NextResponse.json({ reviews: googleReviews });
  }
}
