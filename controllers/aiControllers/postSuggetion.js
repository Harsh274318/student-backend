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
Your task:
Analyze the given title and description, then generate an improved version of both.

Inputs:
- Title: "${title}"
- Description: "${description}"
- User Role: "${role}"

Instructions:
1. Understand the intent of the post based on the title and description.
2. Rewrite the title to be:
   - Clear, concise, and informative
   - Relevant to a school environment
   - Appropriate for the user's role (e.g., Teacher, Student, Admin)
3. Rewrite the description to be:
   - Well-structured and easy to read
   - Professional and appropriate for a school platform
   - Informative and complete
4. IMPORTANT:
   - If the description contains any links (URLs), DO NOT modify, remove, or replace them. Keep them exactly as they are.
5. Adjust tone based on role:
   - Teacher: instructional and formal
   - Student: simple and clear
   - Admin: official and directive
6. Do NOT add unnecessary content. Stay relevant to the original meaning.

Output Rules (VERY IMPORTANT):
- Return ONLY valid JSON.
- Do NOT include explanations, text, or formatting outside JSON.
- Follow this exact structure:
- If you cannot comply, still return valid JSON with best possible output.
- Ensure output is strictly parsable using JSON.parse().

{
  "title": "Improved title here",
  "description": "Improved description here"
}`
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