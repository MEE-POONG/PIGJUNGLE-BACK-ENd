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
import UsersAddModal from '@/container/Users/UsersAddModal'
import UsersDeleteModal from "@/container/Users/UsersDeleteModal";
import UsersEditModal from '@/container/Users/UsersEditModal'
import { format } from "date-fns";

export default function UsersPage() {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [usersType, setUsersType] = useState("");

  console.log(usersType);

  const [{ data: usersData, loading, error }, getUsers] = useAxios({
    url: `/api/users?page=1&pageSize=10&usersTypeId=${usersType}`,
    method: "GET",
  });
 
  useEffect(() => {

    if (loading === false) {
        const getUsersList = async () => {
          await getUsers();
        };
        getUsersList();
    }
  }, [usersType]);

  const [{ data: usersTypeData }, getUsersType] = useAxios({
    url: "../api/usersType",
  });


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
    
      <div className="d-flex align-items-center justify-content-between mb-4">
      <Card.Title className="mb-0">รายชื่อผู้ดูแล</Card.Title>
           
        <Form.Group className="mb-3" controlId="price">
            <Form.Label>ตำแหน่ง</Form.Label>
            <Form.Select>
              <option value="">ตำแหน่ง</option>
              {usersTypeData?.data?.map((usersType, index) => (
                <option key={index} value={usersType.id} onClick={() => {
                  setUsersType(usersType.id);
                }}>
                  {console.log(usersType.id)}
                  {usersType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

        <UsersAddModal getUsersData={getUsers} usersTypeData={usersTypeData?.data} />
        
          </div>
        <MyTable
          data={usersData?.data}
          setNum={usersData?.page * usersData?.pageSize - usersData?.pageSize}
          getUsersData={getUsers}
          usersTypeData={usersTypeData?.data}
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
                <Image
                    src={item.image}
                    width="150px"
                    height="150px"
                    className="object-fit-cover"
                  />
                </td>
                <td>
                  {item.username}
                </td>
                <td>
                  {item.fname} {item.lname}
                </td>
                <td>
                    <Badge bg="danger">{item.UsersType?.name}</Badge>
                </td>
                <td>
                  {item.password}
                </td>
                <td>
                  {/* <UsersConfirmModal value={item} getUsersData={props?.getUsersData} />
                  <UsersDeleteModal value={item} getUsersData={props?.getUsersData} /> */}
                  <UsersEditModal
                    value={item}
                    getData={props?.getData}
                    usersTypeData={props?.usersTypeData}
                  />
                  <UsersDeleteModal
                    value={item}
                    getData={props?.getData}
                    usersTypeData={props?.usersTypeData}
                  />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}
UsersPage.layout = IndexPage;
