"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "Understand your documents";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

   <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-yellow-500 animate-glow">
  AI Document Assistant
</p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">

          {/* Fixed-width container prevents wrapping */}
          <span className="block whitespace-nowrap">
            <span className="border-r-2 border-black pr-1">
              {displayedText}
            </span>
          </span>

          <span className="block mt-2">
            in seconds.
          </span>

        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600">
          Upload a PDF and let DocuMind extract the key ideas,
          important terms, sections, and conclusions for you.
        </p>

        <Link
          href="/upload"
         className="mt-9 inline-block rounded-lg bg-black px-7 py-3
           font-medium text-yellow-500 transition-all duration-300
           animate-glow
           hover:-translate-y-1"        >
          Get Started →
        </Link>

      </div>
    </main>
  );
}