
import ResumeEdit from "@/app/components/resume-edit"
import { prismaClient } from "@/app/prisma"

export default async function Page({ params }: { params: { id: string } }) {
    const resume = await prismaClient.resume.findFirst({
        where: {
            id: params.id
        }
    })
    
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="sm:w-full md:w-full lg:w-1/2">
                <ResumeEdit resume={resume as any}/>
            </div>
        </main>
    ) 
}