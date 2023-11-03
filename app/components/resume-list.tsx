import Link from "next/link";
import { prismaClient } from "../prisma";
import { Prisma } from "@prisma/client";

export default async function ResumeList({resumes}: {resumes:Prisma.ResumeSelect[]}) {
    return (
        <>
            {resumes.map((resume) => (
                <div>
                    <Link href={`/resumes/${resume.id}`}>{resume.title}</Link>
                </div>
            ))}
        </>
    )
}