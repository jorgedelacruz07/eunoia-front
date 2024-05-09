import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyle.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

export function Calendar ({bloques}) {
  const calendarRef = useRef()

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",  
    
  });

  useEffect(() => {
    let eventos = [];
    if (bloques) {
      bloques.forEach(bloque => {
        let color = bloque.libre === 1 ? "#a7eeb8" : "#D4C095";
        let text = bloque.libre === 1 ? "" : "Ocupado"
        eventos.push({
          id: bloque.idBloque,
          text: text,
          start: bloque.horaInicio.toString(), // Asumiendo que horaInicio es un objeto Date
          end: bloque.horaFin.toString(), // Asumiendo que horaFin es un objeto Date
          backColor: color,
        });
      });
    }

    const events = [
      // Otros eventos
    ].concat(eventos);

    const startDate = new Date().toISOString().slice(0, 10);
    
    calendarRef.current.control.update({ startDate, events });
  }, [bloques]);
  
  return (
    <div style={styles.wrap}>
      <div style={styles.main}>
        <DayPilotCalendar
          
          {...calendarConfig}
          ref={calendarRef}
          
        />
      </div>
    </div>
  );
}

