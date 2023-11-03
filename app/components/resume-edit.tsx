"use client"

import { faArrowUp, faArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Textarea, Input, Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import { useCallback, useState } from "react";
import { ResumeModel } from "../models/resumeObject";
import { useRouter } from "next/navigation";

export default function ResumeEdit({ resume }: { resume: ResumeModel }) {
    const router = useRouter()

    const [resumeEdit, setResumeEdit] = useState({
        ...resume
    })
    console.log(resumeEdit)

    const handleRootInputChange = useCallback((event: any) => {
        const {name, value} = event.target;

        setResumeEdit({
            ...resumeEdit,
            [name]: value
        })
    }, [resumeEdit])

    const handleObjectInputChange = useCallback((event: any) => {
        const {name, value} = event.target;

        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                [name]: value
            }
        })
    }, [resumeEdit])

    const handleEmploymentListChange = useCallback((event: any,  changeIndex: number) => {
        const {name, value} = event.target;
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.map((listValue: any, index: number) => {
                    return index !== changeIndex ? listValue : {
                        ...listValue,
                        [name]: value
                    }
                })
            }
        })
    },[ resumeEdit])

    const handleDutieChange = useCallback((event: any,  employmentIndex: number, dutieIndex: number) => {
        const {name, value} = event.target;
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.map((listValue: any, index: number) => {
                    return index !== employmentIndex ? listValue : {
                        ...listValue,
                        duties: listValue.duties.map((dutie:any, index: number) => {
                            return index !== dutieIndex ? dutie : value
                        })
                    }
                })
            }
        })
    },[ resumeEdit])

    const handleMoveEmployment = useCallback((index: number, direction: "down" | "up") => {
        const newEmployment = [
            ...resumeEdit.json.employment
        ]
        const swapIndex = direction === 'down' ? 1 : -1

        newEmployment[index] = resumeEdit.json.employment[index + swapIndex]
        newEmployment[index + swapIndex] = resumeEdit.json.employment[index]
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: newEmployment
            }
        })
    }, [resumeEdit])

    const handleDeleteEmployment = useCallback((index: number) => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.filter((employment:any, employmentIndex: number) => {return index !== employmentIndex})
            }
        })
    }, [resumeEdit])

    const handleAddNewEmployment = useCallback(() => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: [
                    {
                        "title": "Title",
                        "duties": [
                            "Dutie 1"
                        ],
                        "company": "Company Name",
                        "endDate": "End Date",
                        "startDate": "Start Date"
                    },
                    ...resumeEdit.json.employment,
                ]
            }
        })
    }, [resumeEdit])

    
    const handleDeleteDutie = useCallback((employmentIndex: number, dutieIndex: number) => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.map((employment: any, empIndex: number) => {
                    return employmentIndex !== empIndex ? employment : {
                        ...employment,
                        duties: employment.duties.filter((dutie: any, dutIndex: number) => { return dutIndex !== dutieIndex})
                    }
                })
            }
        })
    }, [resumeEdit])

    const handleMoveDutie = useCallback((employmentIndex: number, dutieIndex: number, direction: "down" | "up") => {
        const swapIndex = direction === 'down' ? 1 : -1

        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.map((employment: any, empIndex: number) => {
                    const newDuties = [
                        ...employment.duties
                    ]
                    newDuties[dutieIndex] = employment.duties[dutieIndex + swapIndex]
                    newDuties[dutieIndex + swapIndex] = employment.duties[dutieIndex]
                    return employmentIndex !== empIndex ? employment : {
                        ...employment,
                        duties: newDuties
                    }
                })
            }
        })
    }, [resumeEdit])

    const handleAddNewDuty = useCallback((employmentIndex: number) => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                employment: resumeEdit.json.employment.map((employment: any, empIndex: number) => {
                    return employmentIndex !== empIndex ? employment : {
                        ...employment,
                        duties: [
                            "New Dutie",
                            ...employment.duties
                        ]
                    }
                })
            }
        })
    }, [resumeEdit])

    const handleSave = useCallback(async() => {
        const response = await fetch('/api/resume/save', {
            method: 'POST',
            body: JSON.stringify(resumeEdit),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await response.json()
    }, [resumeEdit])

    const handlePreview = useCallback(async() => {
        const resume = await handleSave()
        router.push(`/resumes/${resume.id}/pdf`)
    }, [resumeEdit])

    const handleAddSkill = useCallback(() => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                skills: [
                    "New Skill",
                    ...resumeEdit.json.skills
                ]
            }
        })
    }, [resumeEdit])

    const handleChangeSkill = useCallback((event: any, skillIndex: number) => {
        const {name, value} = event.target;
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                skills: resumeEdit.json.skills.map((skill, index) => {
                    return skillIndex !== index ? skill: value
                })
            }
        })
    }, [resumeEdit])

    const handleDeleteSkill = useCallback((skillIndex: number) => {
        setResumeEdit({
            ...resumeEdit,
            json: {
                ...resumeEdit.json,
                skills: resumeEdit.json.skills.filter((skill, index) => {
                    return skillIndex !== index
                })
            }
        })
    }, [resumeEdit])
    return (
        <div className="bg-white px-8 pt-6 pb-8">
            <div className="flex flex-col gap-5">
                <div className="flex flex-row-reverse gap-2">
                    <Button color="green" onClick={handleSave}>Save</Button>
                    <Button onClick={handlePreview}>Preview</Button>
                </div>
                <Input label="Title" name="title" onChange={handleRootInputChange} value={resumeEdit.title}/>
                <Input label="Name" name="name" onChange={handleObjectInputChange} value={resumeEdit.json.name}/>
                <div className="flex flex-row gap-2">
                    <Input label="Email" name="email" onChange={handleObjectInputChange} value={resumeEdit.json.email}/>
                    <Input label="Phone" name="phone" onChange={handleObjectInputChange} value={resumeEdit.json.phone}/>
                </div>
                <Typography variant="h5">Skills</Typography>
                <Button onClick={handleAddSkill}>Add Skill</Button>
                <div className="flex flex-col gap-2">
                    {resumeEdit.json.skills.map((skill, index) => {
                        return (
                            <div className="flex gap-1" key={index}>
                                <Input label={`Skill ${index + 1}`} value={skill} onChange={(event) => handleChangeSkill(event, index)}/>
                                <IconButton color="red" onClick={() => handleDeleteSkill(index)}><FontAwesomeIcon icon={faTrash}/></IconButton>
                            </div>
                        )
                    })}
                </div>
                <Typography variant="h5">Employment</Typography>
                <Button onClick={handleAddNewEmployment}>Add Employment</Button>
                {resumeEdit.json.employment.map((employment: any, index: number) => {
                    return (
                        <Card key={index}>
                            <CardBody>
                                <div className="flex flex-col gap-2">
                                    <div className="flex">
                                        <div className="flex-1">
                                            <Typography variant="h5">
                                                {employment.title} - {employment.company}
                                            </Typography>
                                        </div>
                                        <div className="flex gap-2">
                                            {index !== 0 && <IconButton onClick={() => {handleMoveEmployment(index, "up")}}>
                                                <FontAwesomeIcon icon={faArrowUp}/>
                                            </IconButton>}
                                            {index < resumeEdit.json.employment.length - 1 && <IconButton onClick={() => {handleMoveEmployment(index, "down")}}>
                                                <FontAwesomeIcon icon={faArrowDown}/>
                                            </IconButton>}
                                            
                                            <IconButton color="red" onClick={() => handleDeleteEmployment(index)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Input label="Company" name="company" value={employment.company} onChange={(event) => handleEmploymentListChange(event, index)}/>
                                    <Input label="Title" name="title" value={employment.title} onChange={(event) => handleEmploymentListChange(event, index)}/>
                                    <div className="grid grid-cols-1 xl:grid-cols-2  gap-2">
                                        <Input label="Start Date" name="startDate" value={employment.startDate} onChange={(event) => handleEmploymentListChange(event, index)}/>
                                        <Input label="End Date" name="endDate" value={employment.endDate} onChange={(event) => handleEmploymentListChange(event, index)}/>
                                    </div>
                                    <Typography variant="h6">
                                        Duties
                                    </Typography>

                                    <Button className="mb-4" onClick={() => handleAddNewDuty(index)}>Add Duty</Button>
                                    {employment.duties.map((dutie:any, dutieIndex:number) => {
                                        return (
                                            <div key={dutieIndex} className="flex gap-2">
                                                <Textarea value={dutie} rows={2} label={`Duty ${dutieIndex + 1}`} onChange={(event)=> {handleDutieChange(event, index, dutieIndex)}}/>
                                                <div className="flex flex-col gap-1">
                                                <IconButton color="red" size="sm" onClick={() => handleDeleteDutie(index, dutieIndex)}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </IconButton>
                                                {dutieIndex !== 0 && <IconButton size="sm" onClick={() => {handleMoveDutie(index, dutieIndex, "up")}}>
                                                    <FontAwesomeIcon icon={faArrowUp}/>
                                                </IconButton>}
                                                {dutieIndex < employment.duties.length - 1 && <IconButton size="sm" onClick={() => {handleMoveDutie(index,dutieIndex, "down")}}>
                                                    <FontAwesomeIcon icon={faArrowDown}/>
                                                </IconButton>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}