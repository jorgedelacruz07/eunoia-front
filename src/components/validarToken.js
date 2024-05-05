import axios from 'axios';

// Función para validar el token en el backend
export default async function validaToken(email) {
    try {
        debugger
        // Enviar el token al backend
        const response = await axios.post("http://localhost:8080/usuarioApi/validarUsuario", {
            correo: email,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
        );

        // Verificar el resultado de la validación
        if (response.status === 200) {
            console.log('Usuario Valido');
            // Aquí puedes realizar acciones adicionales si el token es válido
            return true; // Devuelve true si el token es válido
        } else {
            console.error('Usuario inválido');
            // Aquí puedes manejar el caso en el que el token no es válido
            return false; // Devuelve false si el token no es válido
        }
    } catch (error) {
        console.error('Error al validar el token:', error);
        // Aquí puedes manejar errores de red u otros errores
        return false; // Devuelve false en caso de error
    }
}
