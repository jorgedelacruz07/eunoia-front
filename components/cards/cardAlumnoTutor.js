import React, { useState } from "react";
import { Avatar } from "antd";
import { Button } from "antd";
import { Card } from "antd";
const { Meta } = Card;

export default function CardAlumno({ alumno, programa, link }) {
  return (
    <Card style={{ width: 400, height: 130 }} type="inner">
      <Meta
        avatar={<Avatar size="large" src={alumno.avatar} />}
        title={
          <>
            {alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}
            <Button type="primary" style={{ float: "right" }} link={link}>
              Ver perfil
            </Button>
          </>
        }
        description={
          <>
            {alumno.id}
            <br />
            {programa.nombre}
          </>
        }
      />
    </Card>
  );
}
