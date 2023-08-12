'use client'

import Link from "next/link"
import { Tooltip, Skeleton, Typography, Button, Menu, MenuButton, MenuItem, Dropdown, IconButton, ListItemDecorator, ListDivider } from "@mui/joy"
import { MdLogin, MdKeyboardArrowDown, MdOutlineLogout, MdOutlineAddBox } from "react-icons/md"
import { useStore } from "../stores/userStore"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import styles from './NavigationButton.module.css'

export default function NavigationButton() {

    const setUserName = useStore((state) => state.setUserName)
    const setUserID = useStore((state) => state.setUserID)
    const setUserRole = useStore((state) => state.setUserRole)
    const username = useStore((state) => state.username)
    const role = useStore((state) => state.role)

    const router = useRouter()
    console.log("🚀 ~ file: NavigationButton.jsx:14 ~ NavigationButton ~ username:", username)
    const logoutUser = () => {
        setUserName(false)
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        username === false ?
            <Link style={{ marginInlineStart: '50px' }} href='/login'>
                <Tooltip size='sm' variant="outlined" color="primary" title='Login'>
                    <IconButton color="primary" size="sm" variant="outlined">
                        <MdLogin color='#EAEEF6' />
                    </IconButton>
                </Tooltip>
            </Link> :
            <>
                <Dropdown>
                    <MenuButton
                        sx={{ marginInlineStart: '50px' }}
                        endDecorator={<MdKeyboardArrowDown />}
                        color="primary"
                        size="sm">
                        {username}
                    </MenuButton>
                    <Menu
                        invertedColors
                        color="primary"
                        size="sm">
                        {role === 'administrator' || role === 'moderator' ?
                            <>
                                <MenuItem onClick={() => router.push('/interface')}>
                                    <ListItemDecorator>
                                        <MdOutlineAddBox />
                                    </ListItemDecorator>
                                    Interface
                                </MenuItem>
                                <ListDivider />
                            </> : null}

                        <MenuItem color="danger" onClick={logoutUser}>
                            <ListItemDecorator>
                                <MdOutlineLogout />
                            </ListItemDecorator>
                            Logout
                        </MenuItem>

                    </Menu>
                </Dropdown >
                {/* <Button size="sm" onClick={logoutUser}>Logout</Button> */}

            </>
    )
}