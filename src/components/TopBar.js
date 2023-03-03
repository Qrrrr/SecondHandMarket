import React from "react";
import MyCart from "./MyCart";
import { Link, useHistory } from "react-router-dom";
import { Button, Tooltip, Space, Dropdown } from "antd";
import CreatePostButton from "./CreatePostButton";
import { UserOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";

function TopBar(props) {
  const { isLoggedIn, handleLogout, handleLoggedIn } = props;
  const history = useHistory();

  // the following items are the options showing up when move to the icon of the user
  const items = [
    {
      key: "1",
      label: (
        <>
          <Link to="/profile">Profile</Link>
        </>
      ),
    },

    {
      key: "2",
      label: "Logout",
      onClick: handleLogout,
    },
  ];
  return (
    <header className="App-header">
      <div className="App-title">
        <Link
          to="/home"
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "black",
            fontFamily: "Lobster, cursive",
          }}
        >
          Second Hand Web
        </Link>
      </div>

      <Button
        className="mail-btn"
        shape="circle"
        size="large"
        onClick={() => {
          history.push("/ChatRoom/public");
        }}
        icon={<MailOutlined />}
      ></Button>
      {isLoggedIn ? <CreatePostButton /> : null}
      {isLoggedIn ? <MyCart /> : null}

      {/* this following is the code for the dropdown button for user icon */}
      {isLoggedIn ? (
        <Space direction="vertical">
          <Space wrap>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <Button
                shape="circle"
                className="user-btn"
                size="large"
                icon={<UserOutlined />}
              ></Button>
            </Dropdown>
          </Space>
        </Space>
      ) : null}
    </header>
  );
}

export default TopBar;
