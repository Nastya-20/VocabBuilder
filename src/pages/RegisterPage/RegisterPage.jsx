import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../components/authSchema';
import css from "./RegisterPage.module.css";
import { toast } from 'react-toastify'; 

const RegisterPage = ({ onSubmit, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const submitForm = async (data) => {
        try {
            await onSubmit(data);
            onClose();
            reset();
       } catch (error) {
            toast.error(error.message || "Registration failed");
        }
    };
    const handleLoginClick = () => {
        navigate('/login');
    };
    
    return (
        <>
            <div className={css.RegisterContainer}>
                <div className={css.logo}>
                    <svg width="36" height="36">
                        <use className={css.logoIcon} href="/icons.svg#icon-logo"></use>
                    </svg>
                    <h2 className={css.logoName}>VocabBuilder</h2>
                </div>
                <div>
                    <img className={css.RegisterImg} src='/public/illustration.png' alt="illustration" />
                </div>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className={css.Form}>
                <h1 className={css.formName}>Register</h1>
                <p className={css.formText}>
                    To start using our services, please fill out the registration form below.
                    All fields are mandatory:
                </p>

                <div>
                    {errors.name && <p className={css.errors}>{errors.name.message}</p>}
                    <input
                        className={css.nameForm}
                        type="text"
                        placeholder="Name"
                        {...register('name')}
                    />
                </div>

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
                    <button className={css.buttonFormRegister} type="submit">Register</button>
                    <button
                        className={css.buttonFormLogin}
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default  RegisterPage;
