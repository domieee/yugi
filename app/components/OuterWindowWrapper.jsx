

import { Children } from "react"

import styles from './OuterWindowWrapper.module.css'


export default function OuterWindowWrapper({ children }) {
    return (
        <div className={styles.wrapper}>
            {
                Children.map(children, (child) => (
                    child
                ))
            }
        </div>
    )
}
