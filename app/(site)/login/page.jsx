'use client'

import styles from './login.module.css'
import Link from 'next/link'
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import OuterWindowWrapper from '@/app/components/OuterWindowWrapper';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { Typography } from '@mui/joy';
import { useState } from 'react';
import { MdPerson2, MdKey } from 'react-icons/md';

export default function Login() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fetching, setFetching] = useState(false)

    const [alertVisibility, updateAlertVisibility] = useState(false)
    const [alert, updateAlert] = useState('')
    const [errorKey, setErrorKey] = useState('')

    const loginUser = async () => {
        const requestBody = {
            mailOrName: String(username),
            password: String(password)
        };

        setFetching(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(requestBody)
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
            })

            if (userInformation.status === 200) {

                const json = await userInformation.json()

                setTimeout(() => {
                    setFetching(false)

                    // TODO: Set the User in the global user store

                    // ? ...

                    // And navigate back to the homepage
                    router.push('/')
                }, 500)

            } else if (userInformation.status === 400) {
                setFetching(false)
                const json = await response.json()
                console.log(json)
            }

        } else if (response.status === 400) {

            const error = await response.json()
            console.log(error)
            setFetching(false)

            // Handle the errors in the UI
            updateAlertVisibility(true)
            updateAlert(error.msg)
            setTimeout(() => {
                setErrorKey('')

            }, 5000)

        } else {
            const error = await response.json()
            console.log(error)
        }
    }
    return (
        <OuterWindowWrapper>
            <section className={styles.loginWrapper}>
                <article className={styles.loginContainer}>
                    <h2>Login</h2>
                    <form method="post" className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email"><Typography>E-Mail or username</Typography></label>
                            <Input startDecorator={<MdPerson2 />} onChange={e => setUsername(e.target.value)} size='sm' placeholder="johndoe@mail.com" variant="outlined" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <div className={styles.passwordRow}>
                                <label htmlFor="password"><Typography>Password</Typography></label>
                            </div>

                            <Input startDecorator={<MdKey />} onChange={e => setPassword(e.target.value)} type='password' size='sm' placeholder="••••••••" variant="outlined" />
                        </div>
                        <Checkbox size='sm' label='Remember next time?' />
                        {fetching ?
                            <Button size='sm' className={styles.loginButton} variant='soft' loading>Loading</Button> :
                            <Button onClick={() => loginUser()} className={styles.loginButton} variant='soft' size='sm'>Sign In</Button>}
                        <Typography className={styles.register} level='body-xs'><Link href='/register'> Already registered? </Link></Typography>
                    </form>
                </article>
            </section>
        </OuterWindowWrapper >
    )
}