import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, functions, function_call } = await req.json()

  console.log('Function call:', function_call)

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      stream: true,
      messages,
      max_tokens: 4096,
      functions,
      function_call
    })

    console.log('Response:', response.body)

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: err?.toString() }), {
      status: 500
    })
  }
}
