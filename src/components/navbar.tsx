import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import IncomingNotification from './incomingNotification';
import logo from '../images/logo.png'
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const NavbarHeader = () => {
	const { token, setToken } = useAuthContext() as any;

	const navigate = useNavigate();

	const handleSignOut = () => {
		setToken("");
		navigate("/");
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand><img src={logo} width="150" height="60" alt="Logo" /></Navbar.Brand>
				<IncomingNotification />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav >
						{token ? (
							<Nav.Link className="navbarTags" href="/home">Home</Nav.Link>
						) : null}
						{token ? (
							<Nav.Link className="navbarTags" onClick={handleSignOut}>Sign out</Nav.Link>
						) : (
							<Nav.Link className="navbarTags" href="/Signin">Sign in</Nav.Link>
						)}
						<Nav.Link className="navbarTags" href="/Register">Register</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
}

export default NavbarHeader;