import { useState } from "react";
import { Button, Form, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful")
        {
          localStorage.setItem('token', data.token);
          navigate("/");
        }
        else { alert("Erreur d'authentification!!!"); }
      }
      )
      .catch((error) => alert("Erreur d'authentification!!!"));
   
  };
  return (
    <div>
      <Navbar />
      <Card id="cardUser" style={{marginTop:100}}>
        <Card.Header>
          Connexion
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="submit" variant="primary">Valider</Button>
            <Button type="reset" variant="danger" >Annuler</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>

  )
}