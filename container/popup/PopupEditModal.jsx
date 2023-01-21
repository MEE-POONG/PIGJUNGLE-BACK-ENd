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

export default function PopupEditModal(props) {
    const [{ loading: updatePopupLoading, error: updatePopupError }, executePopupPut] = useAxios({}, { manual: true })

    const [checkValue, setCheckValue] = useState(true);


    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});

    const [img, setImg] = useState([])
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);



       
    useEffect(() => {
            if (props){
            setImg(props?.value?.image);
            }
            
           if (image.length < 1)  return
            const newImageUrl = []
            image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
            setImageURL(newImageUrl)            
        
        },[props,image] )
    
    const onImagePopupChange = (e) => {
            setImage([...e.target.files])
        }
    

    const handlePutData = async () => {
        setCheckValue(false);
        if (name !== '' && price !== '') {

            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executePopupPut({
                url: '/api/popup/' + props?.value?.id,
                method: 'PUT',
                data: {
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
                }
            }).then(() => {
                Promise.all([
                    setImage(''),
                    props.getData(),
                ]).then(() => {
                    if (updatePopupLoading?.success) {
                        handleClose()
                    }
                })
            })
        }
    }

    if (updatePopupLoading||imgLoading) return <ModelLoading showCheck={showCheck}/>
    if (updatePopupError||imgError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

    return (
        <>
            <Button bsPrefix='edit' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                 <Modal.Header closeButton>
                    <Modal.Title className='text-center'>แก้ไขสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>
 
                                <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="Popup_img" fluid rounded />}
                                {imageURL?.map((imageSrcPopup, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcPopup} alt="Popup_img" fluid rounded />)}
                                <Form.Control type="file" accept="image/*" onChange={onImagePopupChange} />
                    
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bsPrefix="succeed" className='my-0' onClick={handlePutData}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
    
}

