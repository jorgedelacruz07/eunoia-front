"use client";

import React from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const pathname = usePathname();

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <Image src="/logoInv.svg" alt="Logo" width={50} height={50} />
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
          <Menu.Item key="/">
            Inicio
          </Menu.Item>
          <Menu.Item key="/beneficios">
            Beneficios
          </Menu.Item>
          <Menu.Item key="/tutoria">
            Tutoría
          </Menu.Item>
          <Menu.Item key="/ayuda">
            Ayuda
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64, display: 'flex' }}>
        <div style={{ padding: 24, minHeight: 380, flex: 1 }}>
          <Title>Aprende. Crece. Triunfa.</Title>
          <Paragraph>
            Con tutores comprometidos y herramientas de aprendizaje innovadoras, nuestro sistema de tutorías está aquí para ayudarte a convertir tus metas académicas universitarias en realidad.
          </Paragraph>
          <Button type="primary" size="large" >
            <Link href="/login">
              Ingresar a Eunoia
            </Link>
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Image src="/homeImage.png" alt="Home Image" layout="responsive" width={500} height={500} />
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;