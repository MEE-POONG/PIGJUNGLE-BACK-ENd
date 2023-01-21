import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Image ,Table } from 'react-bootstrap'
import { FaTrash ,FaPlus } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import  {format}  from "date-fns";
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
                       <Image src={props?.value?.image}  width="400px" height="400px"  />
                      </Col>  
                      <Col md='6'>
                        <h4 className="mb-3 mt-5">ชื่อผู้สั่งสินค้า :  {props?.value?.firstname}{" "}{props?.value?.lastname}</h4>
                        <h4 className="mb-3">E-mail : {props?.value?.email}</h4>
                        <h4 className="mb-3">เบอร์มือถือ : {props?.value?.tel}</h4>
                        <h4 className="mb-3">เพิ่มเติม : {props?.value?.notes}</h4>
                        <h4 className="mb-3">เวลาที่สั่งซื้อ : {format(new Date(props?.value?.createdAt), "dd/MM/yyyy HH:mm:ss")}</h4>
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
                            <h4 className="mb-3">ไปรษณีย์ : {props?.value?.postalCode}</h4>
                        </Col>  
                   
                    
                    </Row>
                    
                    <h4>สินค้าที่ต้องจัดส่ง</h4>

                    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ชื่อสินค้า</th>
                    <th>จำนวนสินค้า</th>
                    <th>ราคารวม</th>
                </tr>
            </thead>
            <tbody>
            {props?.value?.OrderDetail?.map((product , index) => (
                        
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                            {product.products.name} 
                            </td>
                            <td>
                            {product.sumQty} 
                            </td>
                            <td>
                            {product.sumPrice}{" "}บาท
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
   
        <Modal.Title className="mb-3">ราคารวมทั้งหมด : <span className='text-danger'> {props?.value?.total}{" "}บาท</span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}