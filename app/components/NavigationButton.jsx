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

    const router = useRouter()
    console.log("🚀 ~ file: NavigationButton.jsx:14 ~ NavigationButton ~ username:", username)
    const logoutUser = () => {
        setUserName(undefined)
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        username === undefined ?
            <Link style={{ marginInlineStart: '50px' }} href='/login'>
                <Tooltip size='sm' variant="outlined" color="primary" title='Login'>
                    <MdLogin />
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
                        <MenuItem onClick={() => router.push('/interface')}>
                            <ListItemDecorator>
                                <MdOutlineAddBox />
                            </ListItemDecorator>
                            Interface
                        </MenuItem>
                        <ListDivider />

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