import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import howToOrderAddModal from '@/container/howToOrder/howToOrderAddModal'
import howToOrderDeleteModal from '@/container/howToOrder/howToOrderDeleteModal'
import howToOrderEditModal from '@/container/howToOrder/howToOrderEditModal'
function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.data);
    const [numberSet, setNumberSet] = useState(props?.setNum);
    const [typeId] = useState(props?.dataType);
    console.log(typeId);
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
                    item.productType?.name === "กัญชา" ?(
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
                                <howToOrderEditModal value={item} getData={props?.getData} />
                                <howToOrderDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    ):("")
                     
                        
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

    const [{ data: howToOrderData, loading, error }, getProduct] = useAxios({ url: `/api/howToOrder?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (howToOrderData) {
            setParams({
                ...params,
                page: howToOrderData.page,
                pageSize: howToOrderData.pageSize
            });
        }
    }, [howToOrderData]);

    const [{ data: productTypeData }, gethowToOrderType] = useAxios({ url: '../api/productType?' })
    const [typeId, setTypeId] = useState("");
   

    const handleSelectPage = (pageValue) => {
        getProduct({ url: `/api/howToOrder?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProduct({ url: `/api/howToOrder?page=1&pageSize=${sizeValue}` })
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
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>ประเภทสินค้า</Form.Label>
                            <Form.Select 
                            onChange={(e) => { setTypeId(e.target.value) }}
                            value={typeId} >
                             <option value="">ประเภทสินค้า</option>
                            {productTypeData.data?.map((productType, index) => (
                             <option key={index} value={productType.id}>{productType.name}</option>
                            ))} 

                            </Form.Select>
                    </Form.Group>
                    <howToOrderAddModal getData={getProduct}/>

                 
                    
                </div>
                <MyTable data={howToOrderData?.data} dataType={typeId} setNum={(howToOrderData?.page * howToOrderData?.pageSize) - howToOrderData?.pageSize} getData={getProduct} />
                <MyPagination page={howToOrderData.page} totalPages={howToOrderData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
ProductPage.layout = IndexPage