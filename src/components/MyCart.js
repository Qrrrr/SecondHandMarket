import {
  Button,
  Drawer,
  Dropdown,
  List,
  message,
  Typography,
  MenuProps,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart, deleteItemFromCart } from "../utils";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const cartData = {
  totalPrice: "10",
  orderItemList: [
    {
      id: "2",
      postal_code: "92111",
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      catagories: "Others",
      description: "This",
      status: "available",
      price: 20,
      email: "abbc@gmail.com",
      quantity: "10",
      title: "nice bike",
    },
    {
      id: "5",
      postal_code: "92117",
      src: "https://www.mensjournal.com/wp-content/uploads/2021/03/miyabi-3.jpg?w=1600&quality=86&strip=all",
      catagories: "Kitchenware",
      description:
        "Japanese knife dsfsdafdsfdsfdsafdsfdsfsdafdsafdsafdsasedfsdfdsfdsfdsfwefwerwerewrwerwerewrewrrrrrrrrrr",
      status: "available",
      price: 15,
      email: "cba@gmail.com",
      quantity: "1",
      title: "display of very very long title",
    },
  ],
};

const MyCart = () => {
  const [open, setOpen] = useState(false);
  //const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  // useEffect(() => {
  //   if (!open) {
  //     return;
  //   }

  //   setLoading(true);
  //   getCart()
  //     .then((data) => {
  //       setCartData(data);
  //     })
  //     .catch((err) => {
  //       message.error(err.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [open]);

  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        message.success("Successfully checkout");
        setOpen(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const onOpenDrawer = () => {
    setOpen(true);
  };

  const onDeleteItem = (itemId) => {
    // setLoading(true);
    // deleteItemFromCart(itemId).then(
    //   getCart()
    //   .then((data) => {
    //     setCartData(data);
    //   })
    //   .catch((err) => {
    //     message.error(err.message);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   })
    // );
  };

  const items = [
    {
      label: "0 (delete)",
      key: "0",
    },
    {
      label: "1",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "2",
      key: "2",
    },
  ];

  return (
    <>
      <Button type="default" shape="circle" onClick={onOpenDrawer}>
        <ShoppingCartOutlined />
      </Button>
      <Drawer
        title="My Shopping Cart"
        placement="right"
        onClose={onCloseDrawer}
        open={open}
        width={400}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
            <div>
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={onCheckOut}
                type="primary"
                loading={checking}
                disabled={loading || cartData?.orderItemList.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.orderItemList}
          renderItem={(item) => (
            // <List.Item>
            //   <List.Item.Meta
            //     // title={item.menuItem.name}
            //     title={
            //       <span title={item.description}>
            //         {item.description.length > 38
            //           ? item.description.substr(0, 38) + "..."
            //           : item.description}
            //       </span>
            //     }
            //     description={`$${item.price}`}
            //   />
            //   <div>Quantity: {item.quantity}</div>
            // </List.Item>
            <List.Item>
              <List.Item.Meta
                // title={item.menuItem.name}
                title={
                  <span title={item.title}>
                    {item.title.length > 20
                      ? item.title.substr(0, 20) + "..."
                      : item.title}
                  </span>
                }
                description={`$${item.price}`}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  rowGap: "5px",
                }}
              >
                <div>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Button type="round" size="small">
                      <Space>
                        {item.quantity}
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <DeleteOutlined onClick={onDeleteItem(item.id)} />
                </div>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;
