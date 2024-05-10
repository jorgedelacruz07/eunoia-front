import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import axios from "axios";
import TipoTutoriaSelect from "./TipoTutoriaSelect";

const UserForm = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setCodigo,
  setNombres,
  setApellidos,
  setCelular,
  setCorreo,
  setTipoUsuario,
}) => {
  const [especialidad, setEspecialidad] = useState("");
  const [tipoTutoria, setTipoTutoria] = useState(null);
  const [tipoUsuarioSeleccionado, setTipoUsuarioSeleccionado] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/especialidadApi/listarTodosEspecialidad"
        );
        setEspecialidades(response.data);
      } catch (error) {
        console.error("Error al obtener las especialidades:", error);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleTipoUsuarioChange = (value) => {
    setTipoUsuarioSeleccionado(value);
    setTipoUsuario(value);
    setTipoTutoria(null);
  };

  const handleOkClick = async () => {
    try {
      const values = await form.validateFields();

      if (tipoUsuarioSeleccionado === "Alumno") {
        // Crear alumno
        const alumnoData = {
          nombre: values.nombres,
          apellidoPaterno: values.apellidos.split(" ")[0],
          apellidoMaterno: values.apellidos.split(" ")[1] || "",
          telefono: values.celular,
          cicloEstudios: 1,
          historialAcademico: null,
          especialidad: {
            id: especialidad,
          },
          tipoAlumno: {
            id: 1,
          },
          dni: values.codigo,
        };

        const alumnoResponse = await axios.post(
          "http://localhost:8080/alumnoApi/crearAlumno",
          alumnoData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (alumnoResponse.status === 200) {
          const alumnoId = alumnoResponse.data.id;

          // Crear usuario del alumno
          const usuarioData = {
            codigo: values.codigo,
            password: null,
            foto: null,
            tipoUsuario: "Alumno",
            correo: values.correo,
            persona: {
              id: alumnoId,
              nombre: values.nombres,
              apellidoPaterno: values.apellidos.split(" ")[0],
              apellidoMaterno: values.apellidos.split(" ")[1] || "",
              telefono: null,
              dni: null,
            },
            institucion: {
              id: 1,
              siglas: null,
              direccion: null,
              logo: null,
              telefono: null,
            },
          };

          const usuarioResponse = await axios.post(
            "http://localhost:8080/usuarioApi/crearUsuario",
            usuarioData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (usuarioResponse.status === 200) {
            console.log("Usuario del alumno creado exitosamente");
            alert("Alumno y usuario creados exitosamente");
            clearInput();
            handleOk();
          } else {
            console.error("Error al crear el usuario del alumno");
            alert("Error al crear el usuario del alumno");
          }
        } else {
          console.error("Error al crear el alumno");
          alert("Error al crear el alumno");
        }
      } else if (tipoUsuarioSeleccionado === "Tutor") {
        // Crear tutor
        const tutorData = {
          nombre: values.nombres,
          apellidoPaterno: values.apellidos.split(" ")[0],
          apellidoMaterno: values.apellidos.split(" ")[1] || "",
          telefono: values.celular,
          linkReunion: null,
          especialidad: null,
          dni: values.codigo,
        };

        const tutorResponse = await axios.post(
          "http://localhost:8080/tutorApi/crearTutor",
          tutorData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (tutorResponse.status === 200) {
          const tutorId = tutorResponse.data.id;

          // Asignar tipo de tutoría al tutor
          if (tipoTutoria) {
            await axios.post(
              `http://localhost:8080/tipoTutoriaApi/asignarTipoTutoriaATutor/${tipoTutoria}/${tutorId}`
            );
          }

          // Crear usuario del tutor
          const usuarioData = {
            codigo: values.codigo,
            password: null,
            foto: null,
            tipoUsuario: "Tutor",
            correo: values.correo,
            persona: {
              id: tutorId,
              nombre: values.nombres,
              apellidoPaterno: values.apellidos.split(" ")[0],
              apellidoMaterno: values.apellidos.split(" ")[1] || "",
              telefono: null,
              dni: null,
            },
            institucion: {
              id: 1,
              siglas: null,
              direccion: null,
              logo: null,
              telefono: null,
            },
          };

          const usuarioResponse = await axios.post(
            "http://localhost:8080/usuarioApi/crearUsuario",
            usuarioData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (usuarioResponse.status === 200) {
            console.log("Usuario del tutor creado exitosamente");
            alert("Tutor, tipo de tutoría y usuario creados exitosamente");
            clearInput();
            handleOk();
          } else {
            console.error("Error al crear el usuario del tutor");
            alert("Error al crear el usuario del tutor");
          }
        } else {
          console.error("Error al crear el tutor");
          alert("Error al crear el tutor");
        }
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      console.error("Detalles de la respuesta del servidor:", error.response.data);
    }
  };

  const clearInput = () => {
    setCodigo("");
    setNombres("");
    setApellidos("");
    setCelular("");
    setCorreo("");
    setTipoUsuario("");
    setEspecialidad("");
    setTipoTutoria(null);
    setTipoUsuarioSeleccionado("");
    form.resetFields();
  };

  return (
    <Modal
      title="Agregar un usuario"
      open={isModalOpen}
      onOk={handleOkClick}
      onCancel={handleCancel}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="codigo"
          label="DNI"
          rules={[{ required: true, message: "Por favor, ingrese el DNI" }]}
        >
          <Input onChange={(e) => setCodigo(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="nombres"
          label="Nombres"
          rules={[
            { required: true, message: "Por favor, ingrese los nombres" },
          ]}
        >
          <Input onChange={(e) => setNombres(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="apellidos"
          label="Apellidos"
          rules={[
            { required: true, message: "Por favor, ingrese los apellidos" },
          ]}
        >
          <Input onChange={(e) => setApellidos(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="celular"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el número de teléfono",
            },
          ]}
        >
          <Input onChange={(e) => setCelular(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="correo"
          label="Correo"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el correo electrónico",
            },
          ]}
        >
          <Input onChange={(e) => setCorreo(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="tipoUsuario"
          label="Tipo de Usuario"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione el tipo de usuario",
            },
          ]}
        >
          <Select
            onChange={handleTipoUsuarioChange}
            placeholder="Seleccionar tipo de usuario..."
          >
            <Select.Option value="Alumno">Alumno</Select.Option>
            <Select.Option value="Tutor">Tutor</Select.Option>
          </Select>
        </Form.Item>
        {tipoUsuarioSeleccionado === "Alumno" && (
          <Form.Item
            name="especialidad"
            label="Especialidad"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione la especialidad del alumno",
              },
            ]}
          >
            <Select
              onChange={(value) => setEspecialidad(value)}
              placeholder="Seleccionar la especialidad del alumno..."
            >
              {especialidades.map((especialidad) => (
                <Select.Option key={especialidad.id} value={especialidad.id}>
                  {especialidad.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {tipoUsuarioSeleccionado === "Tutor" && (
          <Form.Item
            name="tipoTutoria"
            label="Tipo de Tutoría"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione el tipo de tutoría",
              },
            ]}
          >
            <TipoTutoriaSelect
              value={tipoTutoria}
              onChange={(value) => setTipoTutoria(value)}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserForm;