"use client";
//prueba
import Card from "@/components/Card";
import InsertarAlumno from "@/components/InsertarAlumno";
import LayoutComponent from "@/components/LayoutComponent";
import { useEffect, useState } from "react";
import { Button, Flex, Typography, Modal, Input } from "antd";
import TableComponent from "@/components/TableComponent";
import axios from "axios";
import { coordinadorItems } from "@/utils/menuItems";
const { Title } = Typography;

export default function Home() {
  const [mostrarInsertar, setMostrarInsertar] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cicloEstudios, setCicloEstudios] = useState("");
  const [dni, setDni] = useState("");

  const [alumnos, setAlumnos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const get = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/alumnoApi/listarTodosAlumnos"
      );

      const data = response.data.map((alumno) => ({
        key: alumno.dni,
        dni: alumno.dni,
        firstName: alumno.nombre,
        lastName: alumno.apellidoPaterno,
        lastName2: alumno.apellidoMaterno,
        telefono: alumno.telefono,
        cicloEstudios: alumno.cicloEstudios,
        historialAcademico: alumno.historialAcademico,
      }));
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);
  const clearInut = () => {
    setNombre("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setTelefono("");
    setCicloEstudios("");
    setDni("");
  };
  const handleInsertarClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/alumnoApi/crearAlumno",
        {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          telefono,
          cicloEstudios,
          DNI: dni,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Alumno insertado exitosamente");

        clearInut();
        await get();
        // Puedes hacer alguna acción adicional aquí, como limpiar el formulario
      } else {
        alert("Error al insertar alumno");
      }
    } catch (error) {
      console.error("Error al insertar alumno:", error);
      console.error("Error al insertar alumno:", error);
      console.error(
        "Detalles de la respuesta del servidor:",
        error.response.data
      );
    }
  };
  const toggleMostrarInsertar = () => {
    setMostrarInsertar(!mostrarInsertar);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleInsertarClick();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={coordinadorItems}>
        <Flex style={{ alignItems: "center" }}>
          <Title style={{ textAlign: "left" }}>Lista de Usuarios</Title>
          <Button type="primary" onClick={showModal}>
            Ingresar{" "}
          </Button>
        </Flex>
        <TableComponent
          isLoading={isLoading}
          alumnos={alumnos}
        ></TableComponent>
      </LayoutComponent>
      <Modal
        title="Agregar un alumno"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="formulario inicial">
          <h1>Formulario de registro de alumno</h1>
          <div className="form">
            <div className="campo">
              <label htmlFor="nombre" className="nombre-control">
                Nombre:
              </label>
              <Input
                type="text"
                id="nombre"
                className="nombre-control"
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="campo">
              <label
                htmlFor="apellidoPaterno"
                className="apellidoPaterno-control"
              >
                Apellido Paterno:
              </label>
              <Input
                type="text"
                id="apellidoPaterno"
                className="apellidoPaterno-control"
                onChange={(e) => setApellidoPaterno(e.target.value)}
              />
            </div>
            <div className="campo">
              <label
                htmlFor="apellidoMaterno"
                className="apellidoMaterno-control"
              >
                Apellido Materno:
              </label>
              <Input
                type="text"
                id="apellidoMaterno"
                className="apellidoMaterno-control"
                onChange={(e) => setApellidoMaterno(e.target.value)}
              />
            </div>
            <div className="campo">
              <label htmlFor="telefono" className="telefono-control">
                Teléfono:
              </label>
              <Input
                type="text"
                id="telefono"
                className="telefono-control"
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="campo">
              <label htmlFor="cicloEstudios" className="cicloEstudios-control">
                Ciclo de Estudios:
              </label>
              <Input
                type="text"
                id="cicloEstudios"
                className="cicloEstudios-control"
                onChange={(e) => setCicloEstudios(e.target.value)}
              />
            </div>
            <div className="campo">
              <label htmlFor="dni" className="dni-control">
                DNI:
              </label>
              <Input
                type="text"
                id="dni"
                className="dni-control"
                onChange={(e) => setDni(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}

/*
<div className="bttnToggle">
        <button onClick={toggleMostrarInsertar}>
          {mostrarInsertar
            ? "Mostrar Lista de Alumnos"
            : "Mostrar Formulario de Inserción"}
        </button>

        {mostrarInsertar ? <InsertarAlumno /> : <Card />}
      </div>

*/
