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

export default function SlidesAddModal(props) {
    const [{ data: SlidesData, loading , error} , getSlides] = useAxios({ url: '/api/slides' })
    const [{ data:SlidesPost, error: errorMessage, loading: SlidesLoading }, executeSlides] = useAxios({ url: '/api/slides', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageSlidesChange = (e) => {
            setImage([...e.target.files])
        }
    


    const handleSubmit = async event  => { 
        setCheckValue(false)
        if ( image !== ''){ 
            
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeSlides({
                data: {
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([    
                    setImage(''),
                    props.getData(),
                ])
            });
        } 
    
        
    }

    if (loading || SlidesLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (error || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มรูป
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Slides'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มวิธีการใช้</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูป</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcSlides, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcSlides} alt="Slides_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageSlidesChange} />
                    
                            </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className='my-0' onClick={handleSubmit}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

