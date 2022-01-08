import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

function ProfileEdit() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    // const [id, setid] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [phone_number, setphone_number] = useState("");
    const [dob, setdob] = useState("");
    const [gender, setgender] = useState("");
    
    // const navigate = useNavigate();


    useEffect(() => {
        getdata();
    }, []);
    /*const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem('user-info')) {
        navigate("/add");
      }
  
    }, [])*/


    async function getdata() {
        let result = await fetch("http://127.0.0.1:8000/api/showProfileEdit/" + id);
        result = await result.json();
        setData(result)
        // setid(result.id)
        setfirst_name(result.first_name)
        setlast_name(result.last_name)
        setemail(result.email)
        setaddress(result.address)
        setphone_number(result.phone_number)
        setdob(result.dob)
        setgender(result.gender)
        

    }





    async function ProfileEdit(id) {
        //let item = { p_name, p_code, p_desc, p_category, p_price, p_quantity, p_stock_date, p_rating, p_purchased, file };
        //console.log(item)

        const formData = new FormData();
        // formData.append('id', id);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('phone_number', phone_number);
        formData.append('dob', dob);
        formData.append('gender', gender);
        

        let result = await fetch("http://127.0.0.1:8000/api/ProfileUpdate/" + id + "?_method=PUT",
            {
                method: 'POST',
                body: formData
            })

        console.log(result);

    }
    return (
        <div>
            <Header />

            <div className="col-sm-8 offset-sm-2">

                <h1>Profile Update </h1>
                <Form>
                    <input type="text" defaultValue={data.id} className="form-control" placeholder=" ID" disabled /> <br />
                    <input type="text" defaultValue={data.first_name} onChange={(e) => setfirst_name(e.target.value)} className="form-control" placeholder="First Name" /> <br />
                    <input type="text" defaultValue={data.last_name} onChange={(e) => setlast_name(e.target.value)} className="form-control" placeholder="Last name" /> <br />
                    <input type="text" defaultValue={data.email} onChange={(e) => setemail(e.target.value)} className="form-control" placeholder="Email" /> <br />
                    <input type="text" defaultValue={data.address} onChange={(e) => setaddress(e.target.value)} className="form-control" placeholder="Address" /> <br />
                    <input type="number" defaultValue={data.phone_number} onChange={(e) => setphone_number(e.target.value)} className="form-control" placeholder="Phone number" min="0" /> <br />
                    
                    <input type="text" defaultValue={data.gender} onChange={(e) => setgender(e.target.value)} className="form-control" placeholder="Gender " /> <br />
                    <input type="date" defaultValue={data.dob} onChange={(e) => setdob(e.target.value)} className="form-control" placeholder="Date OF BIrth" /> <br />


                    

                   

                    
                </Form>
                <button onClick={() => ProfileEdit(data.id)} className="btn btn-secondary">Update Profile</button>

            </div>

        </div>
    );
}

export default ProfileEdit;




