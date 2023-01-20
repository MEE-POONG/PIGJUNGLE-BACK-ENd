import Head from "next/head";
import { useState, useEffect } from "react";
import IndexPage from "components/layouts/IndexPage";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
// import { useRouter } from 'next/router';
import {
  Container,
  Image,
  Table,
  Button,
  Form,
  OverlayTrigger,
  Badge,
  Modal,
  Row,
  Alert,
} from "react-bootstrap";
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from "axios-hooks";
import { FaReply, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ContactPage() {
  const [{ data: contactData, loading, error }, getContact] = useAxios({
    url: "/api/contact",
  });
  const [
    { data: contactById, loading: contactByIdLoading, error: contactByIdError },
    getContactById,
  ] = useAxios({}, { manual: true });
  const [
    { loading: updateContactLoading, error: updateContactError },
    executeContactPut,
  ] = useAxios({}, { manual: true });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [line, setLine] = useState("");
  const [linkmap, setLinkmap] = useState("");

  const [showModalEdit, setShowModalEdit] = useState(false);
  const ShowModalEdit = async (id) => {
    await getContactById({ url: "/api/contact/" + id, method: "GET" });
    setShowModalEdit(true);
  };

  useEffect(() => {
    setTitle(contactById?.title);
    setAddress(contactById?.address);
    setTel(contactById?.tel);
    setEmail(contactById?.email);
    setFacebook(contactById?.facebook);
    setLine(contactById?.line);
    setLinkmap(contactById?.linkmap);
  }, [contactById]);

  const CloseModal = () => {
    setShowModalEdit(false);
  };
  if (loading || updateContactLoading || contactByIdLoading)
    return <PageLoading />;
  if (error || updateContactError || contactByIdError) return <PageError />;
  return (
    <>
      <Head>
        <title>PIG JUNGLE BACKEND</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <Container fluid className=" pt-4 px-4">
        {contactData?.map((contact, index) => (
          <div className="bg-secondary rounded shadow p-4" key={index}>
            <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าติดต่อ</h5>
            {/* <div className="d-flex align-items-center justify-content-between mb-4"></div> */}

            <div className="d-flex align-items-center border-bottom py-2">
              <div className="table-responsive w-100 ">
                <Form.Group  className="mb-3 my-3">
                  <Form.Label> <h4>ชื่อร้าน</h4></Form.Label>
                  <Alert variant="warning" style={{ width: "500px"}}>
                  <h5>{contact.title}</h5>
                  </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>ที่อยู่</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.address}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>เบอร์โทรศัพท์</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.tel}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                
                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>อีเมล์</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.email}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>เฟสบุค</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.facebook}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>ไลน์</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.line}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                
                <Form.Group className="mb-3 my-3">
                <Form.Label> <h4>ลิงค์แผนที่</h4></Form.Label>
                <Alert variant="warning" style={{ width: "500px"}}>
                <h5>{contact.linkmap}</h5>
                </Alert>
                </Form.Group>

                <hr style={{ width: "500px"}} />

                <Button
                  variant="warning"
                  onClick={() => ShowModalEdit(contact.id)}
                >
                  แก้ไข
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Container>

      <Modal
        show={showModalEdit}
        onHide={CloseModal}
        centered
        className="bg-templant"
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อร้าน</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ที่อยู่</Form.Label>
            <Form.Control
              as="textarea"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เบอร์โทรศัพท์</Form.Label>
            <Form.Control
              type="text"
              value={tel}
              onChange={(event) => setTel(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>อีเมล์</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เฟสบุค</Form.Label>
            <Form.Control
              type="text"
              value={facebook}
              onChange={(event) => setFacebook(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ไลน์</Form.Label>
            <Form.Control
              type="text"
              value={line}
              onChange={(event) => setLine(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ลิงค์แผนที่</Form.Label>
            <Form.Control
              type="text"
              value={linkmap}
              onChange={(event) => setLinkmap(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModal}>
            ยกเลิก
          </Button>
          <Button
            variant="success"
            onClick={() => {
                executeContactPut({
                url: "/api/contact/" + contactById?.id,
                method: "PUT",
                data: {
                    title: title,
                    address: address,
                    tel: tel,
                    email: email,
                    facebook: facebook,
                    line: line,
                    linkmap: linkmap,
                },
              }).then(() => {
                Promise.all([
                    setTitle(''),
                    setAddress(''),
                    setTel(''),
                    setEmail(''),
                    setFacebook(''),
                    setLine(''),
                    setLinkmap(''),
                    getContact()
                ]).then(() => {
                  CloseModal();
                });
              });
            }}
          >
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
ContactPage.layout = IndexPage;
