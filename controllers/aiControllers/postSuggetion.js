import OpenAI from "openai"
import customRes from "../../utils/customRes.js"
const client = new OpenAI({
    apiKey: process.env.POST_AI_KEY,
    baseURL: "https://api.groq.com/openai/v1",
})
async function postSuggestion(req, res) {
    const { title, description } = req.body
    const { role } = req.user
    try {
        if (!title || !description) return customRes(res, 400, false, "", "Something is missing", "")
        const response = await client.responses.create({
            model: "openai/gpt-oss-20b",
            input: [
                {
                    role: "user",
                    content: `You are an assistant that improves and refines posts for a School Management Web Application.
Analyze the following:
Title: "${title}"
Description: "${description}"
User Role: "${role}"

Your task:
Analyze the given title and description, understand the intent, and generate improved versions of both.

Title Requirements:
- Very short (maximum 3–6 words)
- Clean, simple, and meaningful
- Clearly reflect the purpose of the post (why the user is posting)
- Relevant to a school environment
- Appropriate for the user's role
- Must be based on the description’s intent, not just reworded
- Do NOT make it fancy or unnecessarily long

Description Requirements:
- Well-structured and easy to read
- Professional and appropriate for a school platform
- Informative, clear, and complete
- Clearly convey the purpose of the post
- Do NOT add unnecessary or unrelated content

Guidelines:
- Preserve the original meaning
- Adapt tone based on role:
  - Teacher: instructional and formal
  - Student: simple and clear
  - Admin: official and directive
- IMPORTANT: If the description contains any links (URLs), DO NOT modify, remove, or replace them. Keep them exactly as they are.

Output Rules (STRICT):
- Return ONLY valid JSON
- Do NOT include explanations or extra text
- Always follow this exact structure:

{
  "title": "Short, clean title here",
  "description": "Improved description here"
}
`
                }
            ],

        })
        const text = response.output_text
        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = {
                title: title,
                description: text
            };
        }
        return customRes(res, 201, true, "AI Suggest", "", result)

    }
    catch (err) {
        console.log("AI says::", err.message)
        return customRes(res, 500, false, "", err.message, "")
    }
}
export default postSuggestion