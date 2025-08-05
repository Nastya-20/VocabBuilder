import React, { useState } from "react";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import styles from "./Header.module.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>MyCompany</div>

            <button
                className={styles.burger}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
                <UserNav onLinkClick={() => setMenuOpen(false)} />
                <UserBar />
            </nav>
        </header>
    );
};

export default Header;
