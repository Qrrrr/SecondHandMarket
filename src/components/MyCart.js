import { Button, Drawer, List, message, Typography, Space } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart, deleteItemFromCart } from "../utils";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

const MyCart = () => {
  const [open, setOpen] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setLoading(true);
    getCart()
      .then((data) => {
        setCartData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [open]);

  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then((response) => {
        console.log(response);
        message.success("Successfully checkout");
        setOpen(false);
        setSellerData(response);
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
    // setDeleting(true);
    // deleteItemFromCart(itemId)
    //   .then(() => {
    //     message.success("Successfully delete");
    //   })
    //   .catch((err) => {
    //     message.error(err.message);
    //   })
    //   .finally(() => {
    //     setDeleting(false);
    //   });
  };

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
                check out
                <Link to="/home"></Link>
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
            <List.Item>
              <List.Item.Meta
                title={item.post.title}
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
                  <Space>Qty: {item.quantity}</Space>
                </div>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    type="text"
                    onClick={onDeleteItem(item.id)}
                    loading={deleting}
                    icon={<DeleteOutlined />}
                  ></Button>
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
