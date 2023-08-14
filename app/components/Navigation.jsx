import Link from 'next/link'
import React from 'react'



import styles from './navigation.module.css'

import { MdLogin, MdLogout } from "react-icons/md";
import { GiFoxHead } from "react-icons/gi";

import { Typography, Skeleton, Tooltip, Button } from '@mui/joy';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

import * as MUI from '@mui/joy';
import { useStore } from '../stores/userStore';

const NavigationButton = dynamic(() => import('./NavigationButton'), {
    loading: () => <Skeleton variant="rectangular" width={27.5} height={27.5} sx={{ marginLeft: '50px' }} />, // Display a loading message while the component is being loaded
    ssr: false, // This will prevent the component from being SSR'd
});

export default function Navigation({ user }) {

    return (
        <>
            <nav className={styles.container}>
                <section className={styles.wrapper}>

                    <Link href='/'>
                        <div className={styles.logoContainer}>
                            <GiFoxHead className={styles.logo} />
                            <Typography>Duelist Meta</Typography>
                        </div>
                    </Link>

                    <section className={styles.linkBox}>
                        <Tooltip size='sm' variant="outlined" color="primary" title='Watch all Tournaments'>
                            <Link className={styles.link} href='/tournaments'>
                                <MUI.Link
                                    paddingInline={2}
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
                                    paddingInline={2}
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
            <MUI.Divider orientation='horizontal' />
        </>
    )
}
