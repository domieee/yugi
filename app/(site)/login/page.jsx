import styles from './login.module.css'
import Link from 'next/link'

export default function Login() {
    return (

        <section>
            <article>
                <h2>Login</h2>
                <form method="post">
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" name="email" id="email" />
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

                        <input type="password" name="password" id="password" />
                    </div>

                </form>
            </article>
        </section>
    )
}