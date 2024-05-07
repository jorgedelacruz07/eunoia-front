"use client";

import React from "react"
import { cardAlumnoCoordi } from './cardAlumnoCoordi.css'
 
export function AlumnoCard({ persona,codigo,foto=null}){
    const { nombre, apellidoPaterno, apellidoMaterno } = persona;
    return(
        <article className="card">
            <header className="card-header" >
              
                <div className="info">
                    <h3 className="nombre">{nombre} {apellidoPaterno} {apellidoMaterno}</h3>
                    <p className="codigo">Código: {codigo}</p> 
                </div>
                <aside className="aside">
                    <button className="boton">Ver disponibilidad</button>
                </aside>
            </header>

        </article>
    )
}