"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      sessionStorage.setItem("summary", JSON.stringify(data));

      router.push("/summarize");
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
         <button
          onClick={() => router.push("/")}
          className="mb-8 text-sm font-medium text-gray-400
                     transition-colors hover:text-white"
        >
          ← Back to Home
        </button>
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-yellow-500 animate-glow">
            DocuMind
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Upload your document
          </h1>

          <p className="mt-4 text-gray-500">
            Upload a PDF and let AI turn it into a clear, structured summary.
          </p>
        </div>

        {/* Upload area */}
        <div
          className="rounded-2xl border-2 border-dashed border-gray-300
                     p-12 text-center transition-all duration-300
                     hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]"
        >
          <div className="text-5xl mb-5">
            📄
          </div>

          <h2 className="text-xl font-semibold">
            Choose your PDF
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            PDF files only · Maximum 10 MB
          </p>

          <label
            className="mt-7 inline-block cursor-pointer rounded-lg
                       bg-black px-6 py-3 font-medium text-white
                       transition-all duration-300
                       hover:-translate-y-1 hover:shadow-lg"
          >
            Choose File

            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(event) => {
                const selectedFile =
                  event.target.files?.[0] ?? null;

                setFile(selectedFile);
              }}
            />
          </label>

          {file && (
            <p className="mt-5 text-sm font-medium text-gray-500">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Summarize button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSummarize}
            disabled={!file || loading}
            className="rounded-lg bg-black px-8 py-3
                       font-medium text-white
                       transition-all duration-300
                       disabled:cursor-not-allowed
                       disabled:opacity-40
                       hover:-translate-y-1
                       hover:shadow-lg"
          >
            {loading ? "Summarizing..." : "Summarize →"}
          </button>
        </div>

      </div>
    </main>
  );
}