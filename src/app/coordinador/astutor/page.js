'use client';
import React, { useEffect, useState } from 'react';
import LayoutComponent from "@/components/LayoutComponent";
import { Button, Flex, Typography, Input, Select } from "antd";
import axios from "axios";
import connection from '@/config/connection';
import { coordinadorItems } from "@/utils/menuItems";
import BuscarAlumnos from '@/components/BuscarAlumnos';
import './App.css'; 

const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTipoTutoria, setSelectedTipoTutoria] = useState(null);
  const [tiposTutoria, setTiposTutoria] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const get = async () => {
    setIsLoading(true);

    try {
     // const fetchTutores = axios.get(`${connection.backend}/tutorApi/listarTodosTutores`);
      const fetchTiposTutoria = axios.get(`${connection.backend}/tipoTutoriaApi/listarTodosTiposTutoria`);

      fetchTiposTutoria.then(response => {
        setTiposTutoria(response.data);
      }).catch(error => {
        console.error('Error fetching tiposTutoria:', error);
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const componentStyle = {
    width: '60%', // Maintain width to 60% as before
    marginBottom: '16px',
    marginLeft: '0', // Ensure there is no left margin
    display: 'block' // Ensure the dropdowns are block elements to align properly
  };

  const searchStyle = {
    width: '60%',
    marginRight: '16px', // Provide some space between the search bar and the buttons
    marginLeft: '0', // Ensure there is no left margin
    display: 'block'
  };

  const buttonStyle = {
    backgroundColor: '#0884fc',
    color: '#fff',
    border: 'none',
    padding: '6px 20px', // Padding adjusted for internal spacing
    minWidth: '120px', // Minimum width
    marginRight: '8px', // Space between the "Guardar Cambios" and "Cancelar" buttons
  };

  const cancelButtonStyle = {
    backgroundColor: '#d9d9d9',
    color: '#fff',
    border: 'none',
    padding: '6px 20px', // Padding adjusted for internal spacing
    minWidth: '120px', // Ensuring text fits comfortably
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', // Align buttons to the right
    flexGrow: 1 // Use available space effectively
  };

  const handleTipoTutoriaChange = (value) => {
    // Ensure the value is converted to the correct type, e.g., a number if idTipoTutoria is a number
    const numericValue = Number(value);
    const selectedTipo = tiposTutoria.find(tipo => tipo.idTipoTutoria === numericValue);
    setSelectedTipoTutoria(selectedTipo || null);
};

return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={coordinadorItems} showFooter={false}>
        <Title level={4} className="text-xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#043b71', textAlign: 'left', padding: '0 20px' }}>Asignar Tutor</Title>
        <Select
          showSearch
          placeholder="Seleccione el tipo de tutoría"
          style={componentStyle}
          className="leftAlignPlaceholder"
          onChange={handleTipoTutoriaChange}
          onSearch={(value) => console.log('search:', value)}
        >
          {tiposTutoria.map(tipo => (
            <Option key={tipo.idTipoTutoria} value={tipo.idTipoTutoria.toString()}>{tipo.descripcion}</Option>
          ))}
        </Select>
        {selectedTipoTutoria && selectedTipoTutoria.tutores.length > 0 && (
          <Select
            showSearch
            placeholder="Seleccione al tutor"
            style={componentStyle}
            className="leftAlignPlaceholder"
            onChange={(value) => console.log(`selected ${value}`)}
            onSearch={(value) => console.log('search:', value)}
          >
            {selectedTipoTutoria.tutores.map(tutor => (
              <Option key={tutor.id} value={tutor.id.toString()}>{tutor.nombre} {tutor.apellidoPaterno}</Option>
            ))}
          </Select>
        )}
        <Flex style={{ width: '100%', alignItems: 'center' }}>
          <Search
            placeholder="Busque al alumno"
            style={searchStyle}
            onSearch={(value) => setSearchTerm(value)}
          />
          <div style={buttonContainerStyle}>
            <Button style={buttonStyle}>Guardar Cambios</Button>
            <Button style={cancelButtonStyle}>Cancelar</Button>
          </div>
        </Flex>
        <BuscarAlumnos searchTerm={searchTerm} />
      </LayoutComponent>
    </main>
  );
}

