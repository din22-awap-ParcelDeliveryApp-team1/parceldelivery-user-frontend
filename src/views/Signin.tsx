import React, {  useState, FormEvent } from 'react';
import '../styling/module.css';
import useAuth from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

interface LoginUserData {
	user_name: string;
	password: string;
};

interface LoginResponse {
	token: string;
	message: string;
	success: boolean;
	userId: number;
	user_name: string;
};

// add AuthContextType as interface to useAuthContext function
interface AuthContextType {
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setUserId: React.Dispatch<React.SetStateAction<number>>;
};


const Signin: React.FC = () => {
	// take into use those states AuthContext that you want to use in this components 
	const { setToken, setUserId } = useAuthContext() as AuthContextType;

	//after user login, redirect to myaccount page
	const navigate = useNavigate();
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
		
		setFormData({ ...formData, [name]: value });

		if (formData.user_name.trim() === '' || formData.password.trim() === '') {
			setError(prevState => ({ ...prevState, form: "All fileds need to be filled" }));
		} else { setError(prevState => ({ ...prevState, form: '' })); }
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.user_name.trim() === '' || formData.password.trim() === '') {
			setError(prevState => ({ ...prevState, form: "All fileds need to be filled" }));
		} else { setError(prevState => ({ ...prevState, form: '' })); }
		setSubmissionState('Signing in...');

		try {
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
			const data: LoginResponse = await response.json();

			if (data.success) {
				setSubmissionState('success');

				// set token and userId in the AuthContext
				// token and userId can now be accessed from any component that uses the AuthContext
				setToken(data.token);
				setUserId(data.userId);
				// store in local storage
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId.toString());
				
				navigate('/home');
			} else {
				throw new Error('User name or password is not correct');
			}

		} catch (error) {
			const message = typeof (error as any).message === 'string' ? (error as any).message : 'An unknown error occurred';  
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
						<a className="terms" href="/terms">Forget password?</a>
					</p>
					{submissionState === 'success' && <span>Success!</span>}
					{submissionState === 'error' && <span>Error. Please try again.</span>}
					{error.form && <p className="error">{error.form}</p>}
					{submissionState === 'idle' && <button type="submit" disabled={(formData.user_name.trim() === '' || formData.password.trim() === '')} > Sign in</button>}
				</div>
			</form>
		</section>
	);

};

export default Signin;