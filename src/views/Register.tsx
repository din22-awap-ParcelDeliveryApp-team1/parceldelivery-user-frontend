import React, {  useState, FormEvent, } from 'react';
import '../styling/module.css';
import { Link } from 'react-router-dom';


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


const [error, setError] = useState(
    {email: '',
    password: '',
    confirmPassword: '',
    user_name: '',
    form: '', // Add this if you want to store form-wide errors
  }
  );
  //1124 to check username  
  const [usernameExists, setUsernameExists] = useState<boolean>(false); 
  const [submissionState, setSubmissionState] = useState('idle');
  //1201 add if success directly to login page
  const [success, setSuccess] = useState<boolean>(false);

  //1124 for check username
const checkUsername = async (user_name:string) => {
  //console.log(req.body);
  try {
    const query = JSON.stringify("username:"+user_name);
    const response = await fetch(`http://localhost:3001/user/check-username?user_name=${user_name}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',  
      },
    }); 

    const data = await response.json()
    console.log(data);
    
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    } 
    setUsernameExists(data.exists);  // Set the state based on the response
  } catch (error) {
    setError(prevState => ({...prevState, user_name: 'Username already exists'}));
    console.error(error);
    setUsernameExists(true);
  }
  }  

  const handleFocusChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;;
  };

  const handleBlurChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("DBG: handleOnBlurChange:" + name + ":" + e);
    checkUsername(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("DBG: Update name:" + name + ":" + value);
    setFormData({...formData, [name]: value });
        if(name === 'email' && !EMAIL_REGEX.test(value)){
          setError(prevState => ({...prevState, email: 'Email is not valid'}));
        }else {setError(prevState => ({...prevState, email: ''}));}       
        if(name === "password" && value.length < 3){
          setError(prevState => ({...prevState, password: 'Password must be at least 3 characters'}));
        }
        else {setError(prevState => ({...prevState, password: ''}));}
        if(name === 'confirmPassword' && value !== formData.password){
          setError(prevState => ({...prevState, confirmPassword: 'Passwords do not match'}));
        }      
        else {setError(prevState => ({...prevState, confirmPassword: ''}));}
          //1124 add username check
        if (name === 'user_name'){
          //checkUsername(value);
          } 
        if(formData.first_name.trim() === '' || formData.last_name.trim() === '' || formData.email.trim() === '' || formData.telephone.trim() === '' || formData.street_address.trim() === '' || formData.postal_code.trim() === '' || formData.city.trim() === '' || formData.user_name.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === ''){
          setError(prevState => ({...prevState, form: "All fileds need to be filled" }));
        }
        else {setError(prevState => ({...prevState, form: ''}));}

      };
 // Clear or set error messages as needed
   
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (EMAIL_REGEX.test(formData.email) === false) {
      setError(prevState => ({...prevState, email: 'Email is not valid'}));
      return;
    }
    if (formData.password.length < 3) {
      setError(prevState => ({...prevState, password: 'Password must be at least 3 characters'}));
      return;
    } 
    if (formData.password !== formData.confirmPassword) {
      setError(prevState => ({...prevState, confirmPassword: 'Passwords do not match'}));
      return;
    }

    if(formData.first_name.trim() === '' || formData.last_name.trim() === '' || formData.email.trim() === '' || formData.telephone.trim() === '' || formData.street_address.trim() === '' || formData.postal_code.trim() === '' || formData.city.trim() === '' || formData.user_name.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === ''){
      setError(prevState => ({...prevState, form: "All fileds need to be filled" }));
      //return;
    } 
    //1126 new code add here to tell error
    if(usernameExists){
      setError(prevState => ({...prevState, user_name: 'Username already exists'}));
      return;
    }
      // Send data to the server (you can use fetch or Axios)
    try {
      //to apply if statement to check if all fields are filled
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
        setSuccess(true); // Set success state to true, to tell direct to lgoin page
        setSubmissionState('success');
      }

    } catch (error) {
      const message = typeof (error as any).message === 'string' ? (error as any).message : 'An unknown error occurred';
      //console.error(error);    
      setError(message);
      setSuccess(false);
      setSubmissionState('error');
    }
  };

return (
    <section className="registerContainer">
    {submissionState !=="success" && <h1>Register now and join us!</h1>}
    {submissionState !== "success" && <h5>* Mandatory field</h5>}
    <div className="already-have-account">
      <p>Already have an account? <Link to="/signin">Sign in here</Link></p>
    </div>
    {submissionState !== "success" ?(
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
        <label htmlFor="streetAddress">Street Address</label>
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
        onFocus={handleFocusChange}
        onBlur={handleBlurChange}
        required
      />
      {/* 1124 new modify Show error message */}
       {usernameExists && <p className="error">Username already exists</p>}
   
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
        {submissionState === 'success' && 
        <span>Success!</span>
        }
        {submissionState === 'error' && <span>Error. Please try again.</span>}
        {error.form && <p className="error">{error.form}</p>}
       {/*  button will change to grey color if all condition is not done */}
      {/*  {submissionState === 'idle' && <button type="submit" disabled={(formData.first_name.trim() === '' || formData.last_name.trim() === '' || formData.email.trim() === '' || formData.telephone.trim() === '' || formData.street_address.trim() === '' || formData.postal_code.trim() === '' || formData.city.trim() === '' || formData.user_name.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === '')} > Register</button>} */}
      {submissionState === 'idle' && (
       <button
       type="submit"
       className={usernameExists ? 'grayed-button' : ''}
       disabled={(usernameExists|| formData.first_name.trim() === '' || formData.last_name.trim() === '' || formData.email.trim() === '' || formData.telephone.trim() === '' || formData.street_address.trim() === '' || formData.postal_code.trim() === '' || formData.city.trim() === '' || formData.user_name.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === '')}
     >
       Register
      </button>
      )}

      </div>
    </form>):(
       // Render the success message if the submission state is 'success'
       <section>
       <h1>Success!</h1>
        <h2>You have successfully registered.</h2>
        <h2>Now you can sign in.</h2>
       <h3>
       <Link to="/signin">Sign In</Link>
       </h3>
     </section>
   )}

      
        

    </section>
  );
};

export default Register;