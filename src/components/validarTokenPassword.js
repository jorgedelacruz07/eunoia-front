import { http } from "@/services/http";

export default async function validaTokenPassword(email, password) {
  try {
    // Enviar el token al backend
    const response = await http.post("/usuarioApi/validarUsuarioPassword", {
      correo: email,
      password: password,
    });

    // Verificar el resultado de la validación
    if (response.data.resultado === "Tutor") {
      console.log("Usuario Tutor");
      return { path: "/tutor/citas", id: response.data.id }; // Devuelve true si el token es válido
    } else {
      if (response.data.resultado == "Alumno") {
        return { path: "/alumno/citas", id: response.data.id }; // Devuelve false si el token no es válido
      } else {
        if (response.data.resultado == "Coordinador") {
          return { path: "/coordinador/usuarios", id: response.data.id }; // Devuelve false si el token no es válido
        } else {
          if (response.data.resultado == "Administrador") {
            return { path: "/admin/institucion", id: response.data.id }; // Devuelve false si el token no es válido
          } else {
            console.error("Usuario no encontrado");
            return { path: "/login", id: response.data.id }; // Devuelve false si el token no es válido
          }
        }
      }
    }
  } catch (error) {
    console.error("Error al validar el token:", error);
    // Aquí puedes manejar errores de red u otros errores
    return false; // Devuelve false en caso de error
  }
}
