// import { openai } from "@ai-sdk/openai"
// import { streamText } from "ai"

// export const runtime = "edge"

// export async function POST(req) {
//   const { messages } = await req.json()

//   // Simulate AI response
//   const aiResponse =
//     "I apologize, but I don't have that specific information. However, this recipe typically yields about 24 to 36 cookies, depending on the size of each cookie. If you want to make fewer cookies, you can halve the recipe, or if you want more, you can double it. Remember that the exact number may vary based on how large you make each cookie. Is there anything else you'd like to know about the recipe?"

//   const result = streamText({
//     model: openai("gpt-4-turbo"),
//     messages: [...messages, { role: "assistant", content: aiResponse }],
//   })

//   return result.toDataStreamResponse()
// }

