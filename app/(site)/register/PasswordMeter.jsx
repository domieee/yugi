import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { MdKey } from 'react-icons/md';

import styles from './register.module.css'

export default function PasswordMeter({ userInformation, setUserInformation }) {
    const minLength = 12;
    return (
        <Stack
            spacing={0.5}
            sx={{
                '--hue': Math.min(userInformation.password.length * 10, 120),
            }}
        >
            <Input
                size='sm'
                type="password"
                placeholder="••••••••••••"
                startDecorator={<MdKey />}

                value={userInformation.password}
                onChange={(event) => setUserInformation({ password: event.target.value })}
            />
            <LinearProgress
                determinate
                size="sm"
                value={Math.min((userInformation.password.length * 100) / minLength, 100)}
                sx={{
                    bgcolor: 'background.level3',
                    color: 'hsl(var(--hue) 80% 40%)',
                }}
            />
            <Typography
                level="body-xs"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
                {userInformation.password.length < 3 && 'Very weak'}
                {userInformation.password.length >= 3 && userInformation.password.length < 6 && 'Weak'}
                {userInformation.password.length >= 6 && userInformation.password.length < 10 && 'Strong'}
                {userInformation.password.length >= 10 && 'Very strong'}
            </Typography>
        </Stack>
    );
}