import axios from 'axios'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

function Registration() {
    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [dob, SetDob] = useState("")
    const [phone, SetPhone] = useState("")
    const [response, SetResponse] = useState("")
    const [status, SetStatus] = useState("")

    const [mailValid, SetMailValid] = useState(true)


    function handleSubmit() {


        

        if (name === "" || email === "" || phone === "" || dob === "") {
            alert("All field is Mandatory")

        }else if(email.search("@") < 0 ){
            SetMailValid(false)
        }else{

            axios.post("http://localhost:8080/api/register", {
                "name": name,
                "email": email.concat(".com"),
                "phone": phone,
                "dob": dob
            })

            .then((res) => {
                    SetResponse(res.data)
                    SetStatus(res.status)
            })
            .catch((err) => {

                    SetResponse(err.response.data.Message);
                    SetStatus(err.response.status)
            })
        }

    }

    return (
        <div className='registration' style={{ width: "500px", marginLeft: "500px" }}>

            {
                status === 404 ?
                    <div className="alert alert-warning">
                        <strong>Warning!</strong> {response}
                    </div>
                    :
                    status === 201 ?
                        <div className="alert alert-success">
                            <strong>Success!</strong> {response}
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

                {
                    mailValid ? <></> : 
                        <div className="alert alert-warning alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Warning!</strong> Enter valid mail like (@gmail) 
                        </div>
                }

                <label >Email address:</label>
                <input type="email" className="form-control" placeholder="Enter email" required
                    value={email} onChange={(e) => { SetEmail(e.target.value) }} />
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
export default Registration