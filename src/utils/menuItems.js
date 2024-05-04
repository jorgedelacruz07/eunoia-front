import {
  IconSchool, IconUsersGroup, IconCalendarWeek, IconList, IconBook, IconNotes, IconSquarePlus,
  IconHeartHandshake, IconUserPlus, IconFirstAidKit, IconFileTypeDoc, IconReportAnalytics
} from "@tabler/icons-react";

function getItem(label, key, icon, link, visible, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    link,
    visible
  };
}

export const tutorItems = [
  getItem("Sesión de Tutoría", "1", <IconSchool size={20}/>, "/tutor/sesion", true),
  getItem("Alumnos Asignados", "2", <IconUsersGroup size={20} />, "/tutor/alumnos", true),
  getItem("Calendario", "3", <IconCalendarWeek size={20} />, "/tutor/calendario", true),
  getItem("Lista de Citas", "4", <IconList size={20} />, "/tutor/citas", true),
  getItem("Solicitudes", "5", <IconBook size={20} />, "/tutor/solicitudes", true),
  getItem("Encuestas", "6", <IconNotes size={20} />, "/tutor/encuestas", true),
];

export const coordinadorItems = [
  getItem("Usuarios", "1", <IconUsersGroup size={20}/>, "coordinador/usuarios", true),
  getItem("Tipos de Tutoría", "2", <IconSchool size={20} />, "coordinador/tipos", true),
  getItem("Asignación Individual Tipo de Tutoría", "3", <IconSquarePlus size={20} />, "coordinador/astipo", true),
  getItem("Asignación Masiva Tipo de Tutoría", "4", <IconSquarePlus size={20} />, "coordinador/astipomas", true),
  getItem("Asignar Tutor", "5", <IconHeartHandshake size={20} />, "coordinador/astutor", true),
  getItem("Registro de Usuarios", "6", <IconUserPlus size={20} />, "coordinador/regusuarios", true),
  getItem("Unidades de Apoyo", "7", <IconFirstAidKit size={20} />, "coordinador/uapoyo", true),
  getItem("Agregar Documentos", "8", <IconFileTypeDoc size={20} />, "coordinador/docs", true),
  getItem("Reportes", "9", <IconReportAnalytics size={20} />, "coordinador/reportes", false),
];