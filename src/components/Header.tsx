import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "@reach/router";

const { Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e: any) => setCurrent(e.key);

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/"> Adopt Me!</Link>
      </Item>
    </Menu>
  );
};

export default Header;
