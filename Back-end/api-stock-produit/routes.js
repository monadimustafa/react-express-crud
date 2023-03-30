const { json, request, response } = require('express')
const express = require('express')
const app = express()
const port = 5000
//const db = require("./connexion")
const cors = require('cors')
const { Client } = require('pg')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(cors())

let sql_allProduct = 'select * from products';
let sql_productId = 'select * from products where id = $1';
let sql_addProduct = 'insert into products(name,description,price,stock) values($1,$2,$3,$4)';
let sql_deleteProduct = 'delete from products where id = $1';
let sql_updateProduct = 'update products set name=$1,description=$2,price=$3,stock=$4 where id=$5';
let sql_productlike = 'select * from products where name =$1'
let client = new Client(
    {
        user : 'postgres',
        host : 'localhost',
        database : "stockproduit",
        port : 5432,
        password : 'admin'
    })
        client.connect()

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
