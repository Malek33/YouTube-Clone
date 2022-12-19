import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="option">
      <a href="/video/upload">Upload Video</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu