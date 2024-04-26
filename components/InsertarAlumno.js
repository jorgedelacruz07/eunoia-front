
import React, { useState } from 'react';
import axios from 'axios';

export default function InsertarAlumno() {

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cicloEstudios, setCicloEstudios] = useState('');
  const [dni, setDni] = useState('');
    

  const handleInsertarClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/alumnoApi/crearAlumno', {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        cicloEstudios,
        dni,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
      if (response.status === 200) {
        alert('Alumno insertado exitosamente');
        // Puedes hacer alguna acción adicional aquí, como limpiar el formulario
      } else {
        alert('Error al insertar alumno');
      }
    } catch (error) {
      console.error('Error al insertar alumno:', error);
      console.error('Error al insertar alumno:', error);
      console.error('Detalles de la respuesta del servidor:', error.response.data);
    }
  };

    return (
      <div className="formulario inicial">
        <h1>Formulario de registro de alumno</h1>
          <div className="form">
              <div className="campo">
                <label htmlFor="nombre" className="nombre-control">
                  Nombre:
                </label>
              <input type="text" id="nombre" className="nombre-control" onChange={(e) => setNombre(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="apellidoPaterno" className="apellidoPaterno-control">
              Apellido Paterno:
            </label>
            <input type="text" id="apellidoPaterno" className="apellidoPaterno-control" onChange={(e) => setApellidoPaterno(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="apellidoMaterno" className="apellidoMaterno-control">
              Apellido Materno:
            </label>
            <input type="text" id="apellidoMaterno" className="apellidoMaterno-control" onChange={(e) => setApellidoMaterno(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="telefono" className="telefono-control">
              Teléfono:
            </label>
            <input type="text" id="telefono" className="telefono-control" onChange={(e) => setTelefono(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="cicloEstudios" className="cicloEstudios-control">
              Ciclo de Estudios:
            </label>
            <input type="text" id="cicloEstudios" className="cicloEstudios-control" onChange={(e) => setCicloEstudios(e.target.value)}/>
          </div>
          <div className="campo">
            <label htmlFor="dni" className="dni-control">
              DNI:
            </label>
            <input type="text" id="dni" className="dni-control" onChange={(e) => setDni(e.target.value)}/>
          </div>
          <div className="bttnContainer">
            <button className="bttnInsertar" onClick={handleInsertarClick}>Insertar</button>
          </div>
        </div>
      </div>   
    );
  }
  
