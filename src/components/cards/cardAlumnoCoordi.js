import React, { useState } from "react";
import { 
  Avatar,
  Button,
  Card
} from "antd";
const { Meta } = Card;

export default function CardAlumnoCoordi({ alumno }) {
  const placeholderImage = "/public/user.png"; 
  return (
    <Card style={{ width: 400, height: 130 }} type="inner">
      <Meta
        avatar={
          <Avatar size={32} src={alumno.foto || placeholderImage} />
        }
        title={
          <>
            {alumno.persona.nombre} {alumno.persona.apellidoPaterno} {alumno.persona.apellidoMaterno}
            <Button type="primary" style={{ float: "right" }} href={`/${alumno.id}/profile`}>
              Seleccionar
            </Button>
          </>
        }
        description={
          <>
            {alumno.correo}
          </>
        }
      />
    </Card>
  );
}