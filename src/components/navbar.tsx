import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useParcelContext } from '../contexts/parcelContext';

interface ParcelType {
  id_parcel: number;
};
interface ParcelContextType {
  incomingParcels: ParcelType[];
};
const NavbarHeader = () => {

  const { incomingParcels } = useParcelContext() as ParcelContextType;

  const numberOfParcels = () => {
    switch (incomingParcels.length) {
      case 0:
        return ""
      case 1:
        return "You have 1 incoming parcel!"
      default:
        return `You have ${incomingParcels.length} incoming parcels!`
    };
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>App LOGO</Navbar.Brand>
        {incomingParcels.length > 0 ? (
          <div>
            <Link className="navBarLink" to="/home">{numberOfParcels()}</Link>
          </div>
        ) : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav >
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/Signin">Sign in</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default NavbarHeader;