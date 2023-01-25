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
import ProductsAddModal from "@/container/Products/ProductsAddModal";
import ProductsDeleteModal from "@/container/Products/ProductsDeleteModal";
import ProductsEditModal from "@/container/Products/ProductsEditModal";
function MyTable(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);

  useEffect(() => {
    setCurrentItems(currentItems);
  }, [props]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No.</th>
          <th>ภาพ</th>
          <th>ชื่อสินค้า</th>
          <th>ประเภทสินค้า</th>
          <th>ราคา</th>
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
                <td>{item.name}</td>
                <td>
                  <Badge bg="primary">{item.productType?.name}</Badge>
                </td>
                <td>{item.price} บาท</td>
                <td>
                  <ProductsEditModal
                    value={item}
                    getData={props?.getData}
                    productTypeData={props.productTypeData}
                  />
                  <ProductsDeleteModal
                    value={item}
                    getData={props?.getData}
                    productTypeData={props.productTypeData}
                  />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}

export default function ProductPage() {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });
  const [name, setName] = useState("");
  const [{ data: productsData, loading, error }, getProduct] = useAxios({
    url: `/api/products?page=1&pageSize=10&name=${name}`,
    method: "GET",
  },{manual:true});
  useEffect(() => {
    if (productsData) {
      setParams({
        ...params,
        page: productsData.page,
        pageSize: productsData.pageSize,
      });
    }
  }, [productsData]);

  useEffect(() => {
    if (loading === false) {
      const Product = async () => {
        await getProduct();
      };
      Product();
    }
  }, []);

  const [{ data: productTypeData }, getProductsType] = useAxios({
    url: "/api/productType?",
  });

  const handleSelectPage = (pageValue) => {
    getProduct({
      url: `/api/products?page=${pageValue}&pageSize=${params.pageSize}`,
    });
  };
  const handleSelectPageSize = (sizeValue) => {
    getProduct({ url: `/api/products?page=1&pageSize=${sizeValue}` });
  };

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  if (!productsData || !productTypeData) {
    return <PageLoading />;
  }
  return (
    <Container fluid className="pt-4 px-4">
      <Card className="bg-secondary text-center rounded shadow p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Card.Title className="mb-0">รายการสินค้า</Card.Title>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>ค้นหาสินค้า</Form.Label>
            <form className="d-none d-md-flex ms-4">
              <input
                className="form-control bg-dark border-0"
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button onClick={() => getProduct}>ค้นหา</button>
            </form>
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>ประเภทสินค้า</Form.Label>
            <Form.Select>
              <option value="">ประเภทสินค้า</option>
              {productTypeData?.data?.map((productType, index) => (
                <option key={index} value={productType.id}>
                  {productType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <ProductsAddModal getData={productsData} productTypeData={productTypeData} />
        </div>
        <MyTable
          data={productsData?.data}
          setNum={
            productsData?.page * productsData?.pageSize - productsData?.pageSize
          }
          getData={getProduct}
          productTypeData={productTypeData.data}
        />
        <MyPagination
          page={productsData?.page}
          totalPages={productsData?.totalPage}
          onChangePage={handleSelectPage}
          pageSize={params.pageSize}
          onChangePageSize={handleSelectPageSize}
        />
      </Card>
    </Container>
  );
}
ProductPage.layout = IndexPage;
