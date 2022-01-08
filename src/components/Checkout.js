import React,{useEffect, useState} from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';


import axios from 'axios';
import Swal from 'sweetalert';

// import{Link, useHistory} from 'react-router-dom';

function Checkout()
{
  const history = useNavigate();
    

    var totalCartPrice = 0;
    
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
                else 
                {
                  
                    // navigate('/');
                    // swal("warning", res.data.message,"error");
                }
            }
        }
        )
    }
    )
    
    // const navigate = useNavigate();
    // useEffect(() => {
    //   if (localStorage.getItem('user-info')) {
    //     navigate("/add");
    //   }
  
    // }, [])


    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState("");


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [user_id, setUser_id] = useState("");


    


    

    async function placeorder() {
        
        
        // const formData = new FormData();
        // formData.append('firstname',firstname);
        // formData.append('lastname',lastname);
        // formData.append('phone',phone);
        // formData.append('email',email);
        // formData.append('address',address);
        // formData.append('zipcode',zipcode);
        // formData.append('user_id',user_id);

        let item = { firstname,email, phone,address,zipcode,user_id };
       
    
        let result = await fetch("http://127.0.0.1:8000/api/place-order",
          {
            method: 'POST',
            body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
          })
    
        console.log(result);
     
        result = await result.json();

        if (result.status === 200) {
          localStorage.setItem("user-info", JSON.stringify(result.check));
          history("/")
        }
        else if(result.status === 404)
        {
          history("/")
          setMessage(result.error)
        }
    
    
    
    
      }


    

    return (
        <div>
      <Header />

      <div className="col-sm-6 offset-sm-3">
        <h1>PLACE ORDER</h1>
        <Form>
        <label>First Name</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control"  /> <br />
        <label>Last Name</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control"  /> <br />
        <label>Phone Number</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" /> <br />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" /> <br />
        <label> Full Address </label>
        <input type="textarea" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control"   min="0" /> <br />
        <label>Zip Code </label>
        <input type="number" value={zipcode} onChange={(e) => setZipcode(e.target.value)} className="form-control"  min="0" /> <br />
        
        <label>User ID </label>
        <input type="number" value={user_id} onChange={(e) => setUser_id(e.target.value)} className="form-control" min="0" /> <br />
        

        
          

          </Form>

          <button onClick={placeorder} className="btn btn-secondary">Place Order</button>
        

        
        
      </div>
      <div className="d-flex justify-content-around">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    
                                    {
                                   cart.map((item) =>{
                                       totalCartPrice += item.product.p_price * item.product_qty;
                                       return(
                                           
                                    <tbody>
                                       <tr>
                                        <td>{item.product.p_name}</td>
                                        <td> {item.product.p_price}</td>
                                        <td> {item.product_qty}</td>
                                        <td> {item.product.p_price*item.product_qty}</td>


                                    </tr>
                                    
                                    </tbody>
                                    
                                    
                                       )
                                   }
                                   )
                                }
                                        
                                        <tr>
                                        <td colspan="2" className="text-end"> Grand Total</td>
                                        <td colspan="2" className="text-end">{totalCartPrice}</td>
                                    </tr>
                                       
                                    
                                </table>

                            </div>
                            {/* <button onClick={placeorder} className="btn btn-secondary">Place Order</button> */}
    </div>
        
        
        
    )
}

export default Checkout;