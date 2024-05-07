"use client";

import React from "react";
import {
  Flex,
  Button,
  Dropdown,
  Layout,
  Space,
  Avatar,
  ConfigProvider,
} from "antd";
import SiderList from "./SiderList";
import { IconBell, IconPower, IconUser } from "@tabler/icons-react";
import { defaultThemeConfig } from "@/utils/themeConfigs";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  height: 72,
  backgroundColor: "#4096ff",
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#F2F8FD",
  padding: "20px",
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  minHeight: "100vh",
};

const items = [
  {
    key: "1",
    label: <a>Perfil</a>,
    icon: <IconUser size={20} />,
  },
  {
    key: "2",
    label: <a>Cerrar sesión</a>,
    icon: <IconPower size={20} />,
  },
];

const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};
const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const LayoutComponent = ({ siderItems, children, showFooter = false }) => (
  <ConfigProvider theme={defaultThemeConfig}>
    <Layout style={layoutStyle}>
      <Sider width="250px" style={siderStyle}>
        <SiderList items={siderItems} />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Flex
            gap="middle"
            align="center"
            justify="flex-end"
            style={{ height: "100%" }}
          >
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                size="large"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  color: "#111",
                }}
              >
                AA
              </Avatar>
            </Dropdown>
            <Button size="large" shape="circle" icon={<IconBell />} />
          </Flex>
        </Header>
        <Content style={contentStyle}>{children}</Content>
        {showFooter && <Footer style={footerStyle}>Footer</Footer>}
      </Layout>
    </Layout>
  </ConfigProvider>
);
export default LayoutComponent;
