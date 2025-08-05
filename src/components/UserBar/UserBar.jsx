import React from "react";
import { useSelector } from "react-redux";
import styles from "./UserBar.module.css";

const UserBar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={styles.userBar}>
            <span>{user?.name}</span>
            <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User avatar"
                className={styles.avatar}
            />
        </div>
    );
};

export default UserBar;
