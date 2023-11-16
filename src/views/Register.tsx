import React, {  useState, FormEvent, ChangeEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styling/module.css';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//const POSTALCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

const Register: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [validFields, setValidFields] = useState({
    email: false,
    phone: false,
    userName: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field (you can expand the validation logic)
    if (name === 'email') {
      setValidFields({
        ...validFields,
        [name]: EMAIL_REGEX.test(value),
      });
    } else {
      setValidFields({
        ...validFields,
        [name]: value.trim() !== '',
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are valid
    const isFormValid = Object.values(validFields).every((field) => field);

    if (!isFormValid) {
      setError('Invalid data, please follow the instructions');
      return;
    }

    // Send data to the server (you can use fetch or Axios)
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.accessToken) {
        setSuccess(true);
      } else {
        setError('Registration credentials are incorrect.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <section className="registerContainer">
      {success ? (
        <>
          <h1>Success!</h1>
          <p>You have successfully registered as {formData.userName}!</p>
          <p>Login in</p>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form">
            {/* Other form fields go here */}
            
            <label htmlFor="firstName" className='name'>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="* Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="lastName" className='name'>First Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="* Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label htmlFor="streeAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="* Enter your street address"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />

            <label htmlFor="postalcode">Postal code</label>
            <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="* Enter your postal code"
            value={formData.postalCode}
            onChange={handleChange}
            required
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="* Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {/* Repeat this pattern for other input fields */}
            
            <button type="submit">Register</button>
          </div>
        </form>
      )}
      {error && (
        <p className="error" aria-live="assertive">
          {error}
        </p>
      )}
    </section>
  );
};

export default Register;