import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col,Image } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardError from '@/components/CardChange/CardError'
import ModelLoading from '@/components/ModelChange/ModelLoading'
import ModelError from '@/components/ModelChange/ModelError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function UsersTypeEditModal(props) {
    const [{ loading: updateUserTypeLoading, error: updateUsersError }, executeUserTypePut] = useAxios({}, { manual: true })

    const [checkValue, setCheckValue] = useState(true);
    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const [name, setName] = useState('');

       
    useEffect(() => {
            if (props){
            setName(props?.value?.name);
            }
        },[props] )
    
    
  

    const handlePutData = () => {
        setCheckValue(false);
        if (name !== '') {
            executeUserTypePut({
                url: '/api/usersType/' + props?.value?.id,
                method: 'PUT',
                data: {
                    name: name,
                }
            }).then(() => {
                Promise.all([
                    setName(''),
                    props.getData(),
                ]).then(() => {
                    if (updateUserTypeLoading?.success) {
                        handleClose()
                    }
                })
            })
        }
    }

    if (updateUserTypeLoading) return <ModelLoading showCheck={showCheck}/>
    if (updateUsersError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

    return (
        <>
            <Button bsPrefix='edit' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                 <Modal.Header closeButton>
                    <Modal.Title className='text-center'>แก้ไขตำแหน่ง</Modal.Title>
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
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className='my-0' onClick={handlePutData}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}