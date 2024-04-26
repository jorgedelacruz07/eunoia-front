import React, { useState } from 'react';
import InsertarAlumno from "../components/InsertarAlumno";
import Card from "../components/Card";

export default function Home() {
  const [mostrarInsertar, setMostrarInsertar] = useState(false);

  const toggleMostrarInsertar = () => {
    setMostrarInsertar(!mostrarInsertar);
  };

  return (
    <div className='bttnToggle'>
      <button onClick={toggleMostrarInsertar}>
        {mostrarInsertar ? 'Mostrar Lista de Alumnos' : 'Mostrar Formulario de Inserción'}
      </button>
      {mostrarInsertar ? <InsertarAlumno /> : <Card />}
    </div>
  );
}