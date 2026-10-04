# 📄 DocuMind

### AI-Powered PDF Document Summarizer

> **Upload a document. Let AI understand it. Get the important parts instantly.**

DocuMind is an AI-powered document summarization application that transforms lengthy PDF documents into **structured, readable, and actionable summaries** using Google's Gemini multimodal AI.

Instead of manually reading dozens of pages, users can upload a PDF and receive its **overview, key points, important terms, section-wise summaries, and conclusion** in a clean interface.

---

## ✨ Prototype

```text
                    ┌──────────────────────────┐
                    │         DOCUMIND          │
                    │   AI Document Intelligence│
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       Upload PDF         │
                    │                          │
                    │     📄 Drag & Drop       │
                    │        or Browse         │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      File Validation     │
                    │                          │
                    │   ✓ PDF format           │
                    │   ✓ Non-empty file       │
                    │   ✓ ≤ 10 MB              │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       Gemini AI          │
                    │                          │
                    │   Multimodal Processing  │
                    │          +               │
                    │   Structured Prompting   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Structured Output     │
                    │                          │
                    │  • Title                 │
                    │  • Summary               │
                    │  • Key Points            │
                    │  • Important Terms       │
                    │  • Section Summaries     │
                    │  • Conclusion            │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      DocuMind UI         │
                    │                          │
                    │  Read • Explore • Learn  │
                    └──────────────────────────┘
```

---

## 🎯 Why DocuMind?

Long documents contain valuable information, but extracting the important parts manually can be time-consuming.

DocuMind focuses on turning:

**📚 Long PDF → 🧠 AI Understanding → 📋 Structured Knowledge**

Rather than returning one large block of generated text, DocuMind asks Gemini to produce a predictable structure that the frontend can render into meaningful sections.

---

## 🚀 Features

### 📤 PDF Upload

Upload a PDF document directly through the application.

* PDF validation
* Empty-file validation
* Maximum file size: **10 MB**
* Simple upload workflow

### 🤖 Gemini-Powered Understanding

DocuMind uses Google's Gemini multimodal capabilities to process the uploaded document and understand its contents.

The document is sent to Gemini together with a carefully designed summarization prompt.

### 📝 Structured Summaries

Instead of receiving an unstructured paragraph, the AI response is organized into:

```text
Document
│
├── Title
│
├── Summary
│
├── Key Points
│
├── Important Terms
│
├── Sections
│   ├── Section 1
│   │   ├── Title
│   │   ├── Summary
│   │   └── Page
│   │
│   ├── Section 2
│   │   ├── Title
│   │   ├── Summary
│   │   └── Page
│   │
│   └── ...
│
└── Conclusion
```

### 🧩 Schema-Validated AI Output

AI-generated output can be unpredictable.

DocuMind therefore validates the Gemini response using **Zod** before passing the data to the frontend.

```text
Gemini
   │
   ▼
JSON Response
   │
   ▼
Zod Validation
   │
   ├── Valid ───────► Frontend
   │
   └── Invalid ─────► Error Handling
```

This creates a safer boundary between the AI response and the application.

---

# 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│                                                     │
│                 Next.js + TypeScript               │
│                                                     │
│                    app/page.tsx                     │
│                                                     │
│        Upload PDF → Display Structured Result       │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ HTTP Request
                        ▼
┌─────────────────────────────────────────────────────┐
│                    API LAYER                        │
│                                                     │
│                 Next.js Route Handler               │
│                                                     │
│                  /api/summarize                     │
│                                                     │
│   1. Receive PDF                                    │
│   2. Validate file                                  │
│   3. Convert Buffer → Base64                        │
│   4. Build Gemini request                           │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ Multimodal Request
                        ▼
┌─────────────────────────────────────────────────────┐
│                     AI LAYER                        │
│                                                     │
│                     Gemini                          │
│                                                     │
│             Document Understanding                 │
│                       +                             │
│                Structured Output                    │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ JSON
                        ▼
┌─────────────────────────────────────────────────────┐
│                 VALIDATION LAYER                    │
│                                                     │
│                       Zod                           │
│                                                     │
│              Validate AI Response                  │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
                 Structured Data
                        │
                        ▼
                 Next.js Frontend
```

---

# 🛠️ Tech Stack

| Technology        | Purpose                                   |
| ----------------- | ----------------------------------------- |
| **Next.js**       | Full-stack React framework                |
| **TypeScript**    | Type-safe application development         |
| **Tailwind CSS**  | UI styling                                |
| **Google Gemini** | AI document understanding & summarization |
| **@google/genai** | Gemini API integration                    |
| **Zod**           | Runtime schema validation                 |
| **App Router**    | Application and API routing               |

---

# 📁 Project Structure

```text
DocuMind/
│
├── app/
│   │
│   ├── api/
│   │   └── summarize/
│   │       └── route.ts
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── lib/
│   │
│   ├── promptsum/
│   │   └── prompt.ts
│   │
│   └── schemas/
│       └── summaryprocess.ts
│
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 🔄 How It Works

### 01 — Upload

The user selects a PDF from the interface.

```text
User
 ↓
PDF
```

### 02 — Validate

The server checks whether the uploaded file satisfies the application's requirements.

```text
PDF
 │
 ├── Is it a PDF?
 ├── Is it non-empty?
 └── Is it ≤ 10 MB?
```

### 03 — Prepare the Document

The PDF is read by the server and converted from a binary buffer into a Base64 representation suitable for the Gemini request.

```text
PDF File
   ↓
Buffer
   ↓
Base64
```

### 04 — Send to Gemini

The document is provided to Gemini together with DocuMind's structured summarization prompt.

```text
PDF + Prompt
     ↓
   Gemini
```

### 05 — Generate Structured Data

Gemini produces information corresponding to DocuMind's expected document-summary structure.

```json
{
  "title": "...",
  "summary": "...",
  "keyPoints": [],
  "importantTerms": [],
  "sections": [],
  "conclusion": "..."
}
```

### 06 — Validate with Zod

The response is checked against the application's schema.

```text
AI Output
   ↓
Zod Schema
   ↓
Validated Object
```

### 07 — Render

The validated data is returned to the frontend and displayed through the DocuMind interface.

---

# 🧠 AI Design

DocuMind separates **AI instructions** from application logic.

The summarization prompt is maintained in:

```text
lib/promptsum/prompt.ts
```

while the expected response structure is defined in:

```text
lib/schemas/summaryprocess.ts
```

This separation makes the AI layer easier to modify without mixing prompt logic with API implementation.

---

# 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>

cd DocuMind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `GEMINI_API_KEY` | API key used to access Google Gemini |

> Never commit `.env.local` or expose your API key on the client side.

---

# 🧪 Example Workflow

```text
                 USER
                   │
                   ▼
             Select PDF
                   │
                   ▼
            Upload Document
                   │
                   ▼
            Server Validation
                   │
                   ▼
             Gemini Request
                   │
                   ▼
          AI Document Analysis
                   │
                   ▼
          Structured JSON Output
                   │
                   ▼
             Zod Validation
                   │
                   ▼
             DocuMind Result
```

---

# 🌱 What I Learned

Building DocuMind involved working with several concepts beyond a basic frontend application:

* Next.js App Router
* TypeScript
* API route handlers
* File uploads
* Server-side processing
* Environment variables
* Gemini API integration
* Multimodal AI inputs
* Prompt design
* Structured AI output
* JSON parsing
* Runtime validation with Zod
* Frontend/backend separation
* Error handling

The project also demonstrates an important pattern for AI applications:

> **Don't blindly trust the model output — define the structure your application expects and validate it.**

---

# 🔮 Future Improvements

Potential extensions for DocuMind include:

* 📚 Multiple document support
* 💬 Chat with your document
* 🔎 Semantic document search
* 📑 Page-level citations
* 🧠 Ask questions about specific sections
* 📊 Document insights and statistics
* 📥 Export summaries as PDF/Markdown
* 🗂️ Document history
* 🔐 User authentication
* ☁️ Persistent document storage

---

# 📌 Current Prototype

```text
                 ┌──────────────────────┐
                 │       DOCUMIND       │
                 │                      │
                 │  Understand PDFs     │
                 │      with AI         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     📄 UPLOAD PDF    │
                 └──────────┬───────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │       AI PROCESSING         │
              │                             │
              │      Google Gemini          │
              └──────────────┬──────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │              SUMMARY                   │
        │                                        │
        │  📌 Overview                           │
        │  ──────────────────────────────────    │
        │                                        │
        │  🔑 Key Points                         │
        │  • Point one                           │
        │  • Point two                           │
        │  • Point three                         │
        │                                        │
        │  📖 Important Terms                    │
        │  • Term → Explanation                  │
        │                                        │
        │  📑 Sections                           │
        │  • Introduction                        │
        │  • Main Concepts                       │
        │  • Conclusion                          │
        │                                        │
        │  💡 Conclusion                         │
        └────────────────────────────────────────┘
```

---

## ⭐ Project Philosophy

**DocuMind is built around a simple idea:**

### *Make understanding faster, not reading harder.*

It combines a modern web stack with multimodal AI to turn unstructured documents into structured knowledge.

---

## 👩‍💻 Author

**Sukanya Mukherjee**

Built with ❤️ using **Next.js, TypeScript, and Gemini AI**.
