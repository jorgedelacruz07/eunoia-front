'use client';
import React, { useEffect, useState } from 'react';
import LayoutComponent from "@/components/LayoutComponent";
import { Button, Flex, Typography, Input, Select } from "antd";
import axios from "axios";
import connection from '@/config/connection';
import { coordinadorItems } from "@/utils/menuItems";
import CardAlumnoCoordi from "@/components/cards/cardAlumnoCoordi"; 
import './App.css'; 

const { Option } = Select;
const { Title, Text } = Typography;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTipoTutoria, setSelectedTipoTutoria] = useState(null);
  const [tiposTutoria, setTiposTutoria] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [alumnoDropdownValue, setAlumnoDropdownValue] = useState(undefined);

  const get = async () => {
    setIsLoading(true);

    try {
      const fetchTiposTutoria = axios.get(`${connection.backend}/tipoTutoriaApi/listarTiposTutoriaTutorAsignado`);

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

  const handleTipoTutoriaChange = (value) => {
    const numericValue = Number(value);
    const selectedTipo = tiposTutoria.find(tipo => tipo.idTipoTutoria === numericValue);
    setSelectedTutor(null); 
    setSelectedAlumnos([]);
    setAlumnoDropdownValue(undefined);
    setSelectedTipoTutoria(selectedTipo || null);
};

const handleSelectAlumno = (value) => {
  setAlumnoDropdownValue(value);
  const alumno = selectedTipoTutoria.alumnos.find(a => a.id.toString() === value);
  if (alumno && !selectedAlumnos.find(a => a.id === alumno.id)) {
      setSelectedAlumnos([...selectedAlumnos, alumno]);
  }
};

const handleRemoveAlumno = id => {
  if (alumnoDropdownValue === id.toString()) {
    setAlumnoDropdownValue(undefined); // Reset dropdown to allow re-selection
  }
  setSelectedAlumnos(selectedAlumnos.filter(alumno => alumno.id !== id));
};

return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={coordinadorItems} showFooter={false}>
        <Title level={4} className="text-xl font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#043b71', textAlign: 'left', padding: '0 20px' }}>Asignar Tutor</Title>
        <div className="dropdownContainerStyle">
          <Text strong>Tipo de Tutoría:</Text>
          <Select
            showSearch
            placeholder="Seleccione el tipo de tutoría"
            className = "dropdownStyle"
            onChange={handleTipoTutoriaChange}
            onSearch={(value) => console.log('search:', value)}
            value={selectedTipoTutoria ? selectedTipoTutoria.idTipoTutoria.toString() : undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {tiposTutoria.map(tipo => (
              <Option key={tipo.idTipoTutoria} 
              value={tipo.idTipoTutoria.toString()}
              label={tipo.descripcion}
              >
                {tipo.descripcion}
              </Option>
            ))}
          </Select>
        </div>
        <div className="dropdownContainerStyle">
          <Text strong>Tutor:</Text>
          <Select
            showSearch
            placeholder="Seleccione al tutor"
            className="dropdownStyle"
            onChange={(value) => {
              const tutor = selectedTipoTutoria.tutores.find(t => t.id === Number(value));
              setSelectedTutor(tutor);
            }}
            onSearch={(value) => console.log('search:', value)}
            disabled={!selectedTipoTutoria}
            value={selectedTutor ? selectedTutor.id.toString() : undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {selectedTipoTutoria ? selectedTipoTutoria.tutores.map(tutor => (
              <Option key={tutor.id} 
              value={tutor.id.toString()}
              label={`${tutor.persona.nombre} ${tutor.persona.apellidoPaterno}`}
              >
                {tutor.persona.nombre} {tutor.persona.apellidoPaterno}</Option>
            )) : <Option disabled>No disponible</Option>}
          </Select>
        </div>
        <Flex style={{ width: '100%', alignItems: 'center', marginBottom: '16px',}}>
        <div className="dropdownContainerStyle">
          <Select
            showSearch
            placeholder="Busque al alumno por código o nombre"
            className = "dropdownStyle"
            onChange={handleSelectAlumno}
            onSearch={(value) => console.log('search:', value)}
            value={alumnoDropdownValue}
            disabled={!selectedTipoTutoria}
            filterOption={(input, option) => {
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
          }}
          >
            {selectedTipoTutoria ? selectedTipoTutoria.alumnos.map(alumno => (
              <Option 
                key={alumno.id} 
                value={alumno.id.toString()}
                label={`${alumno.codigo} ${alumno.persona.nombre} ${alumno.persona.apellidoPaterno}`}
              >
              {alumno.codigo} - {alumno.persona.nombre} {alumno.persona.apellidoPaterno}</Option>
            )) : <Option disabled>No disponible</Option>}
          </Select>
        </div>
        <div className="buttonContainerStyle">
          <Button className="buttonStyle">Guardar Cambios</Button>
          <Button className="cancelButtonStyle">Cancelar</Button>
        </div>
        </Flex>
        <div>
          {selectedAlumnos.map(alumno => (
              <CardAlumnoCoordi key={alumno.id} alumno={alumno} onRemove={handleRemoveAlumno}/>
          ))}
        </div>
      </LayoutComponent>
    </main>
  );
}

