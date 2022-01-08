import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Protected from './components/Protected';

import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';
import ProductsDetails from './components/ProductsDetails';
import UpdateOneProduct from './components/UpdateOneProduct';
import SearchProduct from './components/SearchProduct';
import Checkout from './components/Checkout';
import Cart from './components/Cart';





//import {Button} from 'react-bootstrap';

import './App.css';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
//import Testing from './components/Testing';



function App() {
  return (
    <>
      <div className="App">


        <BrowserRouter>


          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Cart" element={<Cart />} />



            <Route path="/add" element={<Protected cmp={AddProduct} />} />
            <Route path="/update" element={<Protected cmp={UpdateProduct} />} />


            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="detail" element={<Protected cmp={ProductsDetails} />}>
              <Route path=":id" element={<Protected cmp={ProductsDetails} />} />
            </Route>


            <Route path="edit" element={<Protected cmp={UpdateOneProduct} />}>
              <Route path=":id" element={<Protected cmp={UpdateOneProduct} />} />
            </Route>
            <Route path="ProfileEdit" element={<Protected cmp={ProfileEdit} />}>
              <Route path=":id" element={<Protected cmp={ProfileEdit} />} />
            </Route>


            <Route path="*" element={<PageNotFound />} />


          </Routes>



        </BrowserRouter>


      </div>
    </>
  );
}

export default App;
