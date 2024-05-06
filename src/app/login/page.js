"use client";
import { IconKey, IconUser } from "@tabler/icons-react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Col,
  ConfigProvider,
  Layout,
} from "antd";
import styles from "../login/styles.module.css";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";
import Login from "@/components/bttnGoogle";
import { defaultThemeConfig } from "@/utils/themeConfigs";

const App = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
                    style={{ width: "200px", height: "80px" }}
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
