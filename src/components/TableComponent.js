"use client";

import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Tag } from "antd";
import axios from "axios";
const { Column, ColumnGroup } = Table;

const TableComponent = ({ isLoading, alumnos }) => {
  if (isLoading) return <Spin size="large" />;

  return (
    <Table dataSource={alumnos}>
      <Column
        title="Nº"
        dataIndex="index"
        key="index"
        align="center"
        render={(text, record, index) => index + 1}
      />
      <Column
        title="Nombres"
        key="nombres"
        align="center"
        render={(text, record) =>
          `${record.firstName} ${record.lastName} ${record.lastName2}`
        }
      />

      <Column
        title="Correo"
        dataIndex="correo"
        key="correo"
        align="center"
      />
      <Column
        title="Tipo de Usuario"
        dataIndex="tipoUsuario"
        key="tipoUsuario"
        align="center"
      />
      <Column
        title="Estado"
        dataIndex="estado"
        key="estado"
        align="center"
      />
      <Column
        title="Accion"
        dataIndex="accion"
        key="accion"
        align="center"
      />
    </Table>
  );
};
export default TableComponent;
