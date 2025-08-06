import React, { useState, useEffect } from "react";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.code === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setMenuOpen(false);
        }
    };

    return (
        <header className={css.header}>
            <div className={css.logo}>
                <svg width="36" height="36">
                    <use className={css.logoIcon} href="/icons.svg#icon-logo"></use>
                </svg>
                <h2 className={css.logoName}>VocabBuilder</h2>
            </div>
            <UserBar />
                <button
                    className={css.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg width="32" height="22">
                        <use className={css.burgerIcon} href="/icons.svg#icon-burger"></use>
                    </svg>
                </button>

                {menuOpen && (
                    <div
                        className={`${css.nav} ${menuOpen ? css.open : ""}`}
                        onClick={handleBackdropClick}
                    >
                        <div className={css.modalBackdrop}>
                        <div className={css.modalContent}>
                            <div className={css.headerUserBar}>
                            <UserBar />
                             <button  className={css.closeBtn}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>
                                <UserNav onLinkClick={() => setMenuOpen(false)} />
                        </div>
                        <img className={css.headerImg} src='/public/illustration.png' alt="illustration" />
                    </div>
                    </div>
                )}
        </header>
    );
};

export default Header;

