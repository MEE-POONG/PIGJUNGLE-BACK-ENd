import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import SlidesAddModal from '@/container/Slides/SlidesAddModal'
import SlidesDeleteModal from '@/container/Slides/SlidesDeleteModal'


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
                    <th>รูปภาพ</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.image}  width="250px" height="250px" className='object-fit-cover' />
                            </td>
                            <td>
                                
                                <SlidesDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function SlidesPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: slidesData, loading, error }, getSlides] = useAxios({ url: `/api/slides?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (slidesData) {
            setParams({
                ...params,
                page: slidesData.page,
                pageSize: slidesData.pageSize
            });
        }
    }, [slidesData]);

    const handleSelectPage = (pageValue) => {
        getSlides({ url: `/api/slides?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getSlides({ url: `/api/slides?page=1&pageSize=${sizeValue}` })
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
                        จัดการสไลด์
                    </Card.Title>   
                    <SlidesAddModal getData={getSlides}/>
                </div>
                <MyTable data={slidesData?.data} setNum={(slidesData?.page * slidesData?.pageSize) - slidesData?.pageSize} getData={getSlides} />
                <MyPagination page={slidesData.page} totalPages={slidesData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
SlidesPage.layout = IndexPage