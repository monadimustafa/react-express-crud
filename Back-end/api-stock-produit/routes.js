const { json, request, response } = require('express')
const express = require('express')
const app = express()
const port = 5000
const db = require("./Connexion")
const cors = require('cors')
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const auth = require('./Login')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
bodyParser.urlencoded()
bodyParser.json()
const { Client } = require('pg')

let client = db.connected()
client.connect()

let sql_allProduct = 'select * from products';
let sql_productId = 'select * from products where id = $1';
let sql_addProduct = 'insert into products(name,description,price,stock) values($1,$2,$3,$4)';
let sql_deleteProduct = 'delete from products where id = $1';
let sql_updateProduct = 'update products set name=$1,description=$2,price=$3,stock=$4 where id=$5';
let sql_emailUser = 'select email from users'
let sql_addUser = 'insert into users(firstname,lastname,email,password) values($1,$2,$3,$4)'
let sql_users = 'select email from users'
let sql_usersPsw = 'select password from users where email = $1'

app.post('/login', (req, res) => {
  client.query(sql_users, (error, data) => {
    if (error) {
      console.log(error)
      return
     }
    let emailUser = data.rows.find(u => u.email === req.body.email)
    if (!emailUser)
     {
      res.json({message:"email not found"})
     }
    client.query(sql_usersPsw, [req.body.email], (error, data) => {
      if (error)
     {
        res.json(error)
        return
     }
      let psw = ""
      data.rows.map(elem=>psw=elem.password)
      console.log(psw)
      bcrypt.compare(req.body.password, psw,(error, isMatch) => {
        if (error)
     {
          console.error("Error comparing passwords: ", error);
          res.status(500).json({ message: "Internal server error" });
          return;
     }
      console.log(isMatch)
     if (!isMatch) {
      res.status(401).json({ message: 'Invalid Password' });
      return;
    }
      let secret = "tokenAccess"
      const token = jwt.sign(req.body.email, secret);
      return res.status(200).json({message: "Login successful", token });
        
      })
    });
    }
    )
  });
  // Register
app.post('/register', (req, res) => {
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let email = req.body.email
  let password = req.body.password
  client.query(sql_emailUser, (error, data) => {
    if (error) {
      console.log(error)
    }
    const userFinded = data.rows.find(u => u.email === email)
    console.log(data.rows)
    if (userFinded) {
      res.json({"message":"email existed"})
    }
    else {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          console.error("Error hashing password: ", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        let callBack = (error, data) => {
          if (error) {
            console.log(error)
            res.json(error)
            return
          }
          res.json({message:"User Added successfully"})
        }
        client.query(sql_addUser, [firstname,lastname,email,hash], callBack);
      });  
    }
    })
  });
//getAll Products
app.get('/products', (req, res) => {
    
    client.query(sql_allProduct,(error,data) => {
        if(error)
        {
          console.log(error)
          return
        }
        res.json(data.rows)
      });
  })
  // Middleware : 
  
  const authenticate = (req, res, next) => {

    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = headerToken.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, secret);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  //getProduct ById
app.get('/products/:id', (req, res) => {
    let id = [req.params.id]
    client.query(sql_productId,id,(error,data) => {
        if(error)
        {
          console.log(error)
          return
        }
        res.json(data.rows)
      });
  })

  // add product
app.post('/products',(req,res)=>{
    let productData = [req.body.name,req.body.description,req.body.price,req.body.stock]
    let callBack = (error,data) => {
      if(error)
      {
        console.log(error)
        res.json(error)
        return
      }
      res.json("added")
    }
    client.query(sql_addProduct,productData,callBack);
  })

//delete user by id
app.delete('/products/:id', (req, res) => {
    let id = [req.params.id]
      client.query(sql_deleteProduct,id,(error,data) => {
        if(error)
        {
          console.log(error)
          res.json(error)
          return
        }
        res.json("added")
      });
    }
    )
//put product
app.put('/products/:id',(req,res)=>{
  let id = req.params.id
  let name=req.body.name
  let description= req.body.description
  let price = req.body.price
  let stock = req.body.stock
  client.query(sql_updateProduct,[name,description,price,stock,id],(error,data) => {
    if(error)
    {
      console.log(error)
      res.json(error)
      return
    }
    console.log("updated")
    res.json(data.rows)
  }
  );
}
)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
