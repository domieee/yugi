import React from 'react'
import { Box, Divider, Link, Sheet, Typography } from '@mui/joy'
import Image from 'next/image'

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
                            maxWidth: '250px'
                        }}>
                        <a href='/imprint'>
                            <Typography
                                variant='caption'>Imprint</Typography>
                        </a>
                        <a href='/privacy-policy'>
                            <Typography
                                variant='caption'>Privacy Policy</Typography>
                        </a>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '250px'
                        }}>
                        <Typography
                            variant='caption'
                            marginBottom='10px'
                        >We are constantly working on improving this website. Do you have any suggestions for improvement, or would you like to support the project? Follow the links below.</Typography>
                        <Link href='/feedback'
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
