import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';

import axios from 'axios'
import { CKEditor } from 'ckeditor4-react'

export default function UsersAddModal(props) {
    
    const [{ data:UsersPost, error: errorMessage, loading: UsersLoading }, executeUsers] = useAxios({ url: '/api/users', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [username, setUserName] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [usersTypeId, setUsersTypeId] = useState('');



    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageProductChange = (e) => {
            setImage([...e.target.files])
        }
    


    const handleSubmit = async event  => { 
        setCheckValue(false)
        if ( username !== '' && password !== ''){ 
            
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeUsers({
                data: {
                    username: username,
                    fname: fname,
                    lname:lname,
                    password:password,
                    usersTypeId:usersTypeId,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([    
                    setUserName(''),
                    setFname(''),
                    setLname(''),
                    setPassword(''),
                    setUsersTypeId(''),
                    props.getUsersData(),
                ])
            });
        } 
    
        
    }

    if (imgLoading || UsersLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มสมาชิก
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Users'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสมาชิก</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>


                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อ</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อ"
                                         onChange={(e) => { setFname(e.target.value) }}
                                         value={fname} autoComplete="off"
                                         isValid={checkValue === false && fname !== '' ? true : false}
                                         isInvalid={checkValue === false && fname === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                         
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>นามสกุล</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มนามสกุล"
                                         onChange={(e) => { setLname(e.target.value) }}
                                         value={lname} autoComplete="off"
                                         isValid={checkValue === false && lname !== '' ? true : false}
                                         isInvalid={checkValue === false && lname === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม UserName"
                                         onChange={(e) => { setUserName(e.target.value) }}
                                         value={username} autoComplete="off"
                                         isValid={checkValue === false && username !== '' ? true : false}
                                         isInvalid={checkValue === false && username === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อ PassWord"
                                         onChange={(e) => { setPassword(e.target.value) }}
                                         value={password} autoComplete="off"
                                         isValid={checkValue === false && password !== '' ? true : false}
                                         isInvalid={checkValue === false && password === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ตำแหน่ง</Form.Label>
                                        <Form.Select  
                                         onChange={(e) => { setUsersTypeId(e.target.value) }}
                                         value={usersTypeId} autoComplete="off"
                                         isValid={checkValue === false && usersTypeId !== '' ? true : false}
                                         isInvalid={checkValue === false && usersTypeId === '' ? true : false}>
                                            <option value="">ประเภทสินค้า</option>
                                            {props.usersTypeData?.map((usersType, index) => (
                                                <option key={index} value={usersType.id}>{usersType.name}</option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Col>
                    </Row>
                    
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

