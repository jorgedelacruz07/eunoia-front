"use client";

import React from "react";
import { Layout, Menu, Button, Typography, ConfigProvider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./landing.css";
import "@fontsource-variable/nunito";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  const pathname = usePathname();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Nunito",
          fontWeightStrong: 700,
        },
        components: {
          Layout: {
            headerBg: "#0777E3",
            headerHeight: "64px",
          },
          Menu: {
            darkItemBg: "#0777E3",
            darkItemSelectedBg: "#0777E3",
            itemMarginInline: "3",
          },
        },
      }}
    >
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            className="logo-header"
            src="/logoInv.svg"
            alt="Eunoia Logo"
            style={{ height: 64 }}
          />
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/">Inicio</Menu.Item>
            <Menu.Item key="/beneficios">Beneficios</Menu.Item>
            <Menu.Item key="/tutoria">Tutoría</Menu.Item>
            <Menu.Item key="/ayuda">Ayuda</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64, display: "flex" }}>
          <div style={{ padding: 24, minHeight: 380, flex: 1 }}>
            <Title>Aprende. Crece. Triunfa.</Title>
            <Paragraph>
              Con tutores comprometidos y herramientas de aprendizaje
              innovadoras, nuestro sistema de tutorías está aquí para ayudarte a
              convertir tus metas académicas universitarias en realidad.
            </Paragraph>
            <Button type="primary" size="large">
              <Link href="/login">Ingresar a Eunoia</Link>
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Image
              src="/homeImage.png"
              alt="Home Image"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
