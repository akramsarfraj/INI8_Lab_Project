import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
    let { id } = useParams();
    const [response, SetResponse] = useState([])

    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [dob, SetDob] = useState("")
    const [phone, SetPhone] = useState("")

    const [status, SetStatus] = useState("")


    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${id}`)
            .then((res) => {

                SetName(res.data.name)
                SetEmail(res.data.email)
                SetDob(res.data.dob)
                SetPhone(res.data.phone)
            })
            .catch((err) => {
                console.log(err.response.data.Message);
            })


    }, [])


    function handleSubmit() {

        const payload = {
            "name": name,
            "email": email,
            "phone": phone,
            "dob": dob
        }
        if (name === "" && email === "" && phone === "", dob === "") {

        } else {
            axios.put(`http://localhost:8080/api/update/${id}`, payload)
                .then((res) => {
                    SetStatus(res.status)
                    setTimeout(()=>{
                        navigate("/")
                    },1000)
                })
                .catch((err) => {
                    SetResponse(err.response.data.Message);
                    SetStatus(err.response.status)
                })
        }

    }


    return (
        <div className='update' style={{ width: "500px", marginLeft: "500px" }}>


            {
                status === 404 ?
                    <div className="alert alert-warning">
                        <strong>Warning!</strong> {response}
                    </div>
                    :
                    status === 202 ?
                        <div className="alert alert-success">
                            <strong>Success!</strong> Update SuccessFull
                        </div>
                        :
                        <>
                        </>
            }


            <div className="form-group">
                <label >Name:</label>
                <input type="text" className="form-control" placeholder="Enter Name" required
                    value={name} onChange={(e) => { SetName(e.target.value) }} />
            </div>
            <div className="form-group">
                <label >Email address:</label>
                <input type="email" className="form-control" placeholder="Enter email" required
                    value={email} onChange={(e) => { SetEmail(e.target.value) }}  disabled/>
            </div>
            <div className="form-group">
                <label >Date Of Birth:</label>
                <input type="date" className="form-control" placeholder="Enter Date of Birth" required
                    value={dob} onChange={(e) => { SetDob(e.target.value); }} />
            </div>

            <div className="form-group">
                <label >Phone:</label>
                <input type="text" minLength={10} maxLength={10} className="form-control" placeholder="Enter Phone"
                    required value={phone} onChange={(e) => { SetPhone(e.target.value) }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Update