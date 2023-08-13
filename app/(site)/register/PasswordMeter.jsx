import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { MdKey } from 'react-icons/md';

import styles from './register.module.css'

export default function PasswordMeter({ userInformation, setUserInformation, error }) {
    const minLength = 12;

    const handlePasswordChange = (event) => {
        setUserInformation(event.target.value);
    };

    return (
        <Stack
            spacing={0.5}
            sx={{
                '--hue': Math.min(userInformation.length * 10, 120),
            }}
        >
            <Input
                size='sm'
                type="password"
                placeholder="••••••••••••"
                startDecorator={<MdKey />}
                color={error.key === 'password' || error.key === 'repeatPassword' ? 'danger' : 'neutral'}
                value={userInformation.password}
                onChange={handlePasswordChange} // Use the updated handler
            />
            {error.key === 'password' ? <Typography level="body-sm" color="danger">{error.msg}</Typography> : null}
            <LinearProgress
                determinate
                size="sm"
                value={Math.min((userInformation.length * 100) / minLength, 100)}
                sx={{
                    bgcolor: 'background.level3',
                    color: 'hsl(var(--hue) 80% 40%)',
                }}
            />
            <Typography
                level="body-xs"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
                {userInformation.length < 3 && 'Very weak'}
                {userInformation.length >= 3 && userInformation.length < 6 && 'Weak'}
                {userInformation.length >= 6 && userInformation.length < 10 && 'Strong'}
                {userInformation.length >= 10 && 'Very strong'}
            </Typography>
        </Stack>
    );
}