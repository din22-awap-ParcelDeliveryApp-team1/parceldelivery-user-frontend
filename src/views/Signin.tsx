import React, {  useState, FormEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styling/module.css';
//import { updateExpression } from '@babel/types';

interface UserData {
  userName: string;
  password: string;
  
}


const Signin: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<UserData>({
    userName: '',
    password: '',
  });

  const [error, setError] = useState(
    {userName: '',
    password: '', // Add this if you want to store form-wide errors
  }
  );

  //const [success, setSuccess] = useState<boolean>(false);
  const [submissionState, setSubmissionState] = useState('idle');
  //const [isFormValid, setIsFormValid] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     
    setLoginFormData(prevState =>({
      ...prevState,
      [name]: value,
    }));     
      };


    // Validate the field (you can expand the validation logic)
    
   

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmissionState('processing');
  
      try {
        const response = await fetch('http://localhost:3001/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginFormData),
        });
        const data = await response.json();
  
        if (response.ok) {
            const data = await response.json();
          localStorage.setItem('token', data.token);
          //setSubmissionState('success');
          // Redirect to dashboard or user profile
          window.location.replace('/dashboard');
        } else {
          throw new Error('Login credentials are incorrect.');
        }
      } catch (error: any) {
        const message = typeof error.message === 'string' ? error.message : 'Password or username incorrect';
        setError({ userName: '', password: '' });
        setSubmissionState('error');
      }
    };

  return (
    <section className="registerContainer">
    <h1>Please Login </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form">
            {/* Other form fields go here */}
            
          <label htmlFor="userName">Give yourself username and password</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="* Username"
            value={loginFormData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="* Password"
            value={loginFormData.password}
            onChange={handleChange}
            required
          />


<p>Forgot password?</p> 
  <p><a className="terms" href="/privacy">Get your password</a>.
</p>

        
          <div>
            {/* Conditional UI controls based on submission state */}
            {submissionState === 'processing' && <span>Processing...</span>}
            {submissionState === 'success' && <span>Success!</span>}
            {submissionState === 'error' && <span>Error. Please try again.</span>}
            {submissionState === 'idle' && <button type="submit">Sign in</button>}
          </div>
          </div>
        </form>
        {Object.values(error).map((error, index)=> 
        (error && <p key={index} className="error"> {error} 
      </p> ) )}
      
      
    </section>
  );
};

export default Signin;