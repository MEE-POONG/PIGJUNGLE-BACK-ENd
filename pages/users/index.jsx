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
// // import UsersAddModal from '@/container/Userss/UsersAddModal'
// import UsersDeleteModal from "@/container/Userss/UsersDeleteModal";
// import UsersShowDetailModal from "@/container/Userss/UsersShowDetailModal";
// import UsersConfirmModal from "@/container/Userss/UsersConfirmModal";
// // import UsersEditModal from '@/container/Userss/UsersEditModal'
import { format } from "date-fns";

export default function UsersPage() {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [status, setStatus] = useState("");

  const [{ data: usersData, loading, error }, getUsers] = useAxios({
    url: `/api/users?page=1&pageSize=10`,
    method: "GET",
  });

  useEffect(() => {

    if (loading === false) {
        const getUsersList = async () => {
          await getUsers();
        };
        getUsersList();
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
    getUsers({
      url: `/api/users?page=${pageValue}&pageSize=${params.pageSize}`,
    });
  };
  const handleSelectPageSize = (sizeValue) => {
    getUsers({ url: `/api/users?page=1&pageSize=${sizeValue}` });
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
              <Card.Title className="mb-0">รายชื่อผู้ดูแล</Card.Title>
            </div>
          </Col>
        </Row>

        {/* <UsersAddModal getData={getUsers}/> */}

        <MyTable
          data={usersData?.data}
          setNum={usersData?.page * usersData?.pageSize - usersData?.pageSize}
          getData={getUsers}
        />
        <MyPagination
          page={usersData.page}
          totalPages={usersData.totalPage}
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
    <Table striped bUsersed hover>
      <thead>
        <tr>
          <th>No.</th>
          <th>รูปผู้ใช้</th>
          <th>ชื่อผู้ใช้</th>
          <th>ชื่อ-สกุล</th>
          <th>ตำแหน่ง</th>
          <th>รหัสผ่าน</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 + numberSet}</td>
                <td>
                  {item.username}
                </td>
                <td>
                  {item.firstname} {item.lastname}
                </td>
                {/* {item.status === "รอการตรวจสอบ" ? (
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
                )} */}
                <td>
                  {item.password}
                </td>
                <td>
                  <UsersConfirmModal value={item} getData={props?.getData} />
                  <UsersDeleteModal value={item} getData={props?.getData} />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}
UsersPage.layout = IndexPage;
