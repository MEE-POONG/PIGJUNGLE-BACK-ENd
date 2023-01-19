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

  return (
    <>
      <div className="sidebar pe-4 pb-3 ">
        <nav className="navbar bg-secondary navbar-dark">
          <Link href="/">
            <a className="navbar-brand mx-4 mb-3" >
              <h3 className="text-primary">
                <FaUserEdit className="fa me-2" />
                PigJungle
              </h3>
            </a>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <Image
                className="rounded-circle"
                src={"./images/user.jpg"}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success roundedborder border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Jhon Doe</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link href="/">
              <a className={asPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>
                <i className="me-2">
                  <FaTachometerAlt />
                </i>
                Home
              </a>
            </Link>
            <Dropdown.Toggle onClick={() => { setCheckClickPath('/homeFront') }} className={checkClickPath === "/homeFront" ||  checkClickPath === "/homeFront/slid" || checkClickPath === "/homeFront/howToOrder" || checkClickPath === "/Contact" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
              <i className="me-2">
                <BsFillBagFill />
              </i>
              จัดการหน้าเว็บ
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/homeFront" || checkClickPath === "/homeFront/slid" || checkClickPath === "/homeFront/howToOrder" || checkClickPath === "/Contact"}>
              <Link id="buttons" href="/homeFront">
                <a className={asPath === "/homeFront" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  หน้าหลัก
                </a>
              </Link>
              <Link id="buttons" href="//homeFront/slid">
                <a className={asPath === "//homeFront/slid" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  หน้าสไลด์รูปภาพ
                </a>
              </Link>
              <Link id="buttons" href="//homeFront/howToOrder">
                <a className={asPath === "//homeFront/howToOrder" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  หน้าวิธีการสั่งซื้อ
                </a>
              </Link>
              <Link id="buttons" href="/Contact">
                <a className={asPath === "/Contact" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  หน้าติดต่อเรา
                </a>
              </Link>
            </Dropdown.Menu>

            <Dropdown.Toggle onClick={() => { setCheckClickPath('/products') }} className={checkClickPath === "/products" || checkClickPath === "/products/type" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
              <i className="me-2">
                <BsFillBagFill />
              </i>
              จัดการสินค้า
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/products" || checkClickPath === "/products/type"}>
              <Link id="buttons" href="/products">
                <a className={asPath === "/products" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  สินค้า
                </a>
              </Link>
              <Link id="buttons" href="/products/type">
                <a className={asPath === "/products/type" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                ประเภทสินค้า
                </a>
              </Link>
            </Dropdown.Menu>

            <Dropdown.Toggle onClick={() => { setCheckClickPath('/orders') }} className={checkClickPath === "/orders" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
              <i className="me-2">
                <BsFillBagFill />
              </i>
              จัดการคำสั่งซื้อ
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/orders" }>
              <Link id="buttons" href="/orders">
                <a className={asPath === "/orders" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                คำสั่งซื้อ
                </a>
              </Link>
            </Dropdown.Menu>




          </div>
        </nav>
      </div>
    </>
  );
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
