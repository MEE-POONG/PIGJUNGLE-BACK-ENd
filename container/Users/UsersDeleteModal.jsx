import React, { useState } from 'react'
import { Modal, Button ,Image } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function UsersDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteUsersLoading, error: deleteUsersError }, executeUsersDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeUsersDelete({
            url: '/api/users/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deleteUsersLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteUsersLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteUsersError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={props?.value?.image}  width="150px" height="150px" className='object-fit-cover' />
                    <Modal.Title>UserName : <span className='text-danger'> {props?.value?.username}</span></Modal.Title>
                    <Modal.Title>ชื่อ-นามสกุล : <span className='text-danger'> {props?.value?.fname}{" "}{props?.value?.fname}</span></Modal.Title>
                    <Modal.Title>ตำแหน่ง : <span className='text-danger'>{props?.value?.UsersType?.name}</span></Modal.Title>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className='my-0' onClick={handleDeleteData}>
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}