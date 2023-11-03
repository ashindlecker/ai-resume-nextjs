import { NextResponse } from 'next/server'
import { getSession } from '../auth/[...nextauth]/utils'

export async function GET() {
    const session = await getSession()
    if(!session){
        return
    }
    return NextResponse.json(session)
}