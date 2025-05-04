import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <svg
                className={styles.spinner}
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className={styles.path}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                />
            </svg>
        </div>
    )
}

export default Loader
