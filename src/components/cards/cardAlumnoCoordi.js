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
    <Card style={{ width: 300, margin: '10px' }} type="inner">
      <Meta
        avatar={<Avatar size={48} src={alumno.foto || placeholderImage} />}
        title={
          <>
            {alumno.persona.nombre} {alumno.persona.apellidoPaterno} {alumno.persona.apellidoMaterno}
            <Tooltip title="Remove">
              <Button
                shape="circle"
                icon={<MinusCircleOutlined style={{ color: 'red' }} />}
                onClick={() => onRemove(alumno.id)}
                style={{ borderColor: 'red', float: 'right' }}
              />
            </Tooltip>
          </>
        }
        description={alumno.correo}
      />
    </Card>
  );
}