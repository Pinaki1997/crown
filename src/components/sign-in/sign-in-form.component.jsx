import './sign-in-form.styles.scss'

import { creteUserDocFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase.utils";

import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import { UserContext } from '../../contexts/user.context';
import { useState } from "react";

const defaultFormFields = {
email: '',
password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (err) {
           
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Already Have Account</h2>
            <span>Sign Uinp with Email</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType="goggle" onClick={signInWithGoogle}>Sign In with Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;