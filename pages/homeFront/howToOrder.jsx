import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import HowToOrderEditModal from '@/container/HowToOrder/HowToOrderEditModal'

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
        <Table striped bordered hover element>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>รูปภาพ</th>
                    <th>หัวข้อ</th>
                    <th>เนื้อหา</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.image}  width="100px" height="100px" className='object-fit-cover' />
                            </td>
                            <th>
                                {item.title}
                            </th>
                            <th>
                            <div dangerouslySetInnerHTML={{ __html: item?.detail}} />
                            </th>
                            <td>
                                <HowToOrderEditModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function HowToOrderPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: howToOrderData, loading, error }, getHowToOrder] = useAxios({ url: `/api/howToOrder?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (howToOrderData) {
            setParams({
                ...params,
                page: howToOrderData.page,
                pageSize: howToOrderData.pageSize
            });
        }
    }, [howToOrderData]);

    const handleSelectPage = (pageValue) => {
        getHowToOrder({ url: `/api/howToOrder?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getHowToOrder({ url: `/api/howToOrder?page=1&pageSize=${sizeValue}` })
    };

    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4 px-4 element">
            <Card className="bg-secondary text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        จัดการวิธีการใช้
                    </Card.Title>   
                    {/* <HowToOrderAddModal getData={getHowToOrder}/> */}
                </div>
                <MyTable data={howToOrderData?.data} setNum={(howToOrderData?.page * howToOrderData?.pageSize) - howToOrderData?.pageSize} getData={getHowToOrder} />
                {/* <MyPagination page={howToOrderData.page} totalPages={howToOrderData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} /> */}
            </Card >
        </Container >
    );
}
HowToOrderPage.layout = IndexPage