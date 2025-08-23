import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../components/authSchema';
import css from "./LoginPage.module.css";
import { toast } from 'react-toastify'; 

const LoginPage = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const submitForm = async (data) => {
        try {
            await onSubmit(data); 
            reset();
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    };

    const handleRegisterClick = () => {
        navigate('/');
    }

    return (
        <>
            <div className={css.LoginContainer}>
                <div className={css.logo}>
                    <svg width="36" height="36">
                        <use className={css.logoIcon} href="/icons.svg#icon-logo"></use>
                    </svg>
                    <h2 className={css.logoName}>VocabBuilder</h2>
                </div>
                <div>
                    <img className={css.LoginImg} src='/public/illustration.png' alt="illustration" />
                </div>
                <p className={css.formWords}>Word  ·  Translation  ·  Grammar  ·  Progress</p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className={css.Form}>
                <h1 className={css.formName}>Login</h1>
                <p className={css.formText}>
                    Please enter your login details to continue using our service:
                </p>
                <div>
                    {errors.email && <p className={css.errors}>{errors.email.message}</p>}
                    <input
                        className={css.emailForm}
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                    />
                </div>

                <div>
                    {errors.password && <p className={css.errors}>{errors.password.message}</p>}
                    <div className={css.inputInner}>
                        <input
                            className={css.passwordForm}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="current-password"
                            {...register('password')}
                        />
                        <svg
                            className={css.iconEye}
                            aria-hidden="true"
                            width="16"
                            height="16"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            <use href={`/icons.svg#icon-eye${showPassword ? "" : "-off"}`} />
                        </svg>
                    </div>
                </div>

                <div className={css.formBtn}>
                    <button className={css.buttonFormLogin} type="submit">Login</button>
                    <button
                        className={css.buttonFormRegister}
                        type="button"
                        onClick={handleRegisterClick}
                    >
                        Register
                    </button>
                </div>
            </form>
        </>
    );
};

export default  LoginPage;