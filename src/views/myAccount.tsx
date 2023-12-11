import React, {useEffect, useState} from "react";
import Sidebar from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../styling/module.css';
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

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


  const MyAccount: React.FC = () => {
    //get token and userId from AuthContext
    const { token, userid } = useAuthContext() as any; //change from userId to userid
    const [userInfo, setUserInfo] = useState<UserInfoProps>({});
    const navigate = useNavigate();
   

    useEffect(() => {
      const fetchUserInfo = async () => {
        //change from userId to userid
        const response = await fetch(`http://localhost:3001/user/${userid}`, {
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
      };
      fetchUserInfo();
    }, [token, userid]); //change from userId to userid
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo({...userInfo, [name]: value });
    }

   
const handleChangeSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=> {
  e.preventDefault();
  console.log("DBG: handleSubmit :" + userInfo);
  try {
  const response = await fetch(`http://localhost:3001/user/${userid}`, {
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
  try {
    //change from userId to userid
  const response = await fetch(`http://localhost:3001/user/${userid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userInfo)
  });
  if(response.ok) {
    alert("Account deleted");
    navigate('/');
    setUserInfo({});
  }else {
    const errorData = await response.json();
    alert("Error deleting account: " + errorData.message);
  }
}catch (error) {
  console.log(error);
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

        <button className="delete-button" onClick={handleDeleteSubmit}>
          Delete account
        </button>
      
      </Col>
    </Row>
 
      </Container>

    );
  };
  export default MyAccount;