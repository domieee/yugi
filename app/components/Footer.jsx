import React from 'react'
import { Box, Divider, Link, Sheet, Typography } from '@mui/joy'
import Image from 'next/image'
import { GiFoxTail } from 'react-icons/gi'

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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '250px',
                            height: '100%'
                        }}>
                        <Link level='body-sm' href='/imprint'>Imprint</Link>
                        <Link level='body-sm' href='/privacy-policy'>Privacy Policy</Link>
                        <GiFoxTail style={{ marginInline: 'auto', alignSelf: 'flex-end' }} />
                    </Box>
                    <Divider orientation='vertical' />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '250px'
                        }}>
                        <Link level='body-sm' href='/imprint'>Tournaments</Link>
                        <Link level='body-sm' href='/privacy-policy'>Statistics</Link>
                    </Box>
                    <Divider orientation='vertical' />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '250px'
                        }}>
                        <Typography
                            level='body-xs'
                            marginBottom='10px'>
                            We are constantly working on improving this website. Do you have any suggestions for improvement, or would you like to support the project? Follow the links below.
                        </Typography>
                        <Link href='/feedback'
                            level='body-sm'
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
                    </Box>
                </Box>
            </Sheet>

        </>
    )
}
