import Head from "next/head";
import { useState, useEffect } from "react";
import IndexPage from "components/layouts/IndexPage";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
// import { useRouter } from 'next/router';
import {
  Container,
  Image,
  Button,
  Form,
  OverlayTrigger,
  Badge,
  Modal,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from "axios-hooks";
import FormData from "form-data";
import { FaReply, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function homeFrontPage() {
  const [{ data: homeFrontData, loading, error }, getHomeFront] = useAxios({
    url: "/api/homeFront",
  });
  const [
    {
      data: homeFrontById,
      loading: homeFrontByIdLoading,
      error: homeFrontByIdError,
    },
    getHomeFrontById,
  ] = useAxios({}, { manual: true });
  const [
    { loading: updateHomeFrontLoading, error: updateHomeFrontError },
    executeHomeFrontPut,
  ] = useAxios({}, { manual: true });

  const [
    { data: linkVideoData, loading: linkVideoLoading, error: linkVideoError },
    getLinkVideoFront,
  ] = useAxios({
    url: "/api/linkVideo",
  });
  const [
    {
      data: linkVideoById,
      loading: linkVideoByIdLoading,
      error: linkVideoByIdError,
    },
    getLinkVideoById,
  ] = useAxios({}, { manual: true });
  const [
    { loading: updateLinkVideoLoading, error: updateLinkVideoError },
    executeLinkVideoPut,
  ] = useAxios({}, { manual: true });

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );

  const [img, setImg] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [link, setLink] = useState([]);

  const [name, setName] = useState("");

  useEffect(() => {
    setName(homeFrontById?.name);
    setImg(homeFrontById?.image);

    setLink(linkVideoById?.link);

    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
  }, [homeFrontById, linkVideoById, image]);

  const onImageLogoChange = (e) => {
    setImage([...e.target.files]);
  };

  const [showModalEdit, setShowModalEdit] = useState(false);
  const ShowModalEdit = async (id) => {
    await getHomeFrontById({ url: "/api/homeFront/" + id, method: "GET" });
    setShowModalEdit(true);
  };

  const [showModalImageEdit, setShowModalImageEdit] = useState(false);

  const ShowModalImageEdit = async (id) => {
    await getHomeFrontById({ url: "/api/homeFront/" + id, method: "GET" });
    setShowModalImageEdit(true);
  };

  const [showModalEditLinkVideo, setShowModalEditLinkVideo] = useState(false);
  const ShowModalEditLinkVideo = async (id) => {
    await getLinkVideoById({ url: "/api/linkVideo/" + id, method: "GET" });
    setShowModalEditLinkVideo(true);
  };

  const CloseModal = () => {
    setShowModalEdit(false);
    setShowModalEditLinkVideo(false);
    setShowModalImageEdit(false);
  };
  if (loading || updateHomeFrontLoading || homeFrontByIdLoading || imgLoading)
    return <PageLoading />;
  if (error || updateHomeFrontError || homeFrontByIdError || imgError)
    return <PageError />;
  return (
    <>
    <Head>
        <title>PIG JUNGLE</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/profile.jpg" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded shadow p-4">
          <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าหลัก</h5>
          {/* <div className="d-flex align-items-center justify-content-between mb-4"></div> */}

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100 ">
              <Row>
                {homeFrontData?.map((homeFront, index) => (
                  <Col key={index}>
                    <Form.Group className="mb-3 my-3">
                      <Form.Label>
                        {" "}
                        <h4> ภาพโลโก้ร้าน</h4>
                      </Form.Label>

                      <Card style={{ width: "500px" }}>
                        <Card.Img
                          src={homeFront.image}
                          width="500px"
                          height="500px"
                        />
                      </Card>
                    </Form.Group>

                    <Form.Group className="mb-3 my-3">
                      <Form.Label>
                        {" "}
                        <h4>ชื่อร้าน</h4>
                      </Form.Label>
                      <Alert variant="warning" style={{ width: "500px" }}>
                        <h5>{homeFront.name}</h5>
                      </Alert>
                    </Form.Group>

                    <hr style={{ width: "500px" }} /> 

                    <Button
                      className="mx-2"
                      variant="warning"
                      onClick={() => ShowModalImageEdit(homeFront.id)}
                    >
                      แก้ไขโลโก้ร้าน
                    </Button>

                    <Button
                      variant="warning"
                      onClick={() => ShowModalEdit(homeFront.id)}
                    >
                      แก้ไขชื่อร้าน
                    </Button>

                   
                  </Col>
                ))}
                {linkVideoData?.map((linkVideo, index) => (
                  <Col key={index}>
                    <Form.Group className="mb-3 my-3">
                      <Form.Label>
                        {" "}
                        <h4> วิดีโอร้าน</h4>
                      </Form.Label>
                      <Card style={{ width: "500px" }}>
                        <iframe
                          width="500px"
                          height="500px"
                          src={linkVideo.link}
                        ></iframe>
                      </Card>
                    </Form.Group>

                    <Form.Group className="mb-3 my-3">
                      <Form.Label>
                        {" "}
                        <h4>ลิ้งค์วิดีโอ</h4>
                      </Form.Label>
                      <Alert variant="warning" style={{ width: "500px" }}>
                        <h5>{linkVideo.link}</h5>
                      </Alert>
                    </Form.Group>

                    <hr style={{ width: "500px" }} />

                    <Button
                      variant="warning"
                      onClick={() => ShowModalEditLinkVideo(linkVideo.id)}
                    >
                      แก้ไข
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
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
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModal}>
            ยกเลิก
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              let data = new FormData();
              data.append("file", image[0]);
              const imageData = await uploadImage({ data: data });
              const id = imageData.data.result.id;

              await executeHomeFrontPut({
                url: "/api/homeFront/" + homeFrontById?.id,
                method: "PUT",
                data: {
                  name: name,
                  image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
                },
              }).then(() => {
                Promise.all([setName(""), setImage("")]).then(() => {
                  CloseModal();
                });
              });
            }}
          >
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalImageEdit}
        onHide={CloseModal}
        centered
        className="bg-templant"
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรูปโลโก้ร้าน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label className="text-center">เลือกรูปโลโก้</Form.Label>
            <Form.Label className="d-block">รูปภาพ</Form.Label>
            {imageURL?.length === 0 && (
              <Image
                className="mb-2"
                style={{ height: 200 }}
                src={img}
                alt="logo_img"
                fluid
                rounded
              />
            )}
            {imageURL?.map((imageSrcContact, index) => (
              <Image
                key={index}
                className="mb-2"
                style={{ height: 200 }}
                src={imageSrcContact}
                alt="logo_img"
                fluid
                rounded
              />
            ))}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={onImageLogoChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModal}>
            ยกเลิก
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              let data = new FormData();
              data.append("file", image[0]);
              const imageData = await uploadImage({ data: data });
              const id = imageData.data.result.id;

              executeContactPut({
                url: "/api/homeFront/" + homeFrontById?.id,
                method: "PUT",
                data: {
                  image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
                },
              }).then(() => {
                Promise.all([setImage(""), getContact()]).then(() => {
                  CloseModal();
                });
              });
            }}
          >
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalEditLinkVideo}
        onHide={CloseModal}
        centered
        className="bg-templant"
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ลิ้งค์วิดีโอ</Form.Label>
            <Form.Control
              type="text"
              value={link}
              onChange={(event) => setLink(event.target.value)}
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
              executeLinkVideoPut({
                url: "/api/linkVideo/" + linkVideoById?.id,
                method: "PUT",
                data: {
                  link: link,
                },
              }).then(() => {
                Promise.all([setLink("")]).then(() => {
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
homeFrontPage.layout = IndexPage;
