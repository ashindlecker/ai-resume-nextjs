'use client'

import { Button } from "@material-tailwind/react"
import { signIn } from "next-auth/react"
import { useCallback } from "react"

export default function SigninButton(){
    const handleClick = useCallback(() => {
        signIn("google")
    }, [])
    return <Button className="rounded-full" onClick={handleClick}>Sign in with Google</Button>
}