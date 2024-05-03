"use client";

import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import {
  IconUsersGroup,
  IconSchool,
  IconSquarePlus,
  IconHeartHandshake,
  IconUserPlus,
  IconFirstAidKit,
  IconFileTypeDoc,
  IconReportAnalytics
} from "@tabler/icons-react"


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
  getItem("Usuarios", "1", <IconUsersGroup size={20}/>),
  getItem("Tipos de Tutoría", "2", <IconSchool size={20} />),
  getItem("Asignación Individual Tipo de Tutoría", "3", <IconSquarePlus size={20} />),
  getItem("Asignación Masiva Tipo de Tutoría", "4", <IconSquarePlus size={20} />),
  getItem("Asignar Tutor", "5", <IconHeartHandshake size={20} />),
  getItem("Registro de Usuarios", "6", <IconUserPlus size={20} />),
  getItem("Unidades de Apoyo", "7", <IconFirstAidKit size={20} />),
  getItem("Agregar Documentos", "8", <IconFileTypeDoc size={20} />),
  getItem("Reportes", "9", <IconReportAnalytics size={20} />),
];

import Image from "next/image";

const SiderList = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div style={{ padding: "10px" }}>
      <Image
        src="/logo.svg"
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
