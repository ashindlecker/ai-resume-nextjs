import Image from 'next/image'
import {Session, getSession} from './api/auth/[...nextauth]/utils'
import SignoutButton from './components/signout-button'
import SigninButton from './components/signin-button'
import GenerateResumeForm from './components/generate-resume-form'
import { prismaClient } from './prisma'
import ResumeList from './components/resume-list'
import Link from 'next/link'
import Button from './components/button'


function NotLoggedInComponent() {
  return (
    <>
      <SigninButton/>
    </>
  )
}

function LoggedInComponent({session, resumes}: {session: Session, resumes: any}) {
  return (
    <>
      <p className="mb-5">Logged In as {session.user.name} <SignoutButton/></p>
      <Link href="/generate" className="mb-5"><Button>Generate Resume</Button></Link>
      <p className="text-xl">Resumes</p>
      <ResumeList resumes={resumes}/>
      {!resumes.length && (
        <>
          <p>No Resumes Generated. Generate your first resume and it will show up here</p>
        </>
      )}
    </>
  )
}

export default async function Home() {
  const session = await getSession()
  const isLoggedIn = (session !== null)

  const resumes = session && await prismaClient.resume.findMany({
    include: {
      user: true
    },
    where: {
      userId: session?.user.id
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-2xl">AI Resume Generator</p>
      <p className="text-lg mb-5">Feed in a job title and posting and we will generate a resume tailored to it</p>
      {isLoggedIn ? <LoggedInComponent session={session} resumes={resumes}/> : <NotLoggedInComponent/>}
    </main>
  )
}
