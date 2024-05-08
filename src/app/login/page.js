"use client";
import { IconKey, IconUser } from "@tabler/icons-react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  ConfigProvider
} from "antd";
import styles from '../login/styles.module.css';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import { GoogleOAuthProvider } from '@react-oauth/google';
import validaTokenPassword from "@/components/validarTokenPassword";

import React from "react";
import Login from "@/components/bttnGoogle";
import { defaultThemeConfig } from "@/utils/themeConfigs";

const App = () => {
  const onFinish = (values) => {
    debugger
    console.log('Received values of form: ', values);
    const { username, password } = values;
    try {
        // Llamar a la función handleSuccess con el usuario y la contraseña
        debugger
        handleSuccess(username, password);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Manejar caso de error al iniciar sesión
        message.error('Error al iniciar sesión');
    }
  };

  async function handleSuccess(username, password){
        const validado = await validaTokenPassword(username, password);
        if (validado.id != -1) {
          const url = `${validado.path}?id=${validado.id}`;
          window.location.href = url;
        }
        else{
          alert("El usuario no existe");
        }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  

  return (
    <ConfigProvider theme={defaultThemeConfig}>
      <div className={styles["containerPrincipal"]}>
        <div className={styles["containerSecundario"]}>
          <GoogleOAuthProvider clientId="895643509716-4vk4lq1smdd2plqtvpan6ldg83e867ti.apps.googleusercontent.com">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Row justify="center">
                <Col>
                  <Image
                    src={logo}
                    alt="Logo"
                    style={{ width: "200px", height: "60px" }}
                  />
                </Col>
              </Row>
              <Form.Item name="ingreso" className={styles["ingreso"]}>
                <h1 className={styles.labelIngreso}>Ingrese a su cuenta</h1>
              </Form.Item>
              <Form.Item
                label={<strong>Usuario</strong>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Se necesita un usuario",
                  },
                ]}
                labelAlign="top"
              >
                <Input
                  prefix={
                    <IconUser size={20} className="site-form-item-icon" />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                label={<strong>Contraseña</strong>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Se necesita una contraseña",
                  },
                ]}
              >
                <Input
                  prefix={<IconKey size={20} className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="olvidoContrasenha"
                className={styles["forgotPassword"]}
              >
                <a href="https://www.google.com.pe">¿Olvidó su contraseña?</a>
              </Form.Item>
              <Form.Item name="ingreso">
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles["bttn"]}
                >
                  Iniciar sesión
                </Button>
              </Form.Item>
              <div className={styles["bttnLoginGoogle"]}>
                <Login />
              </div>
            </Form>
          </GoogleOAuthProvider>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default App;
