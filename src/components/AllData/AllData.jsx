import React, {useState, useEffect} from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
// bmhhmartin.work(mockupapi)

const AllData = () => {
    const [user, setUser] = useState([]);
    const [singleItem, setSingleItem] = useState({});
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const editInput=(e)=>{
        setEditName(e.target.value);
        console.log(e.target.value);
    }

    const editEmailInput=(e)=>{
        setEditEmail(e.target.value);
        console.log(e.target.value);
    }

    const [sModal, setSModal] = useState(false);
    const sModalClose = () => setSModal(false);

    const [eModal, setEModal] = useState(false);
    const eModalClose = () => setEModal(false);

    const [dModal, setDModal] = useState(false);
    const dModalClose = () => setDModal(false);

    const allData = async ()=>{
        await axios({
            method: "GET",
            headers: {'accept': 'application/json'},
            url: `https://61d28de1da87830017e59623.mockapi.io/users`
        }).then(response=>{
            setUser(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {
        allData();
    }, []);


    const deleteUser = async (e)=>{
        e.preventDefault();
        try{
            await axios({
                method: "DELETE",
                headers: {'accept': 'application/json'},
                url: `https://61d28de1da87830017e59623.mockapi.io/users/${singleItem.userid}`
            })
            console.log("Delete: " + singleItem.userid)
            setDModal(false);
            toast.error("Item Deleted", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }catch (error){
            console.log(error);
        }
    }

    const editUser = async (e)=>{
        e.preventDefault();
        try{
            await axios({
                method: "PUT",
                headers: {'accept': 'application/json'},
                url: `https://61d28de1da87830017e59623.mockapi.io/users/${singleItem.userid}`,
                data: {
                    username: editName,
                    useremail: editEmail
                }
            })
            console.log("Edit: " + singleItem.useremail)
            setDModal(false);
            toast.success("Item Updated", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }catch (error){
            console.log(error);
        }
    }
    

    return (
        <>
           <Container>
                <h2 className='py-5'>All Users</h2>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(result=>(
                                    <tr key={result.userid}>
                                        <td>
                                            <img src={result.userimage} style={{width: "60px"}} alt="Person" />
                                        </td>
                                        <td>{result.username}</td>
                                        <td>{result.useremail}</td>
                                        <td>{result.useraddress}</td>
                                        <td>
                                            <ul className='actions'>
                                                <li><Button variant="info" onClick={()=>{setSingleItem(result); setSModal(true)}}><FaEye/></Button></li>
                                                <li><Button variant="primary" onClick={()=>{setSingleItem(result); setEModal(true)}}><FaEdit/></Button></li>
                                                <li><Button variant="danger" onClick={()=>{setSingleItem(result); setDModal(true)}}><FaTrashAlt/></Button></li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>


                    <Modal {...singleItem} show={sModal} onHide={sModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Show User:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <img src={singleItem.userimage}  style={{width: "200px"}} alt="User" />
                            </div>
                            <div className='text-center'>
                                <h4 className='text-info pt-1'>Name: {singleItem.username}</h4>
                                <h5 className='pt-1'>Department: {singleItem.userdept}</h5>
                                <h5 className='pt-1'>Email: {singleItem.useremail}</h5>
                                <p className='pt-1'>Details: {singleItem.userdetails}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={sModalClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={sModalClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Show modal ends */}

                    <Modal {...singleItem} show={eModal} onHide={eModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={editInput} defaultValue={singleItem.username} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" onChange={editEmailInput} defaultValue={singleItem.useremail} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" defaultValue={singleItem.useraddress} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={eModalClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={editUser}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Edit modal ends */}


                    <Modal {...singleItem} show={dModal} onHide={dModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='text-center'>
                                <img src={singleItem.userimage}  style={{width: "200px"}} alt="User" />
                                <h4 className='text-info pt-1'>{singleItem.username}</h4>
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{justifyContent: "space-between"}}>
                            <div><h3 className='text-danger'>Confirm Delete</h3></div>
                            <div>
                                <Button variant="danger" onClick={deleteUser}>Yes</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                    <ToastContainer />
                    {/* delete modal ends */}


            </Container> 
        </>
    );
};

export default AllData;