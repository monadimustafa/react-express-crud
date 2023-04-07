import { useState } from "react";
import {Table,Button,Form, Card} from 'react-bootstrap'
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";
export default function(){
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")  
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    function handRegister(event){
        event.preventDefault();
    fetch("http://localhost:5000/register", {
    method: "POST",
    //credentials:"same-origin",
    body: JSON.stringify({firstname,lastname,email,password}),
    credentials:"include",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then((data) => {
    if(data.message==="User Added successfully"){
      alert("User Added successfully")
      navigate("/login");
      console.log(data.message);
    }else{
        alert("Email already registered")
    }
  }) 
.catch(error =>alert(error))
}
    return(
      
        <div>
            <Navbar/>
            <Card id="cardUser" style={{marginTop:100}}>
    <Card.Header>
     Register
    </Card.Header>
    <Card.Body>
    <Form onSubmit={handRegister}>
    <label className="label">Lastname</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input className="input" type="text" value={lastname} onChange={(event)=>setLastname(event.target.value)}/><br/>
    <label>Firstname</label>
    <input type="text" value={firstname} onChange={(event)=>setFirstname(event.target.value)}/><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)}/><br/>
    <label>Password</label>
    <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)}/><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button type="submit" id="ajouter" variant="primary">Valider</Button>
    <Button type="reset" variant="danger">Annuler</Button>
    </Form>
    </Card.Body>
   </Card>
        </div>
       
    )
}