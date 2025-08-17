import React from "react";
import { NavLink } from "react-router-dom";
import css from "./UserNav.module.css";

const UserNav = ({ onLinkClick }) => {

    return (
        <ul className={css.navList}>
            <li>
                <NavLink
                    to="/dictionary"
                    className={({ isActive }) => (isActive ? css.active : css.link)}
                    onClick={onLinkClick}
                >
                    Dictionary
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/recommend"
                    className={({ isActive }) => (isActive ? css.active : css.link)}
                    onClick={onLinkClick}
                >
                    Recommend
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/training"
                    className={({ isActive }) => (isActive ? css.active : css.link)}
                    onClick={onLinkClick}
                >
                    Training
                </NavLink>
            </li>
            <li className={css.logout}>
                <button className={css.logoutBtn}>Log out</button>
                <svg className={css.arrowIcon}
                    aria-hidden="true"
                    width="16"
                    height="17"
                >
                    <use href="/icons.svg#icon-arrow-right" />
                </svg>
            </li>
        </ul>
      );
};

export default UserNav;
