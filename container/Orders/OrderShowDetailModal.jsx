import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Table,
  FormControl,
} from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import { format } from "date-fns";
export default function ProductsDeleteModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  console.log(props.value);
  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active" : "icon "}
        onClick={handleShow}
      >
        ดูรายละเอียด
      </Button>
      <Modal show={showCheck} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            ดูรายการสินค้า คุณ : {props?.value?.firstname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 ">
            <Col md="6">
              <Table table-borderless>
                <thead>
                  <th className="p-2 text-start">รายละเอียดข้อมูล </th>
                </thead>

                <td className="p-2 text-start">
                  ชื่อผู้สั่งสินค้า : {props?.value?.firstname}{" "}
                  {props?.value?.lastname}
                </td>
                {/* <FormControl type='text'> {props?.value?.firstname}  </FormControl> */}
                <tr>
                  <td className="p-2 text-start">
                    E-mail : {props?.value?.email}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    เบอร์มือถือ : {props?.value?.tel}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    เพิ่มเติม : {props?.value?.notes}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    วันที่สั่งซื้อ :{" "}
                    {format(new Date(props?.value?.createdAt), "dd/MM/yyyy")}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    เวลาที่สั่งซื้อ :{" "}
                    {format(new Date(props?.value?.createdAt), "HH:mm:ss")} น.
                  </td>
                </tr>
                <tr></tr>
              </Table>
            </Col>

            <Col md="6">
              <Table table-borderless>
                <thead>
                  <th className="p-2 text-start">ที่อยู่ที่ต้องจัดส่ง</th>
                </thead>
                <tr>
                  <td className="p-2 text-start">
                    บ้านเลขที่ : {props?.value?.address}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    ตำบล : {props?.value?.subDistrict}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    อำเภอ : {props?.value?.district}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    จังหวัด : {props?.value?.province}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-start">
                    ไปรษณีย์ : {props?.value?.postalCode}
                  </td>
                </tr>

                <tr></tr>
              </Table>
            </Col>
            <Col md="4">
              <h4 className="mb-3 text-start">รูปสลิป</h4>
              <Image src={props?.value?.image} width="350px" height="300px" />
            </Col>
            <Col md="8">
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
                  {props?.value?.OrderDetail?.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.products.name}</td>
                      <td>{product.sumQty}</td>
                      <td>{product.sumPrice} บาท</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal.Title className="mb-3">
                ราคารวมทั้งหมด :{" "}
                <span className="text-danger"> {props?.value?.total} บาท</span>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
