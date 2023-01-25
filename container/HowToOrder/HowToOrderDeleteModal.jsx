import React, { useState } from 'react'
import { Modal, Button ,Image } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function howToOrderDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteHowToOrderLoading, error: deleteHowToOrderError }, executeHowToOrderDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeHowToOrderDelete({
            url: '/api/howToOrder/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deleteHowToOrderLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteHowToOrderLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteHowToOrderError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={props?.value?.image}  width="150px" height="150px" className='object-fit-cover' />
                    <Modal.Title>หัวข้อ : <span className='text-danger'> {props?.value?.title}</span></Modal.Title>
                    <Modal.Title>เนื้อหา : <span className='text-danger'>{props?.value?.detail}</span></Modal.Title>
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