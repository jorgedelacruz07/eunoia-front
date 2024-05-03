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
        key="index"
        render={(text, record, index) => index + 1}
      />
      <ColumnGroup>
        <Column title="Nombres" dataIndex="firstName" key="firstName" />
        <Column title="apellido Paterno" dataIndex="lastName" key="lastName" />
        <Column
          title="apellido Materno"
          dataIndex="lastName2"
          key="lastName2"
        />
      </ColumnGroup>
      <Column title="dni" dataIndex="dni" key="dni" />
      <Column title="telefono" dataIndex="telefono" key="telefono" />
      <Column
        title="cicloEstudios"
        dataIndex="cicloEstudios"
        key="cicloEstudios"
      />
      <Column
        title="historialAcademico"
        dataIndex="historialAcademico"
        key="historialAcademico"
      />
    </Table>
  );
};
export default TableComponent;
