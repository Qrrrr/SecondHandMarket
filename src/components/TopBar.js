import React from "react";
import MyCart from "./MyCart";
import { Button, Tooltip, Space } from "antd";
import logo from "../assets/images/logo.svg";
import CreatePostButton from "./CreatePostButton";
import { LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function TopBar(props) {
  const { isLoggedIn, handleLogout, handleLoggedIn } = props;
  const history = useHistory();

  return (
    <header className="App-header">
      <Tooltip title="Home">
        <Button
          shape="circle"
          icon={<HomeOutlined />}
          // onClick={handleLoggedIn}
          onClick={() => {
            history.push("/home");
          }}
        >
          {/* on click go to the home page, not handling logged in */}
        </Button>
      </Tooltip>
      <div className="App-title">
        <a href="/home">Second Hand Web</a>
      </div>

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
      <CreatePostButton />
      <MyCart />
    </header>
  );
}

export default TopBar;
