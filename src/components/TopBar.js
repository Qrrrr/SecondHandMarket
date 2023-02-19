import React from 'react';
import {Button, Tooltip, Space} from 'antd';
import logo from "../assets/images/logo.svg";
import dimage from "../assets/images/dimage.svg"
import { LogoutOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';

function TopBar(props) {
    const { isLoggedIn, handleLogout, handleLoggedIn } = props;
    return (
        <header className="App-header">
            {/*to home page */}
            <Tooltip title="Home">
                <Button shape="circle" icon={<HomeOutlined/>} onClick={handleLoggedIn}>
                </Button> 
            </Tooltip>
            {/** */}

            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-title">Second Hand Web</div>

            {/*to login page*/}
            <Tooltip title="Account">
                <Button shape="circle" icon={<UserOutlined />} onClick={handleLogout}>
                </Button>
            </Tooltip>
            {/** */}
        </header>
    );
}

export default TopBar;