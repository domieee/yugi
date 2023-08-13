'use client'

import OuterWindowWrapper from "@/app/components/OuterWindowWrapper"
import styles from './register.module.css'
import { Typography, Button, Input, Divider } from "@mui/joy"
import { MdPerson2, MdKey, MdEmail } from 'react-icons/md';
import Link from "next/link";
import { useState } from "react";
import PasswordMeter from "./PasswordMeter";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";

import { useStore } from '@/app/stores/userStore';

export default function Register() {
    const [fetching, setFetching] = useState(false)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState({ msg: '', key: '' })

    const setUserName = useStore((state) => state.setUserName)
    const setUserID = useStore((state) => state.setUserID)
    const setUserRole = useStore((state) => state.setUserRole)

    const router = useRouter()

    const sendRegisterData = async () => {

        setFetching(true)

        const requestBody = {
            username: String(username),
            email: String(email),
            password: String(password),
            confirmPassword: String(confirmPassword),
        }

        console.log(requestBody)

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(requestBody)
        })

        if (response.status === 200) {
            const json = await response.json()

            Cookies.set('userToken', json, { expires: 1 })
            const currentToken = Cookies.get('userToken');

            const userInformation = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/receive-user-informations`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    token: currentToken
                })
            });

            if (userInformation.status === 200) {
                const json = await userInformation.json()

                setFetching(false)

                await setUserName(json.username)
                await setUserID(json.id)
                await setUserRole(json.role)

                router.push('/');

            } else if (userInformation.status === 400) {
                const error = await response.json()
                console.log(error)
            }

        } else if (response.status === 400) {
            setFetching(false)
            const error = await response.json()
            setError(error)
            console.log("🚀 ~ file: page.jsx:77 ~ sendRegisterData ~ error:", error)
        } else {
            const json = await response.json()
            console.log(json)
        }
    }
    return (
        <OuterWindowWrapper>
            <section className={styles.registerWrapper}>
                <article className={styles.registerContainer}>
                    <h2>Register</h2>
                    <Divider />
                    <form method="post" className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='username' level="body-md">Username</Typography>
                            <Input color={error.key === 'username' ? 'danger' : 'neutral'} name='username' startDecorator={<MdPerson2 />} onChange={e => {
                                setUsername(e.target.value)
                                console.log(username)
                            }} size='sm' placeholder="johndoe" variant="outlined" />
                            {error.key === 'username' ? <Typography level="body-sm" color="danger">{error.msg}</Typography> : null}
                        </div>
                        <div className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='email' level="body-md">E-Mail</Typography>
                            <Input color={error.key === 'email' ? 'danger' : 'neutral'} name="email" startDecorator={<MdEmail />} onChange={e => setEmail(e.target.value)} size='sm' placeholder="johndoe@mail.com" variant="outlined" />
                            {error.key === 'email' ? <Typography level="body-sm" color="danger">{error.msg}</Typography> : null}
                        </div>
                        <div id={styles.passwordMeter} className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='password' level="body-md">Password</Typography>
                            <PasswordMeter userInformation={password} setUserInformation={setPassword} error={error} />
                        </div>

                        <div id={styles.confirmPassword} className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='confirmPassword' level="body-md">Confirm Password</Typography>
                            <Input color={error.key === 'confirmPassword' || error.key === 'repeatPassword' ? 'danger' : 'neutral'} name="confirmPassword" startDecorator={<MdKey />} onChange={e => setConfirmPassword(e.target.value)} size='sm' placeholder="••••••••••••" variant="outlined" />
                            {error.key === 'confirmPassword' || error.key === 'repeatPassword' ? <Typography level="body-sm" color="danger">{error.msg}</Typography> : null}
                        </div>

                        {fetching ?
                            <Button size='sm' className={styles.registerButton} variant='soft' loading>Loading</Button> :
                            <Button onClick={() => sendRegisterData()} className={styles.registerButton} variant='soft' size='sm'>Sign Up</Button>}
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Typography className={styles.login} level='body-xs'><Link href='/login'> Already have an account?</Link></Typography>
                    </form>
                </article>
            </section>
        </OuterWindowWrapper>
    )
}