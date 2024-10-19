import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, SetData] = useState([])
    const [reload,SetReload] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8080/api/users")
            .then((res) => {
                SetData(res.data)
                SetReload(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [reload])


    function deleteUser(id){
        axios.delete(`http://localhost:8080/api/delete/${id}`)
        .then((res)=>{
            console.log(res.data);
            SetReload(true)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((k) => {
                            return (
                                <tr key={k.id}>
                                    <td>{k.name}</td>
                                    <td>{k.dob}</td>
                                    <td>{k.email}</td>
                                    <td>{k.phone}</td>
                                    <td> <Link to={`/update/${k.id}`} > <button className='btn btn-info btn-sm'>update</button> </Link></td>
                                    <td><button className='btn btn-danger btn-sm' onClick={()=>{ deleteUser(k.id)}}>delete</button></td>
                                </tr>
                            )
                        })
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default Home