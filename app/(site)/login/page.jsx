import styles from './login.module.css'
import Link from 'next/link'
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import OuterWindowWrapper from '@/app/components/OuterWindowWrapper';

export default function Login() {
    return (
        <OuterWindowWrapper>
            <section>
                <article>
                    <h2>Login</h2>
                    <form method="post" className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email">E-Mail</label>
                            <Input size='sm' placeholder="johndoe@mail.com" variant="outlined" />
                        </div>
                        <div className={styles.inputWrapper}>
                            <div className={styles.passwordRow}>
                                <label htmlFor="password">Password</label>
                                <Link
                                    href='/passwordChange'
                                    style={{ display: 'block' }}>
                                    <i>Forgot password?</i>
                                </Link>
                            </div>

                            <Input size='sm' placeholder="••••••••" variant="outlined" />
                        </div>
                        <Checkbox size='sm' label='Remember you?' />
                        <Button variant='soft' size='sm'>Sign In</Button>
                    </form>
                </article>
            </section>
        </OuterWindowWrapper>
    )
}