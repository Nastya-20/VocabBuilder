import React from "react";
import { NavLink } from "react-router-dom";
import css from "./UserNav.module.css";

const UserNav = ({ onLinkClick }) => {

    return (
        <ul className={css.navList}>
            <li>
                <NavLink
                    to="/dictionary"
                    className={({ isActive }) => (isActive ? css.active : "")}
                    onClick={onLinkClick}
                >
                    Dictionary
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/recommend"
                    className={({ isActive }) => (isActive ? css.active : "")}
                    onClick={onLinkClick}
                >
                    Recommend
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/training"
                    className={({ isActive }) => (isActive ? css.active : "")}
                    onClick={onLinkClick}
                >
                    Training
                </NavLink>
            </li>
        </ul>
      );
};

export default UserNav;
