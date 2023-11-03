
import ResumeEdit from "@/app/components/resume-edit"
import ResumePdf from "@/app/components/resume-pdf"
import { ResumeModel } from "@/app/models/resumeObject"
import { prismaClient } from "@/app/prisma"
import { Typography } from "@material-tailwind/react"

export default async function Page({ params }: { params: { id: string } }) {
    const resume = await prismaClient.resume.findFirst({
        where: {
            id: params.id
        }
    })

    const resumeModel:ResumeModel = resume as any

    return (
        <ResumePdf resume={resume as any}/>
    ) 
}