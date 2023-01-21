import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container-fluid pt-4 px-4 element">
          <div className="bg-secondary rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; <a href="https://pig-jungle.com/">Pig Jungle</a>, All Right Reserved.
              </div>
              <div className="col-12 col-sm-6 text-center text-sm-end">
                Designed By <a href="https://www.meepoong.com/?fbclid=IwAR2Xk_uNgi5GuJ758qZt00YYtLTKH6TNxpvTV6_xPrGhcgNm157FkX1JXl4">ME PROMT TECHNOLOGY Co.,Ltd.</a>{' '}{' '}
                {/* Distributed By: <a href="https://www.meepoong.com/?fbclid=IwAR2Xk_uNgi5GuJ758qZt00YYtLTKH6TNxpvTV6_xPrGhcgNm157FkX1JXl4" target="_blank">ThemeWagon</a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
