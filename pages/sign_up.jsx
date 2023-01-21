/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import Head from 'next/head';
import BackGroundMain from "@/components/Bg/BackGroundMain";
import { Image } from 'react-bootstrap';

export default function SignUpUserPages() {
    return (
        <>
            <Head>
                <title>PigJungle</title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/images/logo.png" />
            </Head>

            <BackGroundMain />

            <div id='sign-user' name="sign-user" className='sign-user'>

                <div className="topnav">

                    <a className='btunav' type='SignIn' href="/">กลับ</a>

                    <a className='btunav' type='SignIn' href="/sign_in">เข้าสู่ระบบ</a>


                </div>

                <div className="box-Container-Su">

                <div className="box-img">
                            <Image src={'images/moke02.png'} width={'50%'} />
                        </div>

                        <div className='Container-Su'>
                            <Image src={'images/profile.jpg'} className='img-Si-Su' />
                        <form>

                            <input className='input-Si-Su' type="text" id="UserName" name="UserName" placeholder="UserName" />

                            {/* <input className='input-Si-Su' type="text" id="Email" name="Email" placeholder="Email" /> */}

                            <input className='input-Si-Su' type="password" id="Password" name="Password" placeholder="Password" />

                            <input className='input-Si-Su' type="password" id="ConfirmPassword" name="ConfirmPassword" placeholder="ConfirmPassword" />
                        </form>
                        <div className="box-btu-Si-Su">
                            <a className="btu-Si-Su-Ad" type='sign-up' href="/address_user">เพิ่มผู้ดูแล</a>
                        </div>
                    </div>

                    <div className="box-img">
                        <Image src={'images/moke03.png'} width={'50%'} />
                    </div>

                </div>
            </div>
        </>
    );
}