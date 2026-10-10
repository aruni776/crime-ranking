"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  source: string;
  published_on: string;
  location: string;
  crime_type: string;
  url: string;
  is_reviewed: boolean;
};

const summaryCards = [
  {
    label: "CRIME REPORTS",
    value: "0",
    note: "Reviewed reports",
    icon: "◈",
  },
  {
    label: "HIGHEST CONCERN",
    value: "—",
    note: "Locality risk level",
    icon: "△",
  },
  {
    label: "AREAS TRACKED",
    value: "28",
    note: "Chennai localities",
    icon: "⌖",
  },
];

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles");

        if (!response.ok) {
          throw new Error("Failed to load articles");
        }

        const data: Article[] = await response.json();
        setArticles(data);
      } catch {
        setError("Unable to load crime articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
  
    const filteredArticles = articles.filter((article) => {
    if (dateFilter === "all") return true;

    const publishedDate = new Date(article.published_on);
    if (Number.isNaN(publishedDate.getTime())) return false;

    const now = new Date();
    const ageInDays =
      (now.getTime() - publishedDate.getTime()) /
      (1000 * 60 * 60 * 24);

    if (dateFilter === "week") return ageInDays <= 7 && ageInDays >= 0;
    if (dateFilter === "twoWeeks") return ageInDays <= 14 && ageInDays >= 0;
    if (dateFilter === "month") return ageInDays <= 30 && ageInDays >= 0;

    return true;
    });
  const crimeReports = articles.length;

  const crimeTypes = [
    "Pickpocketing",
    "Theft",
    "Harassment",
    "Assault",
    "Vandalism",
  ];

  const crimeCounts = crimeTypes.map((crime) => ({
    name: crime,
    count: articles.filter(
      (article) =>
        article.crime_type.toLowerCase() === crime.toLowerCase(),
    ).length,
  }));

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f2f0e9]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 md:px-10">
        <Link href="/" className="text-sm text-[#c9f36b]">
          ← Chennai Safety
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#969dab]">
          <span className="h-2 w-2 rounded-full bg-[#c9f36b]" />
          CHENNAI · SAFETY MONITOR
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="mb-10">
          <p className="mb-3 text-xs tracking-[0.25em] text-[#c9f36b]">
            CITY INTELLIGENCE / OVERVIEW
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Chennai Safety
            <br />
            <span className="text-[#969dab]">Dashboard.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#969dab] md:text-base">
            Explore locality-level safety indicators, review reported
            incidents, and understand how crime reports are distributed
            across Chennai.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.16em] text-[#969dab]">
                  {card.label}
                </p>
                <span className="text-xl text-[#c9f36b]">{card.icon}</span>
              </div>

              <p className="mt-7 text-4xl font-semibold">
                {card.label === "CRIME REPORTS"
                  ? crimeReports
                  : card.value}
              </p>

              <p className="mt-2 text-sm text-[#969dab]">{card.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.18em] text-[#c9f36b]">
                  GEOGRAPHIC VIEW
                </p>
                <h2 className="mt-2 text-xl font-medium">
                  Chennai locality map
                </h2>
              </div>
              <span className="text-xs text-[#969dab]">MAP MODULE</span>
            </div>

            <div className="mt-6 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0b101a] p-8 text-center">
              <div>
                <p className="text-3xl text-[#c9f36b]">⌖</p>
                <p className="mt-3 text-sm text-[#f2f0e9]">
                  Locality map will appear here
                </p>
                <p className="mt-2 text-xs leading-5 text-[#969dab]">
                  We’ll connect Chennai localities and their calculated
                  safety scores in the next stages.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <p className="text-xs tracking-[0.18em] text-[#c9f36b]">
              INCIDENT INTELLIGENCE
            </p>
            <h2 className="mt-2 text-xl font-medium">Crime breakdown</h2>

            <div className="mt-6 space-y-4">              
              {crimeCounts.map((crime) => (
                <div
                  key={crime.name}
                  className="flex items-center justify-between border-b border-white/[0.07] pb-4"
                >
                  <span className="text-sm text-[#c4c8d1]">{crime.name}</span>
                  <span className="text-sm text-[#969dab]">{crime.count}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-[#969dab]">
              Counts will be calculated from reviewed article records.
            </p>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-[#c9f36b]">
                NEWS & REPORTS
              </p>
              <h2 className="mt-2 text-xl font-medium">
                Recent crime articles          
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: "All time", value: "all" },
                    { label: "Past 1 week", value: "week" },
                    { label: "Past 2 weeks", value: "twoWeeks" },
                    { label: "Past 1 month", value: "month" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDateFilter(option.value)}
                      className={`rounded-full border px-4 py-2 text-xs transition ${
                        dateFilter === option.value
                          ? "border-[#c9f36b] bg-[#c9f36b] text-[#080b12]"
                          : "border-white/10 text-[#969dab] hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </h2>
              <p className="mt-2 text-sm text-[#969dab]">
                Verified-by-review status and date filters will be connected
                to your existing data pipeline.
              </p>
            </div>

            <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#969dab]">
              DATA CONNECTION PENDING
            </span>
          </div>
                    <div className="mt-6 space-y-3">
            {loading && (
              <p className="text-sm text-[#969dab]">
                Loading reviewed articles...
              </p>
            )}

            {!loading && error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            {!loading && !error && filteredArticles.length === 0 && (
              <p className="text-sm text-[#969dab]">
                No reviewed articles available yet.
              </p>
            )}

            {!loading &&
              !error &&
              filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl border border-white/10 bg-[#0b101a] p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#969dab]">
                    <span>{article.source}</span>
                    <span>·</span>
                    <span>{article.published_on}</span>
                  </div>

                  <h3 className="mt-3 text-base font-medium text-[#f2f0e9]">
                    {article.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[#c9f36b]">
                      {article.crime_type}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[#969dab]">
                      {article.location}
                    </span>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-[#c9f36b] hover:underline"
                  >
                    Read original report ↗
                  </a>
                </article>
              ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 py-6 text-xs text-[#737b8b]">
          Chennai Safety Dashboard · Preview interface
        </footer>
      </section>
    </main>
  );
}
