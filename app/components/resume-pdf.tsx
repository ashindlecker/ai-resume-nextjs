"use client"

import { Typography } from "@material-tailwind/react";
import { ResumeModel } from "../models/resumeObject";

import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Divider({ label }: { label: string }) {
    return (
        <div className="flex flex-row justify-center items-center gap-3">
            <div className="flex-1" style={{ borderTop: '3px black solid' }}></div>
            <Typography variant="h5">{label}</Typography>
            <div className="flex-1" style={{ borderTop: '3px black solid' }}></div>
        </div>
    )
}

export default function ResumePdf({ resume }: { resume: ResumeModel }) {

    return (
        <main className="bg-white min-h-screen p-5">
            <div className="flex flex-col gap-5">
                <Typography variant="h2" className="text-center">{resume.json.name}</Typography>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faEnvelope}/>
                        <Typography variant="paragraph">{resume.json.email}</Typography>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faPhone}/>
                        <Typography variant="paragraph">{resume.json.phone}</Typography>
                    </div>
                </div>
                <Divider label="Summary" />
                <Typography variant="small">{resume.json.summary}</Typography>
                <Divider label="Skills" />
                <ul className="flex flex-wrap pl-4" style={{listStyle:"initial"}}>
                    {resume.json.skills.map((skill, id) => {
                        return (
                            <li key={id} className="basis-1/2"><Typography variant="paragraph">{skill}</Typography></li>
                        )
                    })}
                </ul>
                <Divider label="Employment"/>
                {resume.json.employment.map((employment, id) => {
                    return (
                        <div key={id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h5">{employment.title} - {employment.company}</Typography>
                                <Typography variant="small">{employment.startDate} - {employment.endDate}</Typography>
                            </div>
                            <ul className="pl-4" style={{listStyle:"initial"}}>
                                {employment.duties.map((duty, id) => <li key={id}><Typography variant="paragraph">{duty}</Typography></li>)}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}