"use client";

import dynamic from "next/dynamic";

type CrimeArticle = {
  id: string;
  title: string;
  source: string;
  published_on: string;
  location: string;
  crime_type: string;
  url: string;
  is_reviewed: boolean;
};

type CrimeMapProps = {
  place?: string;
  articles: CrimeArticle[];
};

const CrimeMap = dynamic(() => import("./CrimeMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full rounded-xl bg-gray-100 flex items-center justify-center">
      Loading Chennai map...
    </div>
  ),
});

export default function CrimeMapLoader(props: CrimeMapProps) {
  return <CrimeMap {...props} />;
}