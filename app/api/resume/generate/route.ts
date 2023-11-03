import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "../../auth/[...nextauth]/utils"
import { prismaClient } from "@/app/prisma"
import { Prisma } from "@prisma/client"
import { sampleResumeJson } from "@/app/models/resumeObject"

//
export async function POST(req: NextRequest) {
    const session = await getSession()
    
    if (!session) {
        return
    }

    const json = await req.json()

    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GPT_BEARER}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": "You are a tool that generates JSON responses for resumes that are tailored to job titles and descriptions." },
                { "role": "system", "content": "The resume should target keywords found in the job title and description. The resume should be tailored to applicant tracking systems (ATS)" },
                { "role": "system", "content": "The resume should have multiple jobs of employment history" },
                { "role": "system", "content": `The JSON response should be in the following format\n${JSON.stringify(sampleResumeJson)}` },
                { "role": "system", "content": "The company name for employment history should not match the company name in the job description" },
                { "role": "user", "content": `Generate a resume in JSON format for the following job posting.\n Job Title: ${json.title}\nJob Description:\n${json.description}` }
            ]
        })
    })

    const gptJsonResponse = await gptResponse.json();
    const gptMessage = gptJsonResponse.choices[0].message.content;
    const gptMessageObject = JSON.parse(gptMessage)
    console.log(JSON.stringify(gptMessageObject, null, 3))

    const newJobPosting = await prismaClient.jobPosting.create({
        data: {
            title: json.title,
            description: json.description
        }
    })
    const newResume = await prismaClient.resume.create({
        data: {
            fromJobPostingId: newJobPosting.id,
            title: `Resume for ${json.title}`,
            userId: session.user.id,
            json: gptMessageObject
        }
    })

    let test:Prisma.ResumeSelect
    return NextResponse.json(newResume)
}