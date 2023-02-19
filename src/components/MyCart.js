import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";
import { ShoppingCartOutlined} from '@ant-design/icons';

const { Text } = Typography;

const MyCart = () => {
  const [open, setOpen] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

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
            <List.Item>
              <List.Item.Meta
                title={item.menuItem.name}
                description={`$${item.price}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;
