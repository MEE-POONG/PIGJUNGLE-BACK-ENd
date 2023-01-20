import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import PopupAddModal from '@/container/Popup/PopupAddModal'
// import PopupDeleteModal from '@/container/Popup/PopupDeleteModal'
import PopupEditModal from '@/container/Popup/PopupEditModal'

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
                    <th>รูปภาพ</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.image}  width="100px" height="100px" className='object-fit-cover' />
                            </td>
                            <td>
                                <PopupEditModal value={item} getData={props?.getData} />
                                {/* <PopupDeleteModal value={item} getData={props?.getData} /> */}
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function PopupPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: popupData, loading, error }, getPopup] = useAxios({ url: `/api/popup?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (popupData) {
            setParams({
                ...params,
                page: popupData.page,
                pageSize: popupData.pageSize
            });
        }
    }, [popupData]);

    const handleSelectPage = (pageValue) => {
        getPopup({ url: `/api/popup?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getPopup({ url: `/api/popup?page=1&pageSize=${sizeValue}` })
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
                        จัดการวิธีการใช้
                    </Card.Title>   
                    <PopupAddModal getData={getPopup}/>
                </div>
                <MyTable data={popupData?.data} setNum={(popupData?.page * popupData?.pageSize) - popupData?.pageSize} getData={getPopup} />
                <MyPagination page={popupData.page} totalPages={popupData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
PopupPage.layout = IndexPage