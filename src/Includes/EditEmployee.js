import React, { useState, useEffect } from "react";
import axios from 'axios';
import api from "../api"; 
import { Link,useNavigate, useParams } from "react-router-dom";
function EditEmployee() {

    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formvalue, setFormValue] = useState({
        employee_code: "",
        employee_lname: "",
        employee_fname: "",
        employee_gender: "",
        employee_birthday: "",
        employee_address: ""
    });

    const handleInput = (e) => {
        setFormValue({
            ...formvalue,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const fetchEmployeeData = async () => {
            const fetch_id = await api.get(`employee.php/` + id);
            // console.log(fetch_id.data[0]);
            setFormValue(fetch_id.data[0]);
        };
        fetchEmployeeData();
    }, [id]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formvalue);
        const formData = {
            employee_id:id,
            employee_code: formvalue.employee_code,
            employee_lname: formvalue.employee_lname,
            employee_fname: formvalue.employee_fname,
            employee_birthday: formvalue.employee_birthday,
            employee_gender: formvalue.employee_gender,
            employee_address: formvalue.employee_address
        }
        try {
            const res = await api.put("employee.php/${id}", formData);
            if (res.data.status === "success") {
                alert(res.data.message); 
                navigate("/");
            } else {
                console.log(res.data);
                alert(res.data.message || "Failed to update employee.");
            }
        } catch (error) {
            console.error("Axios Error:", error);
            alert("Error submitting form. Please try again.");
        }
    }

    return (
        <React.Fragment>
            <div className="container text-start mt-5">
                <div className="card">
                    <div className="card-header">

                        <h2>Update Employee</h2>

                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="row mb-3">
                                <label htmlFor="employee_code" className="col-sm-2 col-form-label">Employee Code: <span
                                    className="text-danger"> * </span></label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" placeholder="Enter Employee Code" id="employee_code"
                                        name="employee_code" value={formvalue.employee_code || ""}
                                        onChange={handleInput} readOnly />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="align-self-end col-md-2">
                                    <label>Full Name: <span className="text-danger"> * </span></label>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="employee_lname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Last Name" id="employee_lname"
                                        name="employee_lname" value={formvalue.employee_lname || ""}
                                        onChange={handleInput} required />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="employee_fname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter First Name" id="employee_fname"
                                        name="employee_fname" value={formvalue.employee_fname || ""}
                                        onChange={handleInput} required />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="employee_gender" className="col-sm-2 col-form-label">Gender: <span className="text-danger">
                                    * </span></label>
                                <div className="col-sm-5">
                                    <select name="employee_gender" value={formvalue.employee_gender || ""}
                                        onChange={handleInput} id="employee_gender" className="form-select" required>
                                        <option value="" disabled>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="employee_birthday" className="col-sm-2 col-form-label">Select Birthday:</label>
                                <div className="col-sm-5">
                                    <input type="date" name="employee_birthday" value={formvalue.employee_birthday || ""}
                                        onChange={handleInput} id="employee_birthday" className="form-control" required />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="employee_address" className="col-sm-2 col-form-label">Home Address:</label>
                                <div className="col-sm-12">
                                    <textarea className="form-control" name="employee_address" value={formvalue.employee_address || ""}
                                        onChange={handleInput} id="employee_address" aria-label="Address"></textarea>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                            <Link to="/" className="btn btn-danger mx-2">Cancel</Link>
                        </form>

                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
export default EditEmployee;