import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    const { input } = await request.json()

    const token = process.env.HUGGINGFACE_API_KEY

    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ inputs: input }),
      },
    )

    const blob = await response.blob()

    return new Response(blob)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('ERROR : ', error)
    return NextResponse.json({ error: error.message })
  }
}
