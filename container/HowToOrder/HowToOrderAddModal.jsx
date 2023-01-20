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

export default function HowToOrdersAddModal(props) {
    const [{ data: howToOrdersData ,loading ,error }, getHowToOrders] = useAxios({ url: '/api/howToOrders' })
    const [{ data:howToOrdersPost, error: errorMessage, loading: howToOrdersLoading }, executeHowToOrders] = useAxios({ url: '/api/howToOrder', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

        
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    


    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageHowToOrderChange = (e) => {
            setImage([...e.target.files])
        }
    


    const handleSubmit = async event  => { 
        setCheckValue(false)
        if ( title !== '' && detail !== ''){ 
            
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeHowToOrders({
                data: {
                    title: title,
                    detail: detail,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([    
                    setTitle(''),
                    setDetail(''),
                    setImage(''),
                    props.getData(),
                ])
            });
        } 
    
        
    }

    if (loading || howToOrdersLoading || imgLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (error || errorMessage ||imgError ) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มสินค้า
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-HowToOrders'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มวิธีการใช้</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูป</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcHowToOrder, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHowToOrder} alt="HowToOrder_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageHowToOrderChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>หัวข้อ</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มหัวข้อ"
                                         onChange={(e) => { setTitle(e.target.value) }}
                                         value={title} autoComplete="off"
                                         isValid={checkValue === false && title !== '' ? title : false}
                                         isInvalid={checkValue === false && title === '' ? title : false}
                                        />
                                    </Form.Group>
                                </Col>
        

                          </Row>
                        </Col>
                        <Form.Group className="mb-3" controlId="Detail">
                                        <Form.Label>เนื้อหา</Form.Label>
                                        <CKEditor
                                    initData={detail}
                                    onChange={event=> setDetail( event.editor.getData())}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    // extraPlugins: "uploadimage",
                                    // filebrowserUploadMethod: "form",
                                    // filebrowserUploadUrl: ("/uploader/upload"),
                                    // filebrowserBrowseUrl: '/addgallery',
                                    // toolbar: [
                                    // ],
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    // removePlugins: 'image',
                                    }}
                                    />             
                                    </Form.Group>
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

