"use client";
//prueba
import LayoutComponent from "@/components/LayoutComponent";

import { useEffect, useState } from "react";
import { Button, Flex, Typography, Modal, Input ,Select} from "antd";
import { alumnoItems } from "@/utils/menuItems";
import {Calendar } from "./Calendario"
const { Title } = Typography;
import  "./horario.css"
import { MinusCircleFilled } from '@ant-design/icons';
import { http } from "@/services/http";

export default function Home() {
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [bloquesDisponibilidad, setBloqueDisponibilidad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [tutores,setTutores] = useState([]);
  let id ;
  useEffect(() => {
    // Leer los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    ;
    id = params.get('id')
    // Hacer algo con el ID (por ejemplo, imprimirlo en la consola)
    console.log('ID del tutor:', id);
    
  }, []); // Ejecutar solo una vez al cargar la página

  const get = async () => {
    setIsLoading(true);
  };

  const handleListarDisponibilidad = async(idTutor)=>{
    setIsLoading(true);
    try {
      const response = await http.get(
        `/disponibilidadApi/listarDisponibilidadPorTutor/${idTutor}`
      );
      console.log(response.data);
      setDisponibilidad(response.data);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerElementosPorDisponibilidad = async (idDisponibilidad) => {
    try {
      const response = await http.get(
        `/bloqueDisponibilidadApi/listarBloqueDisponibilidadPorDisponibilidad/${idDisponibilidad}`
      );
      console.log(response.data);
      setBloqueDisponibilidad(response.data);
      return response.data; // Devuelve la lista de elementos
    } catch (error) {
      console.error("Error al obtener datos de la API: ", error);
      return []; // Devuelve un arreglo vacÃo en caso de error
    }
  };
 
  
  useEffect(() => {
    const idTutor = id;
    handleListarDisponibilidad(idTutor);
  }, [id,filtro]);


  let idDispo;
  disponibilidad.forEach((elemento) => {
     idDispo= elemento.idDisponibilidad;
    
  });
  
  console.log(idDispo);

  
 

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const startDate = new Date();
  const monthName = months[startDate.getMonth()]; // Obtén el nombre del mes actual
  const year = startDate.getFullYear();

const formattedDate = `${monthName} ${year}`;
  useEffect(() => { 
    
    handlerElementosPorDisponibilidad(idDispo);
  }, [idDispo,filtro]);

  function handleChange(value) {   
    ;    
  }
  return (
    <main style={{ height: "100vh" }}>
      <LayoutComponent siderItems={alumnoItems}>
        <div>
          <h1 className="titulo-principal">Agendar citas</h1>
        </div>
        <div className="fila-1">
          <div>
            <p className="fecha"> {monthName} {year}</p>
          </div>
          <div>
            <Select
                defaultValue={tutores[0]}
                placeholder="Seleccione el tema" // Establecer el valor predeterminado, por ejemplo, el primer elemento del arreglo.
                style={{ 
                  width: "359px",
                  height: "38px",
                  border: "2px solid #0663bd",
                  borderRadius: "10px",
                  fontSize: "20px",
                  //colorBgContainer : "#ffffff",
                  //marginLeft: "500px"
                 }}
                 
                 onChange={handleChange}
                >
                
                {tutores.map((opcion, index) => (
                  <Option key={index} value={opcion.idTipoTutoria}>
                    {opcion.nombre}
                  </Option>
                ))}
              </Select>
          </div>
        </div>
        <div className="fila-2">
        
          <ul className="horizontal-list">
          <MinusCircleFilled 
            style={{
              color:"#a7eeb8",
              marginRight: "10px"
            }}
          />
            <li className="palabra"> Disponible </li>
            <MinusCircleFilled style={{
              color:"#D4C095",
              marginRight: "10px"
            }}/>
            <li className="palabra"> Ocupado </li>
            <MinusCircleFilled style={{
              color:"#B9D5EF",
              marginRight: "10px"
            }}/>
            <li className="palabra"> Reservado</li>
          </ul>
          <button className="boton">Solicitar tutoría Fija</button>
        </div>
        <div className="calendario-contenedor">
          <Calendar bloques={bloquesDisponibilidad}
          
       />
        </div>
      </LayoutComponent>
    </main>

  );
}