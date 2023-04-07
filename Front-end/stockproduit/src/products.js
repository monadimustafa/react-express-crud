import { useState, useEffect } from "react";
import {Table,Button,Form, Card} from 'react-bootstrap'
import Navbar from "./Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [id,setId] = useState(0)
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState(0)
  const [stock,setStock] = useState(false)
  const [keyword,setKeyword] = useState("")
  const [stockCheck,setStockCheck] = useState(false)

     function getProducts(){
    fetch("http://localhost:5000/products",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>console.error(error));
  }
  function handleSubmit(event) {
    if(document.getElementById("ajouter").innerText==="Ajouter")
    {
    event.preventDefault();
    // Envoi des données à l'API avec la méthode POST
    fetch("http://localhost:5000/products", {
      method: "POST",
      body: JSON.stringify({name,description,price,stock}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  else
  {
    handleUpdate(id)
  }
      getProducts()
  }
  function handleUpdate(id){
    fetch("http://localhost:5000/products/"+id, {
      method: "PUT",
      body: JSON.stringify({name,description,price,stock}),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function handleDelete(id){
        fetch("http://localhost:5000/products/"+id, {
      method: "DELETE",
      //body: {id},
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
        getProducts()
  }
  useEffect(() => {
    getProducts()
  }, []);

  let tabProd = []
   products.forEach((product) => {
    if(!(product.name.includes(keyword) || product.description.includes(keyword)))
    {
       return
    }
    if(stockCheck && !product.stock)
    {
      return
    }
    
    tabProd.push(product)
  })

  return (
    
    <div>
      <Navbar />
      <Card>
        <Card.Header>
          <label for="search">Search : </label>
        <input type="text" value={keyword} onChange={(event)=>setKeyword(event.target.value)}/>
        <label for="Stock">Produits en Stock</label>
        <input type="checkbox" value={stockCheck}  onChange={(event)=>setStockCheck(event.target.checked)}/>
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
            <th>id</th> <th>name</th> <th>description</th> <th>price</th><th>stock</th><th>Actions</th>
        </tr>
        </thead>
        
        <tbody>
          {tabProd.map((product) =>
        <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
         <td>{product.price}</td>
         <td>
            {product.stock?"en stock":"pas en stock"}
        </td>
        <td>
            <Button onClick={()=>{
              document.getElementById("ajouter").innerText="Modifier"
              setId(product.id)
              setName(product.name)
              setDescription(product.description)
              setPrice(product.price)
              setStock(product.stock.checked)
              }}>Update</Button>
            <Button variant="danger" onClick={()=>handleDelete(product.id)}>Delete</Button>
        </td>
    </tr>
    )}
    </tbody>
      
    </Table>
        </Card.Body>
      </Card>
   <Card style={{marginTop:10}} id="cardUser">
    <Card.Header>
     Ajout Product
    </Card.Header>
    <Card.Body>
    <Form onSubmit={handleSubmit}>
    <label>Name</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/><br/>
    <label>Description</label>
    <input type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/><br/>
    <label>Price</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="number" value={price} onChange={(event)=>setPrice(event.target.value)}/><br/>
    <label>Stock</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="checkbox" value={stock}  onChange={(event)=>setStock(event.target.checked)}/><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button type="submit" id="ajouter" variant="primary">Ajouter</Button>
    <Button type="reset" variant="danger" >Annuler</Button>
    </Form>
    </Card.Body>
   </Card>
   </div>
  );
  
}

