import React, { useState , useEffect } from "react";
import { AlumnoCard } from "./cards/cardAlumnoCoordi";  // Import the CardAlumno component
import axios from "axios";
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
    <div>
      {alumnos.map((alumno) => (
        <AlumnoCard
          persona={alumno.persona}
          codigo={alumno.codigo}
          
          programa={`nombre: ${alumno.persona.nombre}`}
          link={`/${alumno.id}/profile`}
        />
      ))}
    </div>
  );
}

export default BuscarAlumnos;
