"use client";

import React from "react";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const SiderList = ({ items }) => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  
  const pathname = usePathname();
  
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
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {items.map((item) => (
          item.visible && (
            <Menu.Item key={item.link} icon={item.icon}>
              <Link href={item.link}>
                {item.label}
              </Link>
            </Menu.Item>
          )
        ))}
      </Menu>
    </div>
  );
};
export default SiderList;
