import Header from "./Header";


import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import {Table, Button} from "react-bootstrap";


function Cart()
{
    // const navigate = useNavigate();
    // useEffect(() => {
    //   if (localStorage.getItem('user-info')) {
    //     navigate("/add");
    //   }
  
    // }, [])

    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    // const history = useHistory();
   

    

    // useEffect(() => {
    //     getdata();
    //   }, []);



    // async function getdata() {
    //     let result = await fetch("http://127.0.0.1:8000/api/showCart");
    //     result = await result.json();
    //     setData(result)
    // }
    useEffect(() => {
        let isMounted = true;
        axios.get("http://127.0.0.1:8000/api/showCart").then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    // setloading(false);
                }
                else if(res.data.status === 401)
                {
                  
                    // navigate('/');
                    // swal("warning", res.data.message,"error");
                }
            }
        }
        )
    }
    )


    const handleDecrement = (cart_id) =>{
        setCart(cart => 
            cart.map((item)=>
            cart_id === item.id ? {...item,product_qty: item.product_qty - 1} : item
            )
            
        );
        updateCartQty(cart_id,"dec");
    }

    const handleIncrement = (cart_id) =>{
        setCart(cart => 
            cart.map((item)=>
            cart_id === item.id ? {...item,product_qty: item.product_qty + 1} : item
            )
        );
        updateCartQty(cart_id,"inc");

    }
    function updateCartQty(cart_id,scope){
        axios.put('http://127.0.0.1:8000/api/showCart-updatequantity/${cart_id}/${scope}').then(res=>{
            if (res.data.status === 200) {
                swal("Success", res.data.message,"success");
                
            }

        }
        );
    }

    var cart_HTML = '';
    if (cart.length>0)
    {
        cart_HTML = 
        <div className="table-responsive">
                               <table className="table table-bordered">
                               <thead>
                                   <tr>
                                   <th className="text-center"> Name</th>
                                     

                                       <th className="text-center"> Price</th>
                                       <th className="text-center"> Quantity</th>
                                       <th className="text-center"> Total Price</th>
                                       <th> Remove</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {
                                   cart.map((item) =>{
                                       return(
                                   
                                   <tr>
                                      
                                       <td>{item.product.p_name}</td>
                                       <td width ="15%" className="text-center">{item.product.p_price}</td>
                                       <td width ="15%">
                                           <div className="input-group">
                                               <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                                               <div className="form-control text-center">{item.product_qty}</div>
                                               <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>

                                               

                                           </div>
                                       </td>
                                       <td width ="15%" className="text-center">{item.product.p_price*item.product_qty}</td>
                                       
                                       <td width ="15%" >
                                           <button type="button" className="btn btn-danger btn-sm">remove</button>

                                        </td>


                                       

                                   </tr>
                                   )
                                   }
                                   )}
                               </tbody>
                               </table>

                           </div>
        
        
    }
    else
    {
        <div className="card card-body py-5 text-cneter shadow-sm">
             <h4>Your Shopping cart is empty</h4>
        </div>
    }



    return(
       <div>
      <Header />

           <div className="py-3 bg-warning">
               <div className="container">
                   <h1>CART</h1>
               </div>

           </div>
           <div className="py-4">
               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           
                            {cart_HTML}

                       </div>
                   </div>
               </div>
               <Link className="btn btn-dark" to="/Checkout">Checkout</Link>

           </div>
       </div>
    )
    

}

export default Cart;