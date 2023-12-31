'use client'

import styles from './login.module.css'
import Link from 'next/link'
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import OuterWindowWrapper from '@/app/components/OuterWindowWrapper';

import { useStore } from '@/app/stores/userStore';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { Divider, Sheet, Typography } from '@mui/joy';
import { useState } from 'react';
import { MdPerson2, MdKey } from 'react-icons/md';

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [fetching, setFetching] = useState(false)

    const [error, setError] = useState({ msg: '', key: '' })
    const setUserName = useStore((state) => state.setUserName)
    const setUserID = useStore((state) => state.setUserID)
    const setUserRole = useStore((state) => state.setUserRole)

    const router = useRouter()

    const loginUser = async () => {

        // Set the state for controlling the loading UI to true
        setFetching(true)

        // Create our request body body and send it to the server
        const requestBody = {
            mailOrName: String(username),
            password: String(password)
        }

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

            // In case the checkbox for remembering the password is active, the token expires after one year, otherwise after one day.
            remember ?
                Cookies.set('userToken', json, { expires: 365 }, { secure: true }) :
                Cookies.set('userToken', json, { expires: 1 }, { secure: true })

            // Receive the user information by sending the token to the server and resolving it there.
            const currentToken = Cookies.get('userToken')

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

                // If we received the user information successfully, we write it in the user store and handle the UI states
                setFetching(false)
                await setUserName(json.username)
                await setUserID(json.id)
                await setUserRole(json.role)

                // After that, we navigate back to the homepage
                router.push('/')

            } else if (userInformation.status === 400) {
                setFetching(false)
                const error = await response.json()
                console.log(error)
            }

        } else if (response.status === 400) {
            setFetching(false)

            const error = await response.json()
            setError(error)
            console.log(error)
        } else {
            const error = await response.json()
            console.log(error)
        }
    }

    return (
        <OuterWindowWrapper>
            <section className={styles.loginWrapper}>
                <Sheet variant='outlined' color='primary' className={styles.loginContainer}>
                    <h2>Login</h2>
                    <Divider />
                    <form method="post" className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='email' level='body-md'>E-Mail or username</Typography>
                            <Input name='email' color={error.key === 'email' || error.key === 'mailOrPassword' ? 'danger' : 'neutral'} startDecorator={<MdPerson2 />} onChange={e => setUsername(e.target.value)} size='sm' placeholder="johndoe@mail.com" variant="outlined" />
                            {error.key === 'email' ? <Typography level='body-sm' color='danger'>{error.msg}</Typography> : null}
                        </div>
                        <div className={styles.inputWrapper}>
                            <Typography component='label' htmlFor='email' level='body-md'>Password</Typography>
                            <Input color={error.key === 'password' || error.key === 'mailOrPassword' ? 'danger' : 'neutral'} startDecorator={<MdKey />} onChange={e => setPassword(e.target.value)} type='password' size='sm' placeholder="••••••••••••" variant="outlined" />
                            {error.key === 'password' || error.key === 'mailOrPassword' ? <Typography level='body-sm' color='danger'>{error.msg}</Typography> : null}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <Checkbox
                                color="primary"
                                label={
                                    <Typography sx={{
                                        marginBottom: 'auto'
                                    }} level='body-xs'>Remember password?</Typography>
                                }
                                size="sm"
                                onChange={() => {
                                    remember ?
                                        setRemember(false) :
                                        setRemember(true)
                                }} />

                        </div>
                        {fetching ?
                            <Button size='sm' className={styles.loginButton} variant='soft' loading>Loading</Button> :
                            <Button onClick={() => loginUser()} className={styles.loginButton} variant='soft' size='sm'>Sign In</Button>}
                        <Divider sx={{ marginBottom: '10px' }} />
                        <Typography className={styles.register} level='body-xs'><Link href='/register'> Not registered yet?</Link></Typography>
                    </form>
                </Sheet>
            </section>
        </OuterWindowWrapper >
    )
}