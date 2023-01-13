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

export default function PortfolioAddModal(props) {
    const [{ data:PortfolioData}, getPortfolio] = useAxios({ url: '/api/portfolio' })
    
    const [{ data:PortfolioPost, error: errorMessage, loading: PortfolioLoading }, executePortfolio] = useAxios({ url: '/api/portfolio', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');

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
        if ( name !== ''){ 
            
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executePortfolio({
                data: {
                    name: name,
                    detail: detail,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([    
                    setName(''),
                    setDetail(''),
                    setImage(''),

                    props.getData(),
                ])
            });
        } 
    
        
    }

    // if (loading || PortfolioLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    // if (error || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มผลงาน
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Portfolio'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มผลงาน</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปผลงาน</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อผลงาน</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อสินค่า"
                                         onChange={(e) => { setName(e.target.value) }}
                                         value={name} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <h4>เพิ่มข้อมูลผลงาน</h4>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดผลงาน</Form.Label>
                                <CKEditor
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