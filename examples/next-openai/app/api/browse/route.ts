import { Inngest } from 'inngest'

const inngest = new Inngest({ name: 'Vercel AI Demo' })

export const runtime = 'edge'

export async function POST(req: Request) {
  const { function_call } = await req.json()

  console.log('server hit')

  return new Response('OK')

  // const response = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo-0613',
  //   stream: true,
  //   messages,
  //   functions,
  //   function_call
  // })

  // const stream = OpenAIStream(response)
  // return new StreamingTextResponse(stream)
}
