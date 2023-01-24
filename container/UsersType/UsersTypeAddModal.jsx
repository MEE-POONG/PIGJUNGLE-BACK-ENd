import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import axios from 'axios'


export default function UsersTypeAddModal(props) {
    const [{ data:UserTypePost, error: errorMessage, loading: UserTypeLoading }, executeUserType] = useAxios({ url: '/api/usersType', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);
    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    
    const [name, setName] = useState('');

    

    const handleSubmit = () => { 
        setCheckValue(false)
        if ( name !== '' ){  
            handleClose()
            
            executeUserType({
                data: {
                    name: name,
    
                }
            }).then(() => {
                Promise.all([    
                    setName(''),

                    props.getData(),
                ])
            });
        } 
    
        
    }

    if (UserTypeLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มตำแหน่ง
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Users'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มตำแหน่ง</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อตำแหน่ง</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อตำแหน่ง"
                                         onChange={(e) => { setName(e.target.value) }}
                                         value={name} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bsPrefix="succeed" className='my-0' onClick={handleSubmit}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}