import React from 'react';
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
    return (
        <>
        <div className={css.RegisterContainer}>
        <div className={css.logo}> 
            <svg  width="36" height="36">
              <use className={css.logoIcon} href="/icons.svg#icon-logo"></use>
            </svg>
            <h2 className={css.logoName}>VocabBuilder</h2>
        </div>
        <div>
           <img className={css.RegisterImg} src='/public/illustration.png' />
            </div>   
            </div>
                <form className={css.Form}>
                    <h1 className={css.formName}>Register</h1>
                    <p className={css.formText}>To start using our services, please fill out the registration
                        form below. All fields are mandatory:
                    </p>
                    <div>
                         <input
                            className={css.nameForm}
                            type="text"
                            placeholder="Name"
                           />
                    </div>
                    <div>
                        <input
                            className={css.emailForm}
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                      <div className={css.inputInner}>
                            <input
                                className={css.passwordForm}
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                            />
                          </div>
                </div>
                <div className={css.formBtn}>
                    <button className={css.buttonFormRegister} type="submit">Register</button>
                    <button className={css.buttonFormLogin} type="submit">Login</button>
               </div>
            </form>
        </>
    );
} 