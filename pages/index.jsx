import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import { Card, Table } from 'react-bootstrap';
import Warn from 'container/home/warn';
import RecentSalse from '@/container/Dashboard/RecentSalse';
import NewListing from '@/container/Dashboard/NewListing';
export default function HomePage() {
  const contactData = [
    { id: '1', title: 'a', detail: 'แก้ฟิล title จาก มองบน เป็น มองบนฟ้าแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa', firstname: 'งง', lastname: 'งง', customerId: '1', contactID: '1', audienceRecordID: '', newsId: '', aboutID: '' },
    { id: '1', title: 'b', detail: 'แก้ฟิล price จาก 950 เป็น 99แก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa9', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '1', newsId: '', aboutID: '' },
    { id: '1', title: 'b', detail: 'แก้ฟิล price จาก 950 เป็น 99แก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa9', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '1', newsId: '', aboutID: '' },
    { id: '1', title: 'c', detail: 'แก้ฟิล facebookแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa จาก facebook.com/api เป็น facebook.com/ipa', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '', newsId: '', aboutID: '1' },
    { id: '1', title: 'c', detail: 'แก้ฟิล facebookแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa จาก facebook.com/api เป็น facebook.com/ipa', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '', newsId: '', aboutID: '1' },
    { id: '1', title: 'c', detail: 'แก้ฟิล facebookแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa จาก facebook.com/api เป็น facebook.com/ipa', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '', newsId: '', aboutID: '1' },
  ]
  const warnCheckEditLogData = [
    { id: '1', title: 'a', tagLink: 'news', detail: 'แก้ฟิล title จาก มองบน เป็น มองบนฟ้า', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '1', packagePriceId: '', newsId: '', aboutID: '' },
    { id: '1', title: 'a', tagLink: 'about', detail: 'แก้ฟิล price จาก 950 เป็น 9999999999999999999999แก้ฟิล price จาก 950 เป็น 999999999999999999999999999', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '1', newsId: '', aboutID: '' },
    { id: '1', title: 'a', tagLink: 'customer', detail: 'แก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa แก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipaแก้ฟิล facebook จาก facebook.com/api เป็น facebook.com/ipa', firstname: 'งง', lastname: 'งง', customerId: '1', workingsId: '', packagePriceId: '', newsId: '', aboutID: '1' },
  ]
  const warnAudienceRecordData = [
    { id: '1', title: 'ผู้เข้าชมเว็บประจำวัน 1 ม.ค. 2566', detail: '185' },
    { id: '1', title: 'ผู้เข้าชมเว็บประจำเดือน ม.ค. 2566', detail: '185' },
    { id: '1', title: 'ผู้เข้าชมเว็บประจำปี 2566', detail: '185' },
  ]
  return (
    < >
    <Head>
        <title>PIG JUNGLE</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/profile.jpg" />
      </Head>

      <div className='home-page'>
        {/* <div>
          <RecentSalse/>
          <NewListing/>
        </div> */}
        <Warn contactData={contactData} checkEditLogData={warnCheckEditLogData} audienceRecordData={warnAudienceRecordData} />
      </div>
    </ >
  );
}
HomePage.layout = IndexPage;