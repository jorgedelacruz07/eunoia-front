import React, { useState , useEffect } from "react";
import CardAlumnoCoordi from "./cards/cardAlumnoCoordi"; 
import axios from "axios";
import { Row, Col } from "antd";
import connection from '@/config/connection';

// Import statements remain the same
function BuscarAlumnos({ searchTerm }) {
  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = async () => {
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
    try {
      const response = await axios.get(`${connection.backend}/usuarioApi/usuariosFiltrados/${encodeURIComponent(searchTerm)}/1/Alumno`);
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchAlumnos();
    }
  }, [searchTerm]);  // Fetch when searchTerm changes

  return (
    <Row gutter={[16, 16]}> {/* Row grid with space between columns and rows */}
      {alumnos.map((alumno) => (
        <Col xs={24} sm={12} md={8} lg={6} key={alumno.id}> {/* Each card gets a column */}
        <CardAlumnoCoordi alumno={alumno} key={alumno.id} />
        </Col>
      ))}
    </Row>
  );
}

export default BuscarAlumnos;
