'use client'

import OuterWindowWrapper from "@/app/components/OuterWindowWrapper"
import styles from './register.module.css'
import { Typography, Button, Input, Divider } from "@mui/joy"
import { MdPerson2, MdKey, MdEmail } from 'react-icons/md';
import Link from "next/link";
import { useState } from "react";
import PasswordMeter from "./PasswordMeter";

export default function Register() {
    const [fetching, setFetching] = useState(false)

    const [userInformation, setUserInformation] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const sendRegisterData = async () => {
        setFetching(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: userInformation.username,
                email: userInformation.email,
                password: userInformation.password,
                confirmPassword: userInformation.confirmPassword,
            })
        })

        if (response.status === 200) {
            const json = await response.json()

            Cookies.set('token', json, { expires: 7 })
            const currentToken = Cookies.get('token');

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
                await setUserName(json.username)
                await setUserID(json.id)
                await setUserRole(json.role)
                setSuccessOpen(true)
                setTimeout(() => {
                    setFetching(false)
                    router.push('/');
                }, 1000)

            } else if (userInformation.status === 400) {
                const json = await response.json()
                console.log(json)
            }

        } else if (response.status === 400) {
            const error = await response.json()
            console.log(error)
            setFetching(false)
            setErrorMessage(error.msg)
            setErrorKey(error.key)
            setAlertOpen(true)
            setTimeout(() => {
                setErrorKey('')
            }, 5000)

            console.log(errorMessage)
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
                            <label htmlFor="username"><Typography>Username</Typography></label>
                            <Input startDecorator={<MdPerson2 />} onChange={e => setUserInformation({ username: e.target.value })} size='sm' placeholder="johndoe" variant="outlined" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email"><Typography>E-Mail</Typography></label>
                            <Input startDecorator={<MdEmail />} onChange={e => setUsername({ email: e.target.value })} size='sm' placeholder="johndoe@mail.com" variant="outlined" />
                        </div>
                        <div
                            id={styles.passwordMeter}
                            className={styles.inputWrapper}>
                            <div className={styles.passwordRow}>
                                <label htmlFor="password"><Typography>Password</Typography></label>
                            </div>
                            <PasswordMeter userInformation={userInformation} setUserInformation={setUserInformation} />
                        </div>

                        <div
                            id={styles.confirmPassword}
                            className={styles.inputWrapper}>
                            <label htmlFor="confimPassword"><Typography>Confirm Password</Typography></label>
                            <Input startDecorator={<MdKey />} onChange={e => setUsername({ confirmPassword: e.target.value })} size='sm' placeholder="••••••••••••" variant="outlined" />
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