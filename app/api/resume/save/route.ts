import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../auth/[...nextauth]/utils";
import { prismaClient } from "@/app/prisma";

export async function POST(req: NextRequest) {
    const session = await getSession();
    const reqJson = await req.json()
    let resume;
    if(reqJson.id) {
        resume = await prismaClient.resume.update({
            where: {
                id: reqJson.id,
                userId: session?.user.id
            },
            data: reqJson
        })
    }
    else {
        resume = await prismaClient.resume.create({
            data: {
                ...reqJson,
                userId: session?.user.id
            }
        })
    }
    return NextResponse.json(resume)
}