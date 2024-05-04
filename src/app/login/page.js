"use client";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Row,Col } from 'antd';
import styles from '@/app/login/styles.module.css';
import logo from '../../../public/logo.svg';
import Image from 'next/image';


import React from 'react';
const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className={styles["container"]} >
        <Form
        layout='vertical'
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
        <Row justify="center">
            <Col>
            <Image src={logo} alt="Logo" style={{ width: '200px', height: '80px' }} />
            </Col>
        </Row>
        <Form.Item name="ingreso" className={styles['ingreso']} >
            <h1 className={styles.labelIngreso}>Ingrese a su cuenta</h1>
        </Form.Item>
        <Form.Item
            label="Usuario"
            name="username"
            rules={[
            {
                required: true,
                message: 'Se necesita un usuario',
            },
            ]}
            labelAlign='top' 
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            label="Contraseña"
            name="password"
            rules={[
            {
                required: true,
                message: 'Se necesita una contraseña',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        <Form.Item name="olvidoContrasenha" className={styles['forgotPassword']}>
            <a href="https://www.google.com.pe">¿Olvidó su contraseña?</a>
        </Form.Item>

        <Form.Item name="ingreso" className={styles['boton']} >
            <Button className={styles.bttn}>Iniciar sesión</Button>
        </Form.Item>
        </Form>
    </div>
  );
};
export default App;