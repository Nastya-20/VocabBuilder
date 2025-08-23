import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from '../../redux/auth/selectors';
import css from "./UserBar.module.css";

const UserBar = ({ variant = "header" }) => {
    const user = useSelector(selectUser);

    return (
        <div className={`${css.userBar} ${variant === "menu" ? css.menuBar : ""}`}>
            <span
                className={`${css.userBarName} ${variant === "menu" ? css.menuUserName : ""
                    }`}
            >
                {user?.name}
            </span>
            <span
                className={`${css.userIconCircle} ${variant === "menu" ? css.menuIconCircle : ""
                    }`}
            >
                <svg className={css.userIcon} width="20" height="20">
                    <use href="/icons.svg#icon-user"></use>
                </svg>
            </span>
        </div>
    );
}

export default UserBar;
