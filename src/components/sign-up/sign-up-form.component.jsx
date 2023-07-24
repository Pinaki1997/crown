import './sign-up-form.styles.scss'

import { createAuthUserWithEmailAndPassword, creteUserDocFromAuth } from "../../utils/firebase.utils";

import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import { useState } from "react";

const defaultFormFields = {
name: '',
email: '',
password: '',
confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("password not matched");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await creteUserDocFromAuth(user, {name});
            resetFormFields();
        } catch (err) {
            if(err.code === "auth/email-already-in-use"){
                alert("auth/email-already-in-use");
            } else {
                console.log("error", err.code)
            }
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Dont Have Account</h2>
            <span>Sign Up with Email</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="name" 
                    value={name} 
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;