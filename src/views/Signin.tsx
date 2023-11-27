import React, {  useState, FormEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styling/module.css';
//import { request } from 'http';
//import { create } from 'domain';
//import { updateExpression } from '@babel/types';

interface LoginUserData {
  user_name: string;
  password: string;
}


const Signin: React.FC = () => {

  const [formData, setFormData] = useState<LoginUserData>({
    user_name: '',
    password: '',
  });


const [error, setError] = useState(
    {
    user_name: '',
    password: '',
    form: '', // Add this if you want to store form-wide errors
  }
  );  


  const [submissionState, setSubmissionState] = useState('idle');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("DBG: Update name:" + name + ":" + value);
    setFormData({...formData, [name]: value });
        //console.log("DBG: " + prevState);
        //console.log("DBG: " + name + ":" + value);
        
        if(formData.user_name.trim() === '' || formData.password.trim() === '')
        {
          setError(prevState => ({...prevState, form: "All fileds need to be filled" }));
        }else {setError(prevState => ({...prevState, form: ''}));}

      };
   
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    
    if(formData.user_name.trim() === '' || formData.password.trim() === '')
    {
      setError(prevState => ({...prevState, form: "All fileds need to be filled" }));
    }else {setError(prevState => ({...prevState, form: ''}));}
    setSubmissionState('Signing in...');
      // Send data to the server (you can use fetch or Axios)
    try {
      //to apply if statement to check if all fields are filled
      const response = await fetch('http://localhost:3001/user/signin', {
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
        setSubmissionState('Login success');
      }
/*       else{
        throw new Error('User name or password is not correct');
      } */
    } catch (error) {
      const message = typeof (error as any).message === 'string' ? (error as any).message : 'An unknown error occurred';
      //console.error(error);    
      setError(message);
      setSubmissionState('error');
    }
  };



  return (
    <section className="registerContainer">
    <h1>Sign in </h1>
    <h5>* Mandory field </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form">
            
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

          <p>     
          <a className="terms" href="/terms">Forget password?</a>, 
          </p>
            {submissionState === 'success' && <span>Success!</span>}
            {submissionState === 'error' && <span>Error. Please try again.</span>}
            {error.form && <p className="error">{error.form}</p>}
           {/*  here has prolem, even fill all fileds, still can not submit */}
           {/* {submissionState === 'idle' && <button type="submit" disabled={Object.values(error).some(msg => msg)} > Register</button>}  */}
          {submissionState === 'idle' && <button type="submit" disabled={(formData.user_name.trim() === '' || formData.password.trim() === '')} > Register</button>} 

         {/*   {submissionState === 'idle' && <button type="submit" >Register</button>}   */}

          </div>
        </form>

      
      
    </section>
  );
};

export default Signin;