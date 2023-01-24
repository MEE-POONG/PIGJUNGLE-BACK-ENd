import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col,Image } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardError from '@/components/CardChange/CardError'
import ModelLoading from '@/components/ModelChange/ModelLoading'
import ModelError from '@/components/ModelChange/ModelError'
import FormData from 'form-data';
import  {format}  from "date-fns";

export default function OrderEditModal(props) {
    
    const [{ loading: updateOrderLoading, error: updateOrderError }, executeOrderPut] = useAxios({}, { manual: true })

    const [checkValue, setCheckValue] = useState(true);

    const [status, setStatus] = useState('');
    

    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const handlePutData = ()=> {
        setCheckValue(false);
        if (status === 'รอการตรวจสอบ') {
             executeOrderPut({
                url: '/api/order/' + props?.value?.id,
                method: 'PUT',
                data: {
                    status: 'กำลังดำเนินการ',
                }
                
            }).then(() => {
                Promise.all([
                    setStatus(''),
                    props.getData(),
                ]).then(() => {
                    if (updateOrderLoading?.success) {
                        handleClose()
                    }
                })
            })
        }
    }

    // if (loading || updateOrderLoading) return <ModelLoading showCheck={showCheck}/>
    // if (error || updateOrderError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

    return (
        <>
            <Button bsPrefix='edit' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                 <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ยืนยันรายการสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    
                      
                    <Image src={props?.value?.image}  width="150px" height="150px" className='object-fit-cover' />
                    <h4 className="mb-3">ชื่อผู้สั่งสินค้า : {props?.value?.firstname}{" "}{props?.value?.lastname}</h4>
                    <h4 className="mb-3">วันที่สั่งซื้อ : {format(new Date(props?.value?.createdAt), "dd/MM/yyyy")}</h4>
                    <h4 className="mb-3">เวลาที่สั่งซื้อ : {format(new Date(props?.value?.createdAt), "HH:mm:ss")}{" "}น.</h4>
                    <h4 className="mb-3">สถานะ : {props?.value?.status}</h4>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bsPrefix="succeed" className='my-0'  onClick={handlePutData}>
                        ยืนยันรายการสินค้า
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
    
}

