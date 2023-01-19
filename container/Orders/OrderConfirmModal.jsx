import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Image  } from 'react-bootstrap'
import { FaTrash ,FaPlus } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function ProductsDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    console.log(props.value)
    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active' : 'icon '} onClick={handleShow}>
                ดูรายละเอียด
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ดูรายการสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mb-3">
                      <Col md='6'>
                      <h4 className="mb-3">รูปสลิป</h4>
                       <Image src="https://s359.kapook.com/pagebuilder/ba154685-db18-4ac7-b318-a4a2b15b9d4c.jpg"  width="400px" height="400px"  />
                      </Col>  
                      <Col md='6'>
                        <h4 className="mb-3 mt-5">ชื่อผู้สั่งสินค้า :  {props?.value?.firstname}{" "}{props?.value?.lastname}</h4>
                        <h4 className="mb-3">E-mail : {props?.value?.email}</h4>
                        <h4 className="mb-3">เบอร์มือถือ : {props?.value?.tel}</h4>
                      </Col>      
                    </Row>
                    <h4>ที่อยู่ที่ต้องจัดส่ง</h4>
                    <Row className="mb-3">
                        <Col md='6'>
                            <h4 className="mb-3 mt-3">บ้านเลขที่ : {props?.value?.address}</h4>
                            <h4 className="mb-3">ตำบล : {props?.value?.subDistrict}</h4>
                            <h4 className="mb-3">อำเภอ : {props?.value?.district}</h4>
                        </Col> 
                        <Col md='6'>
                            <h4 className="mb-3">จังหวัด : {props?.value?.province}</h4>
                            <h4 className="mb-3">ไปรษณีย์ : {props?.value?.postalCod}</h4>
                        </Col>  
                   
                    
                    </Row>
                    
                    <h4>สินค้าที่ต้องจัดส่ง</h4>
                     {props?.value?.OrderDetail?.map((product , index) => (
                    <Row className="mb-3 "key={index}>
                    <Col md='6'>
                        <h4 className="mb-3 mt-3">รูปสินค้า</h4>
                       <Image src={product.products.image}  width="400px" height="200px"  />
                    </Col>  
                    <Col md='6'>
                                <h4 className="mb-3 mt-5">
                                ชื่อสินค้า :{product.products.name}
                                </h4> 
                                <h4 className="mb-3">
                                จำนวนสินค้า :{product.products.name}
                                </h4> 
                                <h4 className="mb-3">
                                ราคารวม :{product.products.name}
                                </h4> 
                    </Col> 
                    </Row>
                       ))}    
                    <Modal.Title className="mb-3">ราคารวมทั้งหมด : <span className='text-danger'> {props?.value?.total}{" "}บาท</span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}