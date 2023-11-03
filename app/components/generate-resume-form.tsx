'use client'

import { useCallback, useState } from "react"
import { Button, Textarea, Input, Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function GenerateResumeForm() {
    const router = useRouter()
    const [createParams, setCreateParams] = useState({ title: '', description: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateResumeClick = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch("/api/resume/generate", { method: "POST", body: JSON.stringify(createParams)})
        const json = await response.json()
        setIsLoading(false)
        router.push(`/resumes/${json.id}`)
    }, [createParams])

    const handleInputChange = useCallback((event: any) => {
        const {name, value} = event.target;
        setCreateParams({
            ...createParams,
            [name]: value,
        })
    }, [createParams])

    return (
        <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Title
                    </label>
                    <Input variant="outlined" label="Job Title" name="title" onChange={handleInputChange} value={createParams.title} disabled={isLoading}/>
                </div>
                <div className="mb-6">
                    <Textarea rows={25} name="description" onChange={handleInputChange} value={createParams.description} label="Job Description" disabled={isLoading}/>
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled={isLoading} variant="filled" onClick={handleCreateResumeClick}>{isLoading ? 'Creating Resume...' : 'Create Resume'}</Button>
                    {isLoading && <Spinner/>}
                </div>
            </form>
        </div>
    )
}