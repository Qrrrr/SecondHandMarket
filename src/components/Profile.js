import React from 'react';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { List, Card, Row, Col, Typography } from 'antd';
import {useEffect, useState} from 'react';

const data = [
    {
      title: 'Title 1',
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "AJ1",
      description: "This",
    },
    {
      title: 'Title 2',
      src: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      name: "AJ2",
      description: "This is the description2 and this description can be longggggggggggggggg"  
    },
    {
      title: 'Title 3',
      src: 'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
      name: "AJ2",
      description: "This is the description3"
    },
    {
      title: 'Title 4',
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "AJ2",
      description: "This is the description4"
    },
    {
      title: 'Title 5',
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "AJ2",
      description: "This is the description5"
    },
    {
      title: 'Title 6',
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "AJ2",
      description: "This is the description6"
    },
    {
        title: 'Title 7',
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        name: "AJ2",
        description: "This is the description7"
      },
    {
        title: 'Title 8',
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        name: "AJ2",
        description: "This is the description8"
    },
      {
        title: 'Title 9',
        src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        name: "AJ2",
        description: "This is the description9"
      },
  ];

function Profile(props) {
  const [posts, setPost] = useState([]);

    return (
        <div className='profile'>  
            <List
                grid={{column: 4, gutter: 16}}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            title={item.name}
                            cover={
                                <img 
                                    className="postImage"
                                    alt="example"
                                    src={item.src}
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]} 
                            >
                              <Card.Meta 
                                title={<Typography.Paragraph>Price: ${item.price}</Typography.Paragraph>}
                                // description={<Typography.Paragraph ellipsis={{rows:1, expandable:true, symbol:"more"}}>{item.description}</Typography.Paragraph>}
                              ></Card.Meta>
                                                                        
                        </Card>
                    </List.Item>
                    
                )}
            />
        </div>

        
    )
}
export default Profile;