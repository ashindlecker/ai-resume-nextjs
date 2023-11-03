'use client'

import { Button } from "@material-tailwind/react"
import { signOut } from "next-auth/react"
import { useCallback } from "react"

export default function SignoutButton() {
    const handleClick = useCallback(() => {
        signOut()
    }, [])
    return <Button size="sm"  className="rounded-full" onClick={handleClick}>Signout</Button>
    
}