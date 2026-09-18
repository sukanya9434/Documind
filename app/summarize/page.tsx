"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DocumentSummarySchema,
  type DocumentSummary,
} from "@/lib/schemas/summaryprocess";

type SummaryData = {
  filename: string;
  summary: DocumentSummary;
};

export default function SummarizePage() {
  const router = useRouter();

  const [data, setData] = useState<SummaryData | null>(null);

  const [typedSummary, setTypedSummary] = useState("");
  const [typedKeyPoints, setTypedKeyPoints] = useState<string[]>([]);
  const [typedTerms, setTypedTerms] = useState<string[]>([]);
  const [typedSections, setTypedSections] = useState<
    {
      title: string;
      summary: string;
      page: number | null;
    }[]
  >([]);
  const [typedConclusion, setTypedConclusion] = useState("");

  useEffect(() => {
    const storedSummary = sessionStorage.getItem("summary");

    if (!storedSummary) {
      return;
    }

    try {
      const parsedData = JSON.parse(storedSummary);

      const result = DocumentSummarySchema.safeParse(
        parsedData.summary
      );

      if (!result.success) {
        console.error("Invalid summary data:", result.error);
        return;
      }

      setData({
        filename: parsedData.filename,
        summary: result.data,
      });
    } catch (error) {
      console.error("Failed to read summary:", error);
    }
  }, []);

  // Type summary
  useEffect(() => {
    if (!data) return;

    const text = data.summary.summary;
    let index = 0;

    const interval = setInterval(() => {
      setTypedSummary(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data]);

  // Type key points
  useEffect(() => {
    if (!data) return;

    const points = data.summary.keyPoints;
    let pointIndex = 0;
    let charIndex = 0;

    setTypedKeyPoints([]);

    const interval = setInterval(() => {
      const currentPoint = points[pointIndex];

      if (!currentPoint) {
        clearInterval(interval);
        return;
      }

      const currentText = currentPoint.slice(0, charIndex + 1);

      setTypedKeyPoints((previous) => {
        const updated = [...previous];
        updated[pointIndex] = currentText;
        return updated;
      });

      charIndex++;

      if (charIndex >= currentPoint.length) {
        pointIndex++;
        charIndex = 0;
      }

      if (pointIndex >= points.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data]);

  // Type important terms
  useEffect(() => {
    if (!data) return;

    const terms = data.summary.importantTerms;
    let termIndex = 0;
    let charIndex = 0;

    setTypedTerms([]);

    const interval = setInterval(() => {
      const currentTerm = terms[termIndex];

      if (!currentTerm) {
        clearInterval(interval);
        return;
      }

      const currentText = currentTerm.slice(0, charIndex + 1);

      setTypedTerms((previous) => {
        const updated = [...previous];
        updated[termIndex] = currentText;
        return updated;
      });

      charIndex++;

      if (charIndex >= currentTerm.length) {
        termIndex++;
        charIndex = 0;
      }

      if (termIndex >= terms.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data]);

  // Type sections
  useEffect(() => {
    if (!data) return;

    const sections = data.summary.sections;
    let sectionIndex = 0;
    let charIndex = 0;

    setTypedSections([]);

    const interval = setInterval(() => {
      const currentSection = sections[sectionIndex];

      if (!currentSection) {
        clearInterval(interval);
        return;
      }

      const fullText = currentSection.summary;
      const currentText = fullText.slice(0, charIndex + 1);

      setTypedSections((previous) => {
        const updated = [...previous];

        updated[sectionIndex] = {
          title: currentSection.title,
          summary: currentText,
          page: currentSection.page,
        };

        return updated;
      });

      charIndex++;

      if (charIndex >= fullText.length) {
        sectionIndex++;
        charIndex = 0;
      }

      if (sectionIndex >= sections.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data]);

  // Type conclusion
  useEffect(() => {
    if (!data) return;

    const text = data.summary.conclusion;
    let index = 0;

    setTypedConclusion("");

    const interval = setInterval(() => {
      setTypedConclusion(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            No summary found
          </h1>

          <p className="mt-3 text-gray-400">
            Upload a document first to generate a summary.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <button
          onClick={() => router.push("/upload")}
          className="mb-8 text-sm font-medium text-gray-400
                     transition-colors hover:text-white"
        >
          ← Back to Upload
        </button>

        {/* Header */}
        <div className="mb-12">
          <p
            className="animate-glow text-sm font-medium uppercase
                       tracking-[0.3em] text-yellow-400"
          >
            AI Summary
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {data.summary.title}
          </h1>

          <p className="mt-2 wrap-break-word text-sm text-gray-400">
            {data.filename}
          </p>
        </div>

        {/* Summary */}
        <section className="rounded-2xl border border-gray-800 p-7">
          <h2 className="text-xl font-semibold animate-glow">
            Summary
          </h2>

          <p className="mt-4 min-h-30 whitespace-pre-wrap
                        wrap-break-word leading-8 text-gray-400">
            {typedSummary}

            {typedSummary.length < data.summary.summary.length && (
              <span className="ml-1 border-r-2 border-yellow-400" />
            )}
          </p>
        </section>

        {/* Key Points */}
        <section className="mt-10">
          <h2 className="animate-glow text-xl font-semibold text-yellow-400">
            Key Points
          </h2>

          <ul className="mt-4 space-y-3">
            {typedKeyPoints.map((point, index) => (
              <li
                key={index}
                className="min-h-15 wrap-break-word rounded-xl
                           border border-gray-800 p-4 text-gray-400"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Important Terms */}
        <section className="mt-10">
          <h2 className="animate-glow text-xl font-semibold text-yellow-400">
            Important Terms
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {typedTerms.map((term, index) => (
              <span
                key={index}
                className="wrap-break-word rounded-full border
                           border-yellow-500/40 bg-yellow-500/10
                           px-4 py-2 text-sm text-yellow-400"
              >
                {term}
              </span>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="mt-10">
          <h2 className="animate-glow text-xl font-semibold text-yellow-400">
            Document Sections
          </h2>

          <div className="mt-4 space-y-4">
            {typedSections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="wrap-break-word font-semibold text-white">
                    {section.title}
                  </h3>

                  <span className="shrink-0 text-sm text-gray-500">
                    Page {section.page ?? "—"}
                  </span>
                </div>

                <p className="mt-2 wrap-break-word leading-7 text-gray-400">
                  {section.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mt-10 rounded-2xl border border-gray-800 p-7">
          <h2 className="text-xl font-semibold animate-glow">
            Conclusion
          </h2>

          <p className="mt-4 min-h-25 whitespace-pre-wrap
                        wrap-break-word leading-8 text-gray-400">
            {typedConclusion}

            {typedConclusion.length <
              data.summary.conclusion.length && (
              <span className="ml-1 border-r-2 border-yellow-400" />
            )}
          </p>
        </section>

      </div>
    </main>
  );
}