import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
// import OrderAddModal from '@/container/Order/OrderAddModal'
// import OrderDeleteModal from '@/container/Order/OrderDeleteModal'
// import OrderShowDetailModal  from '@/container/Order/OrderShowDetailModal'
// import OrderEditModal from '@/container/Order/OrderEditModal'
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
                    <th>ภาพ</th>
                    <th>ชื่อสินค่า</th>
                    <th>ประเภทสินค้า</th>
                    <th>ราคา</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.image}  width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <Badge bg="primary">
                                    {item.productType?.name}
                                </Badge>
                            </td>
                            <td>
                                {item.price}{' '}บาท
                            </td>
                            <td>
                                {/* <OrderEditModal value={item} getData={props?.getData} />
                                <OrderShowDetailModal value={item} getData={props?.getData} />
                                <OrderDeleteModal value={item} getData={props?.getData} /> */}
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function ProductPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: orderData, loading, error }, getProduct] = useAxios({ url: `/api/order?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (orderData) {
            setParams({
                ...params,
                page: orderData.page,
                pageSize: orderData.pageSize
            });
        }
    }, [orderData]);

    const handleSelectPage = (pageValue) => {
        getProduct({ url: `/api/order?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProduct({ url: `/api/order?page=1&pageSize=${sizeValue}` })
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
                        รายการสินค้า
                    </Card.Title>
                    {/* <OrderAddModal getData={getProduct}/> */}
                </div>
                <MyTable data={OrderData?.data} setNum={(OrderData?.page * OrderData?.pageSize) - OrderData?.pageSize} getData={getProduct} />
                <MyPagination page={OrderData.page} totalPages={OrderData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
ProductPage.layout = IndexPage