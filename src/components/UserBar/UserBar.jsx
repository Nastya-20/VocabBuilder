import React from "react";
import { useSelector } from "react-redux";
import css from "./UserBar.module.css";

const UserBar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={css.userBar}>
            <span className={css.userBarName}>{user?.name}Nastya</span>
            <span className={css.userIconCircle}><svg className={css.userIcon} width="20" height="20">
                <use href="/icons.svg#icon-user"></use>
            </svg></span>
        </div>
    );
};

export default UserBar;
