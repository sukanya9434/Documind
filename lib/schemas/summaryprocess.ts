import { z } from "zod";

export const DocumentSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  importantTerms: z.array(z.string()),
  sections: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      page: z.number().nullable(),
    })
  ),
  conclusion: z.string(),
});
export type DocumentSummary = z.infer<typeof DocumentSummarySchema>;