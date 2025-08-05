import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserNav.module.css";

const UserNav = ({ onLinkClick }) => {
    return (
        <ul className={styles.navList}>
            <li>
                <NavLink
                    to="/dictionary"
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    onClick={onLinkClick}
                >
                    Dictionary
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/recommend"
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    onClick={onLinkClick}
                >
                    Recommend
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/training"
                    className={({ isActive }) => (isActive ? styles.active : "")}
                    onClick={onLinkClick}
                >
                    Training
                </NavLink>
            </li>
        </ul>
    );
};

export default UserNav;
