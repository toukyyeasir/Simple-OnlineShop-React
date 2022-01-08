import Header from "./Header";

import { Link , useParams} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import userEvent from "@testing-library/user-event";

function Profile(){
  let user = JSON.parse(localStorage.getItem('user-info'));
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    
    useEffect(() => {
        getData();
      }, []);


      async function getData() {
        let result = await fetch("http://127.0.0.1:8000/api/memberProfile");
        result = await result.json();
        setData(result)
    

      }

      return (
        <div>
          <Header />
          <h1>Profile</h1>
          <div className="col-sm-8 offset-sm-2">
            
            <Table className="table table-bordered" >
              
                    
              
                {
                
                  
                
                    <tr>
                      
                       
                  
                      
                        <tr>
                            <td>ID: </td><td>{user.id}</td>
                            
                            
                         
                
                       
                     
                        </tr>
                         <tr>
                          <td>First Name: </td><td>{user.first_name}</td>
                          
                        </tr>

                      <tr>
                          <td>Last Name: </td><td>{user.last_name}</td>
                      </tr>
                     <tr>
                          <td>Email: </td><td>{user.email}</td>
                     </tr>
                     <tr>
                     <td>Address: </td><td>{user.address}</td>
                     </tr>
                      
                     <tr>
                     <td>Phone Number: </td><td>{user.phone_number}</td>
                     
                     </tr>

                     <tr>
                     <td>DOB: </td><td>{user.dob}</td>
                     
                     </tr>

                     <tr>
                     <td>Gender: </td><td>{user.gender}</td>
                     
                     </tr>
                    
                      
                      
                     
    
                      
                    </tr>
                  
                }
              
            </Table>
            {data.dob}
            <Link to={"/ProfileEdit/" + user.id}>
                            <Button variant="outline-info">Edit Profile</Button>
                          </Link>
          </div>
    
        </div>
      );



}

export default Profile;