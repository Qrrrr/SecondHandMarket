import React from "react";
import MyCart from "./MyCart";
import { Button, Tooltip, Space, Dropdown} from "antd";
import logo from "../assets/images/logo.svg";
import CreatePostButton from "./CreatePostButton";
import { LogoutOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

function TopBar(props) {
  const { isLoggedIn, handleLogout, handleLoggedIn } = props;
  
  // the following items are the options showing up when move to the icon of the user
  const items = [
    {
      key: '1',
      label: (
        <a href="/home">Profile</a>
      ),
    },

    {
      key: '2',
      label: "Logout",
      onClick: handleLogout,
      
    },
  ];
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
      <CreatePostButton/>
      <MyCart className="myCart"/>

      {/* this following is the code for the dropdown button for user icon */}
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
          placement="bottomLeft">
          <Button 
            shape="circle"
            icon={<UserOutlined />}>
          </Button>
          </Dropdown>
        </Space>
      </Space>
    </header>
  );
}

export default TopBar;


