import { generateObject } from "ai"
import { z } from "zod"

const extractionSchema = z.object({
  dietaryRestrictions: z.array(z.string()).describe("Any dietary restrictions or preferences mentioned"),
  accessibilityNeeds: z.array(z.string()).describe("Any accessibility or mobility requirements"),
  timePreferences: z.array(z.string()).describe("Preferred times, pacing, or schedule preferences"),
  groupComposition: z.array(z.string()).describe("Information about the group (kids, elderly, pregnant, etc.)"),
  specificInterests: z
    .array(z.string())
    .describe("Specific food interests, must-visit places, or cultural preferences"),
})

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: extractionSchema,
      prompt: `Analyze the following tour booking special request and extract key information that would help a tour guide prepare. Be thorough but concise.

Special Request: "${text}"

Extract:
- Dietary restrictions (vegetarian, vegan, gluten-free, halal, allergies, etc.)
- Accessibility needs (wheelchair, mobility issues, physical limitations, etc.)
- Time preferences (morning person, avoid lunch rush, slow pace, etc.)
- Group composition (traveling with kids, elderly, pregnant, celebration, etc.)
- Specific interests (street food, markets, specific dishes, cultural sites, photo spots, etc.)

Only include items that are explicitly mentioned or clearly implied. Return empty arrays for categories not mentioned.`,
    })

    return Response.json({ extracted: object })
  } catch (error) {
    console.error("AI extraction error:", error)
    return Response.json({ error: "Failed to analyze request" }, { status: 500 })
  }
}
