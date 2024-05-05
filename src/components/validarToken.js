import axios from 'axios';

// Función para validar el token en el backend
export default async function validaToken(email) {
    try {
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
        if (response.data === 'Tutor') {
            console.log('Usuario Tutor');
            // Aquí puedes realizar acciones adicionales si el token es válido
            alert("usuario Tutor");
            return '/tutor'; // Devuelve true si el token es válido
        } else {
            if(response.data == 'Alumno'){
                console.error('Usuario Alumno');
                // Aquí puedes manejar el caso en el que el token no es válido
                alert("usuario Alumno");
                return '/alumno'; // Devuelve false si el token no es válido
            }
            else{
                if(response.data == 'Coordinador'){
                    console.error('Usuario Coordinador');
                    // Aquí puedes manejar el caso en el que el token no es válido
                    alert("usuario Coordinador");
                    return '/coordinador'; // Devuelve false si el token no es válido
                }
                else{
                    if(response.data == 'Administrador'){
                        console.error('Usuario Administrador');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario Administrador");
                        return '/admin'; // Devuelve false si el token no es válido
                    }
                    else{
                        console.error('Usuario no encontrado');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario no valido");
                        return '/error'; // Devuelve false si el token no es válido
                    }
                }
            }
            
        }
    } catch (error) {
        console.error('Error al validar el token:', error);
        // Aquí puedes manejar errores de red u otros errores
        return false; // Devuelve false en caso de error
    }
}
