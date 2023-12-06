import React, {useEffect, useState, MouseEvent} from "react";
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../styling/module.css';
//import ListGroup from 'react-bootstrap/ListGroup';
//import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';


type UserInfoProps = {
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  street_address?: string;
  postal_code?: string;
  city?: string;
  user_name?: string;
  password?: string;  
  }; 
  //const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const MyAccount: React.FC = () => {
    //get token and userId from AuthContext
    const { token, userId } = useAuthContext() as any;
    const [userInfo, setUserInfo] = useState<UserInfoProps>({});

    //const [success, setSuccess]= useState<boolean>(false);

    useEffect(() => {
      const fetchUserInfo = async () => {
        const response = await fetch(`http://localhost:3001/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if(data && data.length > 0) {
          setUserInfo(data[0]);
        }
        //setUserInfo(data);
        console.log("userinfopropd data :" + JSON.stringify(data));
        console.log("useEffect :" + setUserInfo);
      };
      fetchUserInfo();
    }
    , [token, userId]);
    console.log("MyAccount :" + userInfo);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo({...userInfo, [name]: value });
      console.log("DBG: handleinputchange :" + name + ":" + value);
    }

   
const handleChangeSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=> {
  e.preventDefault();
  console.log("DBG: handleSubmit :" + userInfo);
  //const data = { first_name, last_name, email, telephone, street_address, postal_code, city };
  try {
  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userInfo)
  });
  const data = await response.json();
  console.log("DBG: handleSubmit :" + data);
  setUserInfo(data);
  console.log("DBG: handleSubmit :" + setUserInfo);
}catch (error) {
  console.error('Error:', error);
  console.log(error);
}
};

const handleDeleteSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=> {
  e.preventDefault();
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if(confirmDelete) {
  try {
  const response = await fetch(`http://localhost:3001/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userInfo)
  });
  if(response.ok) {
    alert("Account deleted");
    setUserInfo({});
  }else {
    const errorData = await response.json();
    alert("Error deleting account: " + errorData.message);
  }
}catch (error) {
  console.log(error);
}
}
}

  
    return (
      
      <Container className="account-container">
      <Row>
        <Col xs={12} md={3} className="sidebar">
          <Sidebar />
        </Col>
        <Col xs={12} md={9} className="user-info">

        <h1>My Account</h1>
        <h2>Welcome {userInfo.user_name || "Loading..."}</h2>
        <div className="user-info">
        {/* <div>
          <label htmlFor="user_name">User Name : </label>
          <input type="text" 
          name="user_name" 
          value={userInfo.user_name} 
          onChange={handleInputChange} />           
        </div> */}
        <div>
        <label htmlFor="first_name">First Name : </label>
        <input type="text" 
        name="first_name" 
        value={userInfo.first_name} 
        onChange={handleInputChange} />
        </div>
        <div>
        <label htmlFor="last_name">Last Name : </label>
        <input type="text" 
        name="last_name" 
        value={userInfo.last_name} 
        onChange={handleInputChange} />
        </div>
        <div>
        <label htmlFor="email">Email : </label>
        <input type="email" 
        name="email" 
        value={userInfo.email} 
        onChange={handleInputChange} />
        </div>
        <div>
        <label htmlFor="telephone">Telephone : </label>
        <input type="text" 
        name="telephone" 
        value={userInfo.telephone} onChange={handleInputChange} />
        </div>
        <div>
        <label htmlFor="street_address">Street Address : </label>
        <input type="text" 
        name="street_address" 
        value={userInfo.street_address} 
        onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="postal_code">Postal Code : </label>
          <input type="text" 
          name="postal_code" 
          value={userInfo.postal_code} 
          onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="city">City : </label>
          <input type="text" 
          name="city" 
          value={userInfo.city} 
          onChange={handleInputChange} />           
        </div>

        </div>
        <button className="edit-button" onClick={handleChangeSubmit}>Save Changes</button>
        <button className="delete-button" onClick={handleDeleteSubmit}>
          Delete account
        </button>
      
      </Col>
    </Row>
    
      </Container>

    );
  };
  export default MyAccount;