import React, {  useState, FormEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styling/module.css';
//import { request } from 'http';
//import { create } from 'domain';
//import { updateExpression } from '@babel/types';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  street_address: string;
  postal_code: string;
  city: string;
  user_name: string;
  password: string;
  confirmPassword: string;
}


const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//const POSTALCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

const Register: React.FC = () => {

  const [formData, setFormData] = useState<UserData>({
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    street_address: '',
    postal_code: '',
    city: '',
    user_name: '',
    password: '',
    confirmPassword: '',
  });

  //const [error, setError] = useState<string >("");
  //const [success, setSuccess] = useState<boolean>(false);
const [error, setError] = useState(
    {email: '',
    password: '',
    confirmPassword: '',
    form: '', // Add this if you want to store form-wide errors
  }
  );  

  //const [successful, setSuccessful] = useState<boolean>(false);
  const [submissionState, setSubmissionState] = useState('idle');
  const [usernameValid, setUsernameValid] = useState(true);
 //const [isFormValid, setIsFormValid] = useState(false);
 

/*   const validForm= () => {
     // Check if all required fields are filled in
    const requiredFields =Object.values(formData).every(value => value.trim() !== '');
    console.log(formData);
    console.log("requiredFields:" + requiredFields);
    //Check REGEX
    //const validEmail = EMAIL_REGEX.test(formData.email);
   // const validPostalCode = POSTALCODE_REGEX.test(formData.postalCode);
    const validConfirmPassword = formData.password === formData.confirmPassword;
    //setIsFormValid(requiredFields && validEmail && validPostalCode && validConfirmPassword);
    setIsFormValid(requiredFields && validConfirmPassword);
  }  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("DBG: Update name:" + name + ":" + value);
    setFormData({...formData, [name]: value });
        //console.log("DBG: " + prevState);
        //console.log("DBG: " + name + ":" + value);
        if(name === 'email' && !EMAIL_REGEX.test(value)){
          setError(prevState => ({...prevState, email: 'Email is not valid'}));
        }else {setError(prevState => ({...prevState, email: ''}));}       
        if(name === "password" && value.length < 3){
          setError(prevState => ({...prevState, password: 'Password must be at least 3 characters'}));
        }else {setError(prevState => ({...prevState, password: ''}));}
        if(name === 'confirmPassword' && value !== formData.password){
          setError(prevState => ({...prevState, confirmPassword: 'Passwords do not match'}));
        }else {setError(prevState => ({...prevState, confirmPassword: ''}));}

/*         if (e.target.name === "user_name" && value.length < 3){
          setError('Username must be at least 3 characters');
        } */

        // After state update, validate form
      };
 // Clear or set error messages as needed


    // Validate the field (you can expand the validation logic)
   
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
/* 
    if (EMAIL_REGEX.test(formData.email) === false) {
      setError('Email is not valid');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    } */
    if(Object.values(formData).some(value => value.trim() === '')){
      setError(prevState => ({...prevState, formData: "All fileds need to be filled" }));
      return;
    }
    //1122 new code, check for other error
/*     if(Object.values(error).some(error => error)){
      return;
    }
    setSubmissionState('pending'); */
      // Send data to the server (you can use fetch or Axios)
    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        //const data = await response.json();
        setSubmissionState('success');
      }else{
        throw new Error('Registration credentials are incorrect.');
      }
    } catch (error:any) {
      const message = typeof error.message === 'string' ? error.message : 'An unknown error occurred';
      console.error(error);    
      setError(message);
      setSubmissionState('error');
    }
  };



  return (
    <section className="registerContainer">
    <h1>Register now and join us!</h1>
    <h5>* Mandory field </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form">
            {/* Other form fields go here */}
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              placeholder="*First name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              placeholder="* Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="* Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
             {error.email && <p className="error">{error.email}</p>}
             <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="telephone"
              placeholder="* Phone number"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
            <label htmlFor="streeAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="street_address"
              placeholder="* Street address"
              value={formData.street_address}
              onChange={handleChange}
              required
            />

            <label htmlFor="postalcode">Postal code</label>
            <input
            type="text"
            id="postalCode"
            name="postal_code"
            placeholder="* Postal code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            />
             {/* {error.postalCode && <p className="error">{error.postalCode}</p>} */}
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="* City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            
          <label htmlFor="userName">Give yourself username and password</label>
          <input
            type="text"
            id="userName"
            name="user_name"
            placeholder="* Username"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
       {/*    {error.userNm && <p className="error">{error}</p>} */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="* Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="error">{error.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="* confirm password must match your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />          
         {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
          <p> 
          By registering, you agree to our 
          <a className="terms" href="/terms">Terms and Conditions of Use</a>, 
          and <a className="terms" href="/privacy">Privacy Policy</a>.
          </p>
            {/* Conditional UI controls based on submission state */}
            {submissionState === 'processing' && <span>Processing...</span>}
            {submissionState === 'success' && <span>Success!</span>}
            {submissionState === 'error' && <span>Error. Please try again.</span>}
            {error.form && <p className="error">{error.form}</p>}
           {/*  here has prolem, even fill all fileds, still can not submit */}
            {/* {submissionState === 'idle' && <button type="submit" disabled={Object.values(error).some(msg => msg)} > Register</button>} */}
            {submissionState === 'idle' && <button type="submit" >Register</button>} 

          </div>
        </form>
        {Object.values(error).map((error, index)=> 
        (error && <p key={index} className="error"> {error} 
      </p> ) )}
      
      
    </section>
  );
};

export default Register;