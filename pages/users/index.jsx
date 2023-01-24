import React, { useEffect, useState } from "react";
import IndexPage from "components/layouts/IndexPage";
import {
  Container,
  Modal,
  Card,
  Button,
  Form,
  Image,
  InputGroup,
  Row,
  Col,
  Table,
  Pagination,
  Badge,
} from "react-bootstrap";
import MyPagination from "@/components/Pagination";
import useAxios from "axios-hooks";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
// import OrderAddModal from '@/container/Orders/OrderAddModal'
import OrderDeleteModal from "@/container/Orders/OrderDeleteModal";
import OrderShowDetailModal from "@/container/Orders/OrderShowDetailModal";
import OrderConfirmModal from "@/container/Orders/OrderConfirmModal";
// import OrderEditModal from '@/container/Orders/OrderEditModal'
import { format } from "date-fns";

export default function UsersPage() {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [status, setStatus] = useState("");

  const [{ data: usersData, loading, error }, getUsers] = useAxios({
    url: `/api/users?page=1&pageSize=10&status=${status}`,
    method: "GET",
  });

  useEffect(() => {

    if (loading === false) {
        const getUsers = async () => {
          await getUsers();
        };
        getUsers();
    }
  }, [status]);



  useEffect(() => {
    if (usersData) {
      setParams({
        ...params,
        page: usersData.page,
        pageSize: usersData.pageSize,
      });
    }
  }, [usersData]);

  const handleSelectPage = (pageValue) => {
    getProduct({
      url: `/api/users?page=${pageValue}&pageSize=${params.pageSize}`,
    });
  };
  const handleSelectPageSize = (sizeValue) => {
    getProduct({ url: `/api/users?page=1&pageSize=${sizeValue}` });
  };

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <Container fluid className="pt-4 px-4">
      <Card className="bg-secondary text-center rounded shadow p-4">
        <Row>
          <Col>
            <div className="d-flex align-items-center mb-4">
              <Card.Title className="mb-0">รายการสินค้า</Card.Title>
            </div>
          </Col>

          <Col>
            <Button
              variant="danger"
              className=" mx-2 "
              onClick={() => {
                setStatus("แอดมิน");
              }}
            >
              แอดมิน
            </Button>
            <Button
              variant="warning"
              className="mx-2"
              onClick={() => {
                setStatus("พนักงานร้าน");
              }}
            >
              พนักงานร้าน
            </Button>
          </Col>
        </Row>

        {/* <OrderAddModal getData={getProduct}/> */}

        <MyTable
          data={orderData?.data}
          setNum={orderData?.page * orderData?.pageSize - orderData?.pageSize}
          getData={getProduct}
        />
        <MyPagination
          page={orderData.page}
          totalPages={orderData.totalPage}
          onChangePage={handleSelectPage}
          pageSize={params.pageSize}
          onChangePageSize={handleSelectPageSize}
        />
      </Card>
    </Container>
  );
}
function MyTable(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);
  useEffect(() => {
    setCurrentItems(currentItems);
    console.log(props);
  }, [props]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No.</th>
          <th>ชื่อผู้ใช้</th>
          <th>ชื่อผู้ใช้ในระบบ</th>
          <th>รหัสผ่าน</th>
          <th>สถานะ</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {item.firstname} {item.lastname}
                </td>
                <td>
                  <OrderShowDetailModal value={item} getData={props?.getData} />
                </td>
                <td>
                  {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </td>
                {item.status === "รอการตรวจสอบ" ? (
                  <td>
                    <Badge bg="danger">{item.status}</Badge>
                  </td>
                ) : item.status === "กำลังดำเนินการ" ? (
                  <td>
                    <Badge bg="warning">{item.status}</Badge>
                  </td>
                ) : (
                  <td>
                    <Badge bg="success">{item.status}</Badge>
                  </td>
                )}

                <td>
                  <OrderConfirmModal value={item} getData={props?.getData} />
                  <OrderDeleteModal value={item} getData={props?.getData} />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}
UsersPage.layout = IndexPage;
