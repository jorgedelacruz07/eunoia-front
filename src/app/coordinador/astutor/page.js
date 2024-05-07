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
const { Title, Text } = Typography;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTipoTutoria, setSelectedTipoTutoria] = useState(null);
  const [tiposTutoria, setTiposTutoria] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const get = async () => {
    setIsLoading(true);

    try {
     // const fetchTutores = axios.get(`${connection.backend}/tutorApi/listarTodosTutores`);
      const fetchTiposTutoria = axios.get(`${connection.backend}/tipoTutoriaApi/listarTodosTiposTutoria`);

      fetchTiposTutoria.then(response => {
        console.log("Response data:", response.data);
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
  
  const dropdownStyle = {
    flex: '1 1 auto',
    marginLeft: '10px',  // Add margin to indent the dropdown
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

  const dropdownContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    marginBottom: '16px',
  };


  const handleTipoTutoriaChange = (value) => {
    // Convert the value to the correct type, e.g., a number if idTipoTutoria is a number
    const numericValue = Number(value);
    const selectedTipo = tiposTutoria.find(tipo => tipo.idTipoTutoria === numericValue);

    // Reset selected tutor when changing tipo de tutoría
    setSelectedTutor(null); // Ensure you have a state to track the selected tutor
    setSelectedTipoTutoria(selectedTipo || null);
};

const handleTutorChange = (value) => {
    // Convert the value to the correct type, e.g., a number if id is a number
    const numericValue = Number(value);
    const selectedTutor = selectedTipoTutoria.tutores.find(tutor => tutor.id === numericValue);
    setSelectedTutor(selectedTutor || null);
};

return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={coordinadorItems} showFooter={false}>
        <Title level={4} className="text-xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#043b71', textAlign: 'left', padding: '0 20px' }}>Asignar Tutor</Title>
        <div style={dropdownContainerStyle}>
          <Text strong>Tipo de Tutoría:</Text>
          <Select
            showSearch
            placeholder="Seleccione el tipo de tutoría"
            style={dropdownStyle}
            className="leftAlignPlaceholder"
            onChange={handleTipoTutoriaChange}
            onSearch={(value) => console.log('search:', value)}
            value={selectedTipoTutoria ? selectedTipoTutoria.idTipoTutoria.toString() : undefined}
          >
            {tiposTutoria.map(tipo => (
              <Option key={tipo.idTipoTutoria} value={tipo.idTipoTutoria.toString()}>{tipo.descripcion}</Option>
            ))}
          </Select>
        </div>
        <div style={dropdownContainerStyle}>
          <Text strong>Tutor:</Text>
          <Select
            showSearch
            placeholder="Seleccione al tutor"
            style={dropdownStyle}
            className="leftAlignPlaceholder"
            onChange={(value) => {
              // Assuming that this value is the ID of the tutor, find and set the selected tutor
              const tutor = selectedTipoTutoria.tutores.find(t => t.id === Number(value));
              setSelectedTutor(tutor);
            }}
            onSearch={(value) => console.log('search:', value)}
            disabled={!selectedTipoTutoria}
            value={selectedTutor ? selectedTutor.id.toString() : undefined} // This will be undefined if selectedTutor is null
          >
            {selectedTipoTutoria ? selectedTipoTutoria.tutores.map(tutor => (
              <Option key={tutor.id} value={tutor.id.toString()}>{tutor.nombre} {tutor.apellidoPaterno}</Option>
            )) : <Option disabled>No disponible</Option>}
          </Select>
        </div>
        <Flex style={{ width: '100%', alignItems: 'center' }}>
          <Search
            placeholder="Busque al alumno por código o nombre"
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

