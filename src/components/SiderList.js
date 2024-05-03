"use client";

import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Usuarios", "1", <UserOutlined />),
  getItem("Tipos de Tutoría", "2", <AppstoreOutlined />),
  getItem("Asignación Individual Tipo de Tutoría", "3", <AppstoreOutlined />),
  getItem("Asignación Masiva Tipo de Tutoría", "4", <AppstoreOutlined />),
  getItem("Asignar Tutor", "5", <AppstoreOutlined />),
  getItem("Registro de Usuarios", "6", <AppstoreOutlined />),
  getItem("Unidades de Apoyo", "7", <AppstoreOutlined />),
  getItem("Agregar Documentos", "8", <AppstoreOutlined />),
  getItem("Reportes", "9", <AppstoreOutlined />),
];

import Image from "next/image";

const SiderList = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div style={{ padding: "10px" }}>
      <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="Picture of the author"
      />
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          textAlign: "left",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default SiderList;
