"use client";
import LayoutComponent from "@/components/LayoutComponent";
import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { ProductOutlined } from "@ant-design/icons";
import TableComponent from "@/components/TableComponent";
import { coordinadorItems } from "@/utils/menuItems";
import SearchInput from "@/components/SearchInput";
import UserTypeSelect from "@/components/UserTypeSelect";
import SelectEstadoModal from "@/components/SelectEstadoModal";
import UserForm from "@/components/UserForm";
import { http } from "@/services/http";

const { Title } = Typography;

export default function Home() {
  const [mostrarInsertar, setMostrarInsertar] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [busquedaInput, setBusquedaInput] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTipoUsuario, setSelectedTipoUsuario] = useState("");
  const [isEstadoModalVisible, setIsEstadoModalVisible] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(1);

  const onSearch = async () => {
    await get();
  };

  const get = async () => {
    setIsLoading(true);
    try {
      let url = `/usuarioApi/usuariosFiltrados`;

      if (busquedaInput || selectedEstado !== "1" || selectedTipoUsuario) {
        url += `?codigoNombre=${
          busquedaInput || ""
        }&estado=${selectedEstado}&tipoUsuario=${selectedTipoUsuario || ""}`;
      }

      const response = await http.get(url);

      const data = response.data.map((usuario) => ({
        key: usuario.id,
        nombres: `${usuario.persona.nombre} ${usuario.persona.apellidoPaterno} ${usuario.persona.apellidoMaterno}`,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario,
        estado: selectedEstado === 1 ? "Activo" : "Inactivo",
      }));

      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [busquedaInput, selectedTipoUsuario, selectedEstado]);

  const clearInput = () => {
    setCodigo("");
    setNombres("");
    setApellidos("");
    setCelular("");
    setCorreo("");
    setTipoUsuario("");
  };

  const handleInsertarClick = async () => {
    try {
      const response = await http.post(
        "/usuarioApi/crearUsuario",
        {
          codigo,
          nombres,
          apellidos,
          celular,
          correo,
          tipoUsuario,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Usuario insertado exitosamente");
        clearInput();
        await get();
      } else {
        alert("Error al insertar usuario");
      }
    } catch (error) {
      console.error("Error al insertar usuario:", error);
      console.error(
        "Detalles de la respuesta del servidor:",
        error.response.data
      );
    }
  };

  const toggleMostrarInsertar = () => {
    setMostrarInsertar(!mostrarInsertar);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await handleInsertarClick();
    setIsModalOpen(false);
    setSelectedOption("seleccionar");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedOption("seleccionar");
  };

  const handleBusquedaChange = (e) => {
    const value = e.target.value;
    setBusquedaInput(value);

    if (value === "") {
      onSearch();
    }
  };

  return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={coordinadorItems}>
        <Flex style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Title style={{ textAlign: "left", color: "#043B71" }}>
            Lista de Usuarios
          </Title>
          <Flex style={{ alignItems: "center" }}>
            <SearchInput
              value={busquedaInput}
              onChange={handleBusquedaChange}
            />
            <UserTypeSelect
              value={selectedTipoUsuario}
              onChange={setSelectedTipoUsuario}
            />
            <Button
              icon={<ProductOutlined />}
              onClick={() => setIsEstadoModalVisible(true)}
              style={{ marginLeft: 10, width: 60, height: 40 }}
            />
          </Flex>
          <Flex style={{ alignItems: "center", marginTop: 10 }}>
            <span style={{ marginRight: 10, color: "#727272" }}>
              ({usuarios.length}) Usuarios
            </span>
            <Button
              type="primary"
              onClick={showModal}
              style={{
                backgroundColor: "#0092FF",
                borderColor: "#0092FF",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 8 }}>Añadir nuevo</span>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6V18M6 12H18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Button>
          </Flex>
        </Flex>

        <TableComponent
          isLoading={isLoading}
          usuarios={usuarios.map((usuario, index) => ({
            ...usuario,
            key: index + 1,
          }))}
        />
      </LayoutComponent>

      <UserForm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        setCodigo={setCodigo}
        setNombres={setNombres}
        setApellidos={setApellidos}
        setCelular={setCelular}
        setCorreo={setCorreo}
        setTipoUsuario={setTipoUsuario}
      />

      <SelectEstadoModal
        isModalVisible={isEstadoModalVisible}
        setIsModalVisible={setIsEstadoModalVisible}
        selectedEstado={selectedEstado}
        setSelectedEstado={setSelectedEstado}
        onSearch={onSearch}
      />
    </main>
  );
}
