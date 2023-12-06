import React, {  useState, FormEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styling/module.css';
//import { request } from 'http';
//import { create } from 'domain';
//import { updateExpression } from '@babel/types';
//1202 new code, for nevigate to home page after login
import { useNavigate } from 'react-router-dom';
//1202 import useAuth from '../contexts/authContext';
import { useAuthContext } from '../contexts/authContext';

interface LoginUserData {
  user_name: string;
  password: string;
}
//1129 new code to fit login auth
interface LoginResponse {
	token: string;
	message: string;
	success: boolean;
	userId: number;
	user_name: string;
}
// add AuthContextType as interface to useAuthContext function
interface AuthContextType {
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
};
const Signin: React.FC = () => {
  //1202 new code after user login, redirect to myaccount page
  const navigate = useNavigate();
  //1202 new code, for userAuth
  // here you take into use those states AuthContext that you want to use in this components 
	const { setToken, setUserId } = useAuthContext() as AuthContextType;

  const [formData, setFormData] = useState<LoginUserData>({
    user_name: '',
    password: '',
  }); 


const [error, setError] = useState(
    {
    user_name: '',
    password: '',
    form: '', 
  }
  );  

  const [submissionState, setSubmissionState] = useState('idle');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("DBG: Update name:" + name + ":" + value);
    setFormData({...formData, [name]: value });
  
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
      //1129 new code to fit login auth
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error('Network response was not ok');
      }
      console.log("D");
      const data: LoginResponse = await response.json();
      //read token in the data
      //console.log("DBG login res" + data);
      if (data.success) {
        setSubmissionState('success');
        //1202 new code, for userAuth get jwt
        setToken(data.token); // Set JWT in context
        console.log("D"+data.userId);
        setUserId(data.userId); // Set user ID in context
        //navigate to home; 12-02
        navigate('/home');
        //change to my account to check 
        //navigate('/myaccount')
      } else {
        throw new Error('User name or password is not correct');
      }
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
    <h5>* Mandatory field </h5>
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
            {submissionState === 'error' && <span color='red'>Useranme or password inforrect. Please try again.</span>}
            {error.form && <p className="error">{error.form}</p>}
            {submissionState === 'idle' && <button type="submit" disabled={(formData.user_name.trim() === '' || formData.password.trim() === '')} > Sign in</button>} 

          </div>
        </form>

      
      
    </section>
  );
};

export default Signin;