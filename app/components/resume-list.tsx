import Link from "next/link";
import { prismaClient } from "../prisma";
import { Prisma } from "@prisma/client";

export default async function ResumeList({resumes}: {resumes:any[]}) {
    return (
        <>
            {resumes.map((resume) => (
                <div key={resume.id}>
                    <Link href={`/resumes/${resume.id}`}>{resume.title}</Link>
                </div>
            ))}
        </>
    )
}