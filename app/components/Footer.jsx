import React from 'react'
import { Box, Divider, Link, Sheet, Typography } from '@mui/joy'
import Image from 'next/image'
import { GiFoxHead } from 'react-icons/gi'

import styles from './footer.module.css'

export default function Footer() {
    return (
        <>
            <Divider />
            <Sheet
                sx={{
                    width: '100%',
                }}>
                <Box
                    sx={{
                        paddingInline: '125px',
                        paddingBlock: '25px',
                        marginInline: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        maxWidth: '1280px'
                    }}>
                    <div style={{ display: 'flex' }}>
                        <Divider orientation='vertical' sx={{ marginRight: '20px' }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '250px',
                                height: '100%'
                            }}>
                            <div style={{ width: '40px', height: '40px' }}>
                                <GiFoxHead style={{ width: '25px', height: '25px' }} />
                            </div>
                            <Link level='body-sm' color='neutral' href='/imprint'>Imprint</Link>
                            <Link level='body-sm' color='neutral' href='/privacy-policy'>Privacy Policy</Link>

                        </Box>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Divider orientation='vertical' sx={{ marginRight: '20px' }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '250px'
                            }}>
                            <Link level='body-sm' color='neutral' href='/imprint'>Tournaments</Link>
                            <Link level='body-sm' color='neutral' href='/privacy-policy'>Statistics</Link>
                        </Box>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Divider color='danger' orientation='vertical' sx={{ marginRight: '20px' }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '250px'
                            }}>

                            <Sheet className={styles.coffeeContainer} >
                                <Typography
                                    level='body-xs'
                                    marginBottom='10px'>
                                    We are constantly working on improving this website. Do you have any suggestions for improvement, or would you like to support the project? Follow the links below.
                                </Typography>
                                <Link
                                    color='primary'
                                    href='/feedback'
                                    level='body-xs'
                                    style={{ marginBottom: '10px' }}>
                                    Write a feedback
                                </Link>
                                <a href="https://www.buymeacoffee.com/domiedev">
                                    <Image
                                        src='/bmc-button.png'
                                        alt='Buy me a Coffee Button'
                                        width={130}
                                        height={35} />
                                </a>
                            </Sheet>

                        </Box>
                    </div>
                </Box>
            </Sheet>

        </>
    )
}
