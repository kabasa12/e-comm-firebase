import React from 'react';
import SignIn from '../../components/sigin-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './auth.styles.scss';


const AuthPage = () => (
    <div className="auth">
        <SignIn />
        <SignUp />
    </div>
)

export default AuthPage;