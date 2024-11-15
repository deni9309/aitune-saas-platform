import { NextResponse } from 'next/server'
import { ElevenLabsClient } from 'elevenlabs'
import { Readable } from 'stream'

export const POST = async (request: Request) => {
  try {
    const { input, voice } = await request.json()

    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    })

    const audioResponse = await elevenlabs.generate({
      voice: voice,
      text: input,
      model_id: 'eleven_monolingual_v1',
    })

    const readableAudio = Readable.from(audioResponse)
    const chunks = []

    for await (const chunk of readableAudio) {
      chunks.push(chunk)
    }

    const audioBuffer = Buffer.concat(chunks)

    return new NextResponse(audioBuffer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('ERROR : ', error)
    return NextResponse.json({ error: error.message })
  }
}
