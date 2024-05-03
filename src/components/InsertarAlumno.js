"use client";
import React, { useState } from "react";
import axios from "axios";

export default function InsertarAlumno() {
  

  

  return (
    <div className="formulario inicial">
      <h1>Formulario de registro de alumno</h1>
      <div className="form">
        <div className="campo">
          <label htmlFor="nombre" className="nombre-control">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            className="nombre-control"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="apellidoPaterno" className="apellidoPaterno-control">
            Apellido Paterno:
          </label>
          <input
            type="text"
            id="apellidoPaterno"
            className="apellidoPaterno-control"
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="apellidoMaterno" className="apellidoMaterno-control">
            Apellido Materno:
          </label>
          <input
            type="text"
            id="apellidoMaterno"
            className="apellidoMaterno-control"
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="telefono" className="telefono-control">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            className="telefono-control"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cicloEstudios" className="cicloEstudios-control">
            Ciclo de Estudios:
          </label>
          <input
            type="text"
            id="cicloEstudios"
            className="cicloEstudios-control"
            onChange={(e) => setCicloEstudios(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="dni" className="dni-control">
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            className="dni-control"
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="bttnContainer">
          <button className="bttnInsertar" onClick={handleInsertarClick}>
            Insertar
          </button>
        </div>
      </div>
    </div>
  );
}
