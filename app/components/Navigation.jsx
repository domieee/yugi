import Link from 'next/link'
import React from 'react'

import Tooltip from '@mui/joy/Tooltip';

import { GiFoxTail } from "react-icons/gi";

import styles from './navigation.module.css'

import { MdLogin, MdLogout } from "react-icons/md";

export default function Navigation() {
    return (
        <nav className={styles.container}>
            <section className={styles.wrapper}>

                <Link href='/'>
                    <GiFoxTail className={styles.logo} />
                    Yu-Gi-Oh! Meta
                </Link>

                <section className={styles.linkBox}>
                    <Tooltip size='sm' variant="plain" title='Watch all Tournaments'>
                        <Link href='/tournaments'>Tournaments</Link>
                    </Tooltip>

                    <Tooltip size='sm' variant="plain" title='Watch Statistics'>
                        <Link href='/statistics'>Statistics</Link>
                    </Tooltip>

                    <Tooltip size='sm' variant="plain" title='Login'>
                        <Link href='/login'><MdLogin /></Link>
                    </Tooltip>


                </section>
            </section>
        </nav >
    )
}