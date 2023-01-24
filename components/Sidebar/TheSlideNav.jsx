import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaUsers,
  FaRegKeyboard,
  FaTh,
  FaTachometerAlt,
  FaUserEdit,
  FaLaptop,
  FaRegFileAlt,
  FaRegChartBar,
  FaBars,
  FaFunnelDollar,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Image, Dropdown, Button } from "react-bootstrap";
import { BsFillBagFill } from "react-icons/bs";
import Link from "next/link";

export default function TheSlideNav() {
  const { asPath } = useRouter();
  const [checkClickPath, setCheckClickPath] = useState('/')
  useEffect(() => {
    setCheckClickPath(asPath);
  }, [asPath])

  return <>
    <div className="sidebar pe-4 pb-3 ">
      <nav className="navbar bg-secondary navbar-dark">
        <Link href="/" className="navbar-brand mx-4 mb-3">

          <h3 className="text-primary">
            <FaUserEdit className="fa me-2" />
            PigJungle
          </h3>

        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <Image
              className="rounded-circle"
              src={"./images/profile.jpg"}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success roundedborder border-2 border-white position-absolute end-0 bottom-0 p-1" />
          </div>
          <div className="ms-3">
            <h6 className="mb-0">กัญชาหมูป่า</h6>
            <span>Admin</span>
          </div>  
        </div>
        <div className="navbar-nav w-100">
          <Link
            href="/"
            className={asPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>

            <i className="me-2">
              <FaTachometerAlt />
            </i>Home
          </Link>
          <Dropdown.Toggle onClick={() => { setCheckClickPath('/homeFront') }} className={checkClickPath === "/homeFront" ||  checkClickPath === "/homeFront/slid" || checkClickPath === "/homeFront/howToOrder" || checkClickPath === "/Contact" || checkClickPath === "/homeFront/popup" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการหน้าเว็บ
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/homeFront" || checkClickPath === "/homeFront/slides" || checkClickPath === "/homeFront/howToOrder" || checkClickPath === "/Contact" || checkClickPath === "/homeFront/popup"}>
            <Link
              id="buttons"
              href="/homeFront"
              className={asPath === "/homeFront" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                หน้าหลัก
              
            </Link>
            <Link
              id="buttons"
              href="//homeFront/slides"
              className={asPath === "/homeFront/slides" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                หน้าสไลด์รูปภาพ
              
            </Link>
            <Link
              id="buttons"
              href="//homeFront/howToOrder"
              className={asPath === "/homeFront/howToOrder" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                หน้าวิธีการสั่งซื้อ
              
            </Link>
            <Link
              id="buttons"
              href="/Contact"
              className={asPath === "/Contact" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                หน้าติดต่อเรา
              
            </Link>
            <Link
              id="buttons"
              href="//homeFront/popup"
              className={asPath === "/homeFront/popup" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                หน้าโฆษณา
              
            </Link>
          </Dropdown.Menu>

          <Dropdown.Toggle onClick={() => { setCheckClickPath('/products') }} className={checkClickPath === "/products" || checkClickPath === "/products/type" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการสินค้า
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/products" || checkClickPath === "/products/type"}>
            <Link
              id="buttons"
              href="/products"
              className={asPath === "/products" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                สินค้า
              
            </Link>
            <Link
              id="buttons"
              href="/products/type"
              className={asPath === "/products/type" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              ประเภทสินค้า
              
            </Link>
          </Dropdown.Menu>

          <Dropdown.Toggle onClick={() => { setCheckClickPath('/orders') }} className={checkClickPath === "/orders" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการคำสั่งซื้อ
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/orders" }>
            <Link
              id="buttons"
              href="/orders"
              className={asPath === "/orders" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              คำสั่งซื้อ
              
            </Link>
          </Dropdown.Menu>

          <Dropdown.Toggle onClick={() => { setCheckClickPath('/users') }} className={checkClickPath === "/users" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการผู้ดูแล
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/users" }>
            <Link
              id="buttons"
              href="/users"
              className={asPath === "/users" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              รายชื่อผู้ดูแล
              
            </Link>
          </Dropdown.Menu>




        </div>
      </nav>
    </div>
  </>;
}
export function ButtonSlideNav() {
  const [slideOpen, setSlideOpen] = React.useState("");
  return (
    <Button
      bsPrefix="sidebar-toggler  bar-slide"
      onClick={() => setSlideOpen(slideOpen == "close" ? "open" : "close")}
    >
      <FaBars />
    </Button>
  );
}
