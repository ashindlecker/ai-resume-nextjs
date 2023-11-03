import GenerateResumeForm from "../components/generate-resume-form";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p className="text-2xl mb-5">Generate New Resume</p>
            <GenerateResumeForm />
        </main>
    )
}