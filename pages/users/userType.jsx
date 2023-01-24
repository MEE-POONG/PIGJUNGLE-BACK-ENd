import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import UsersTypeEditModal from '@/container/UsersType/UsersTypeEditModal'
import UsersTypeDeleteModal from '@/container/UsersType/UsersTypeDeleteModal'
import UsersTypeAddModal from '@/container/UsersType/UsersTypeAddModal'

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
                    <th>ตำแหน่ง</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <UsersTypeEditModal value={item} getData={props?.getData} />
                                <UsersTypeDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function UsersType() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: usersTypeData, loading, error }, getUsersType] = useAxios({ url: `/api/usersType?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (usersTypeData) {
            setParams({
                ...params,
                page: usersTypeData.page,
                pageSize: usersTypeData.pageSize
            });
        }
    }, [usersTypeData]);

    const handleSelectPage = (pageValue) => {
        getUsersType({ url: `/api/usersType?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getUsersType({ url: `/api/usersType?page=1&pageSize=${sizeValue}` })
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
                    <Card.Title className="mb-0">
                        รายการผู้ดูแล
                    </Card.Title>
                    <UsersTypeAddModal getData={getUsersType}/>
                </div>
                <MyTable data={usersTypeData?.data} setNum={(usersTypeData?.page * usersTypeData?.pageSize) - usersTypeData?.pageSize} getData={getUsersType} />
                <MyPagination page={usersTypeData.page} totalPages={usersTypeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
UsersType.layout = IndexPage