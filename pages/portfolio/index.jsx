import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import PortfolioAddModal from '@/container/Portfolio/PortfolioAddModal'
import PortfolioDeleteModal from '@/container/Portfolio/PortfolioDeleteModal'
import PortfolioEditModal from '@/container/Portfolio/PortfolioEditModal'
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
                    <th>ชื่อผลงาน</th>
                    <th>รายละเอียดผลงาน</th>
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
                                <div dangerouslySetInnerHTML={{ __html: item?.detail}} />
                            </td>
                            <td>
                                <PortfolioEditModal value={item} getData={props?.getData} />
                                <PortfolioDeleteModal value={item} getData={props?.getData} />
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

    const [{ data: portfolioData, loading, error }, getProduct] = useAxios({ url: `/api/Portfolio?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (portfolioData) {
            setParams({
                ...params,
                page: portfolioData.page,
                pageSize: portfolioData.pageSize
            });
        }
    }, [portfolioData]);

    const handleSelectPage = (pageValue) => {
        getProduct({ url: `/api/portfolio?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProduct({ url: `/api/portfolio?page=1&pageSize=${sizeValue}` })
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
                    <PortfolioAddModal getData={getProduct}/>
                </div>
                <MyTable data={portfolioData?.data} setNum={(portfolioData?.page * portfolioData?.pageSize) - portfolioData?.pageSize} getData={getProduct} />
                <MyPagination page={portfolioData.page} totalPages={portfolioData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
ProductPage.layout = IndexPage