import Link from 'next/link'
import React from 'react'



import styles from './navigation.module.css'

import { MdLogin, MdLogout } from "react-icons/md";
import { GiFoxTail } from "react-icons/gi";

import { Typography, Skeleton, Tooltip } from '@mui/joy';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

import * as MUI from '@mui/joy';
import { useStore } from '../stores/userStore';

const NavigationButton = dynamic(() => import('./NavigationButton'), {
    loading: () => <Skeleton variant="text" sx={{ width: 60, marginLeft: '50px', marginBlock: 'auto' }} />, // Display a loading message while the component is being loaded
    ssr: false, // This will prevent the component from being SSR'd
});

export default function Navigation({ user }) {

    return (
        <nav className={styles.container}>
            <section className={styles.wrapper}>

                <Link href='/'>
                    <GiFoxTail className={styles.logo} />
                    Yu-Gi-Oh! Meta
                </Link>

                <section className={styles.linkBox}>
                    <Tooltip size='sm' variant="outlined" color="primary" title='Watch all Tournaments'>
                        <Link className={styles.link} href='/tournaments'>
                            <MUI.Link
                                color="primary"
                                disabled={false}
                                level="body-sm"
                                underline="none"
                                variant="plain"
                                component='p'
                            >Tournaments</MUI.Link>
                        </Link>
                    </Tooltip>

                    <Tooltip size='sm' variant="outlined" color="primary" title='Watch Statistics'>
                        <Link className={styles.link} href='/statistics'>
                            <MUI.Link
                                color="primary"
                                disabled={false}
                                level="body-sm"
                                underline="none"
                                variant="plain"
                                component='p'
                            >Statistics</MUI.Link>
                        </Link>
                    </Tooltip>
                    <NavigationButton />
                </section>

            </section>
        </nav >
    )
}
