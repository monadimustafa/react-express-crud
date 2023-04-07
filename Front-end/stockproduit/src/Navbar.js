import { Link } from "react-router-dom";
import { Navbar,Nav,Container } from "react-bootstrap"
 export default function() {
 return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">App-Gestion-Produit</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link><Link className="text-decoration-none text-white" to="/">Accueil</Link></Nav.Link>
          <Nav.Link><Link className="text-decoration-none text-white" to="/login">Connexion</Link></Nav.Link>
          <Nav.Link><Link className="text-decoration-none text-white" to="/register">Inscription</Link></Nav.Link>     
          </Nav>
        </Container>
      </Navbar>
 );
 }