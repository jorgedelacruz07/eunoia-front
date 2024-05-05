import React, { useState } from "react";
import CardAlumno from "./CardAlumno";  // Import the CardAlumno component
import { Button } from "antd";
import axios from "axios";
import connection from '@/config/connection';

function BuscarAlumnos({ searchTerm }) {
  const [alumnos, setAlumnos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchAlumnos = async () => {
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
      }
    try {
      const response = await axios.get(`${connection.backend}/usuarioApi/suariosFiltrados/${encodeURIComponent(searchTerm)}/1/Alumno`);
      setAlumnos(response.data);  
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={fetchAlumnos}>Buscar Alumnos</Button>
      {alumnos.length > 0 ? (
        alumnos.map((alumno) => (
          <CardAlumno
            key={alumno.id}
            alumno={alumno}
            programa={{ nombre: "Programa del Alumno" }}  // Assuming a static or placeholder program name
            link={`/${alumno.id}/profile`}  // Adjust according to your URL schema
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default BuscarAlumnos;
