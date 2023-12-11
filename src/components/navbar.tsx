import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import IncomingNotification from './incomingNotification';
import logo from '../images/logo.png'
import { useAuthContext } from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

const NavbarHeader = () => {
	const { token, setToken } = useAuthContext() as any;

	const navigate = useNavigate();

	const handleSignOut = () => {
		setToken("");
		localStorage.removeItem("token");
		localStorage.removeItem("userid"); 
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand as={Link} to={token ? "/home" : "/"} ><img className="navLogo" src={logo} alt="Logo" /></Navbar.Brand>
				<IncomingNotification />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className='navLinks' >
						<div>
							{token ? (
								<Link className="navHomeLink" to="/home">Home</Link>
							) : null}
						</div>
						<div>
							{token ? (
								<Nav.Link className="navbarTags" onClick={handleSignOut}>Sign out</Nav.Link>
							) : (
								<Nav.Link className="navbarTags" href="/Signin">Sign in</Nav.Link>
							)}
						</div>
						<div>
							{token ? null : (
								<Nav.Link className="navbarTags" href="/Register">Register</Nav.Link>
							)}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
}

export default NavbarHeader;