import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Tooltip
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
const { Meta } = Card;

export default function CardAlumnoCoordi({ alumno, onRemove }) {
  const placeholderImage = "/user.png";

  return (
    <Card style={{ width: 300, margin: '10px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Tooltip title="Remove">
          <Button
            shape="circle"
            icon={<MinusCircleOutlined style={{ color: 'red' }} />}
            onClick={() => onRemove(alumno.id)}
            style={{ border: 'none', backgroundColor: 'transparent',boxShadow: 'none',}}
          />
        </Tooltip>
      </div>
      <Meta
        avatar={<Avatar size={48} src={alumno.foto || placeholderImage} />}
        title={
          <>
            {alumno.persona.nombre} {alumno.persona.apellidoPaterno} {alumno.persona.apellidoMaterno}
            <div style={{ fontSize: 'small', color: 'gray' }}>Código: {alumno.codigo}</div>
          </>
        }
        description={alumno.correo}
      />
    </Card>
  );
}