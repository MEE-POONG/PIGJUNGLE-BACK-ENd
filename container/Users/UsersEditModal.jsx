import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";
import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function ProductsEditModal(props) {
  const [
    { loading: updateProductsLoading, error: updateProductsError },
    executeProductsPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );

  const [img, setImg] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [username, setUserName] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [usersTypeId, setUsersTypeId] = useState('');


  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  useEffect(() => {
    if (props) {
      setUserName(props?.value?.username);
      setFname(props?.value?.fname);
      setLname(props?.value?.lname);
      setPassword(props?.value?.password);
      setUsersTypeId(props?.value?.usersTypeId);
    }

    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
  }, [props, image]);

  const onImageProductChange = (e) => {
    setImage([...e.target.files]);
  };

  const handlePutData = async () => {
    setCheckValue(false);
    if (name !== "" && price !== "") {
      let data = new FormData();
      data.append("file", image[0]);
      const imageData = await uploadImage({ data: data });
      const id = imageData.data.result.id;

      await executeProductsPut({
        url: "/api/products/" + props?.value?.id,
        method: "PUT",
        data: {
          username: username,
          fname: fname,
          lname:lname,
          password:password,
          usersTypeId:usersTypeId,
          image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      }).then(() => {
        Promise.all([
          setUserName(''),
          setFname(''),
          setLname(''),
          setPassword(''),
          setUsersTypeId(''),
          props.getUsersData(),
        ]).then(() => {
          if (updateProductsLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  if (updateProductsLoading || imgLoading) return <ModelLoading showCheck={showCheck}/>
  if (updateProductsError || imgError ) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

  return (
    <>
      <Button
        bsPrefix="edit"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
        <FaEdit />
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">แก้ไขสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสมาชิก</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>


                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อ</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อ"
                                         onChange={(e) => { setFname(e.target.value) }}
                                         value={fname} autoComplete="off"
                                         isValid={checkValue === false && fname !== '' ? true : false}
                                         isInvalid={checkValue === false && fname === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                         
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>นามสกุล</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มนามสกุล"
                                         onChange={(e) => { setLname(e.target.value) }}
                                         value={lname} autoComplete="off"
                                         isValid={checkValue === false && lname !== '' ? true : false}
                                         isInvalid={checkValue === false && lname === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม UserName"
                                         onChange={(e) => { setUserName(e.target.value) }}
                                         value={username} autoComplete="off"
                                         isValid={checkValue === false && username !== '' ? true : false}
                                         isInvalid={checkValue === false && username === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อ PassWord"
                                         onChange={(e) => { setPassword(e.target.value) }}
                                         value={password} autoComplete="off"
                                         isValid={checkValue === false && password !== '' ? true : false}
                                         isInvalid={checkValue === false && password === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ตำแหน่ง</Form.Label>
                                        <Form.Select  
                                         onChange={(e) => { setUsersTypeId(e.target.value) }}
                                         value={usersTypeId} autoComplete="off"
                                         isValid={checkValue === false && usersTypeId !== '' ? true : false}
                                         isInvalid={checkValue === false && usersTypeId === '' ? true : false}>
                                            <option value="">ประเภทสินค้า</option>
                                            {props.usersTypeData?.map((usersType, index) => (
                                                <option key={index} value={usersType.id}>{usersType.name}</option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Col>
                    </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handlePutData}>
            ยืนยันการเพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
