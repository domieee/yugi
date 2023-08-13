'use client'

import { useEffect } from "react"
import { useStore } from "../stores/userStore"

export default function Redirect({ user }) {
    const setUserName = useStore((state) => state.setUserName)
    const setUserID = useStore((state) => state.setUserID)
    const setUserRole = useStore((state) => state.setUserRole)

    useEffect(() => {
        const redirectToHompage = async () => {
            await setUserName(user.username)
            await setUserID(user.id)
            await setUserRole(user.role)
            router.push('/')
        }
        redirectToHompage()
    }, [])

}