import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import api from '../api.js';
import { useReactToPrint } from "react-to-print";

function EmployeeList() {

    // for delete modal
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelectedId(id);
        setShow(true);
    };
    // -----------------endl for delete modal

    // mapping data to datatable
    const columns = [
        {
            name: 'Employee Code',
            selector: row => row.employee_code,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.employee_lname,
            sortable: true,
        },
        {
            name: 'First Name',
            selector: row => row.employee_fname,
            sortable: true,
        },
        {
            name: 'Birthday',
            selector: row => row.employee_birthday,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.employee_gender,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.employee_address,
        },
        {
            name: 'Action',
            cell: row =>
                <div>
                    <Link to={`/editemployee/${row.id}`}>Edit</Link> |  <Link onClick={() => handleShow(row.id)}>Delete</Link>

                </div>
        }
    ];
    // --------------endl mapping data to datatable

    // fetching data from api
    const [tableData, setTableData] = useState([]);

    const getTableData = async () => {
        const response = await api.get("employee.php");
        setTableData(response.data);
    };

    useEffect(() => {
        getTableData();
    }, []);
    // ----------endl fetching data from api

    // delete function
    const handleDelete = async (id) => {
        await api.delete(`employee.php/${selectedId}`);
        setShow(false);
        getTableData();
    }
    // --------------endl delete function

    // print function
    const printPDF = useRef();
    const generatePDF = useReactToPrint({
        content: () => printPDF.current,
        documentTitle: 'Employee List',
        onAfterPrint: () => alert("Print Success"),
    });

    return (
        <>
            <div className="container text-start mt-5">
                <h2>Employee Listing</h2>
                <div className="mb-3">
                    <Link to="/addemployee" className="btn btn-primary">New Employee</Link>
                    <button onClick={() => window.print()} className="btn btn-success mx-2">Print</button>
                </div>

                <div id="printArea">
                    <DataTable
                        columns={columns}
                        data={tableData}

                        pagination
                        highlightOnHover
                        dense
                    />
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this employee?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeeList;
