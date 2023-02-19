import React from "react";
import MyCart from "./MyCart";
import { Button, Tooltip, Space } from "antd";
import logo from "../assets/images/logo.svg";
import CreatePostButton from "./CreatePostButton";
// import dimage from "../assets/images/dimage.svg"
import { LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

function TopBar(props) {
  const { isLoggedIn, handleLogout, handleLoggedIn } = props;
  return (
    <header className="App-header">
      <Tooltip title="Home">
        <Button shape="circle" icon={<HomeOutlined />} onClick={handleLoggedIn}>
          {/* on click go to the home page, not handling logged in */}
        </Button>
      </Tooltip>
      <div className="App-title">Second Hand Web</div>

      {/*to home page */}

      {/** */}

      {/*to login page*/}
      <Tooltip title="Account">
        <Button
          shape="circle"
          icon={<UserOutlined />}
          onClick={handleLogout}
        ></Button>
      </Tooltip>
      {/** */}
      <CreatePostButton/>
      {/* <MyCart /> */}
    </header>
  );
}

export default TopBar;
