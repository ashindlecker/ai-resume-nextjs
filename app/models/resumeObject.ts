export interface ResumeJsonEmploymentModel {
    title: string
    company: string
    startDate: string
    endDate: string
    duties: string[]
}
export interface ResumeJsonModel {
    name: string
    email: string
    phone: string
    summary: string
    skills: string[]
    employment: ResumeJsonEmploymentModel[]
}
export interface ResumeModel {
    id?: string
    created: Date
    userId: string
    title: string
    json: ResumeJsonModel
    fromJobPostingId: String
}

export const sampleResumeJson = {
    "name": "First name Last Name",
    "email": "email@domain.com",
    "phone": "111-111-1111",
    "summary": "Brief summary of the applicant", 
    "skills": [
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters",
        "Relevant Skill Tailored to Job Description no more than 25 characters"
    ],
    "employment": [
        { 
            "title": "Job Title", 
            "company": "Name of company", 
            "startDate": "Date of start", 
            "endDate": "Date of end. Should be Present if still employed", 
            "duties": [
                "Description of work", 
                "Another Description of work"
            ] 
        }, 
        { 
            "title": "Job Title", 
            "company": "Name of company", 
            "startDate": "Date of start", 
            "endDate": "Date of end. Should be Present if still employed", 
            "duties": [
                "Description of work", 
                "Another Description of work"
            ] 
        }, 
        { 
            "title": "Job Title", 
            "company": "Name of company", 
            "startDate": "Date of start", 
            "endDate": "Date of end. Should be Present if still employed", 
            "duties": [
                "Description of work", 
                "Another Description of work"
            ] 
        }, 
        { 
            "title": "Job Title", 
            "company": "Name of company", 
            "startDate": "Date of start", 
            "endDate": "Date of end. Should be Present if still employed", 
            "duties": [
                "Description of work", 
                "Another Description of work"
            ] 
        }, 
        { 
            "title": "Job Title", 
            "company": "Name of company", 
            "startDate": "Date of start", 
            "endDate": "Date of end. Should be Present if still employed", 
            "duties": [
                "Description of work", 
                "Another Description of work"
            ] 
        }
    ]
}