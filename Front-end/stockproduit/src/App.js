import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./Products"
import Login from "./Login";
import Register from "./Register";

 const router = createBrowserRouter([
 {
     path: "/",
     element: <Products />,
 },
 {
     path: "/login",
     element: <Login />,
 },
 {
     path: "/register",
     element: <Register />,
 }
 ]);


function App() {
  return (
    
    <div className="App">
    <RouterProvider router={router} />
    </div> 
   
  );
}

export default App;
