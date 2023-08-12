import Link from 'next/link'
import React from 'react'

import Tooltip from '@mui/joy/Tooltip';

import { GiFoxTail } from "react-icons/gi";

import styles from './navigation.module.css'

import { MdLogin, MdLogout } from "react-icons/md";
import { Typography } from '@mui/joy';

export default function Navigation() {
    return (
        <nav className={styles.container}>
            <section className={styles.wrapper}>

                <Link href='/'>
                    <GiFoxTail className={styles.logo} />
                    Yu-Gi-Oh! Meta
                </Link>

                <section className={styles.linkBox}>
                    <Tooltip size='sm' variant="outlined" color="primary" title='Watch all Tournaments'>
                        <Link href='/tournaments'><Typography component='p' level='body-md' >Tournaments</Typography></Link>
                    </Tooltip>

                    <Tooltip size='sm' variant="outlined" color="primary" title='Watch Statistics'>
                        <Link href='/statistics'><Typography component='p' level='body-md' >Statistics</Typography></Link>
                    </Tooltip>


                    <Link href='/login'>
                        <Tooltip size='sm' variant="outlined" color="primary" title='Login'>
                            <MdLogin style={{ marginLeft: '50px' }} />
                        </Tooltip>
                    </Link>



                </section>
            </section>
        </nav >
    )
}