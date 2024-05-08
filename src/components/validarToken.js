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

        debugger
        // Verificar el resultado de la validación
        if (response.data.resultado === 'Tutor') {
            console.log('Usuario Tutor');
            // Aquí puedes realizar acciones adicionales si el token es válido
            alert("usuario Tutor");
            return {path:'/tutor/citas',id:response.data.id}; // Devuelve true si el token es válido
        } else {
            if(response.data.resultado == 'Alumno'){
                console.error('Usuario Alumno');
                // Aquí puedes manejar el caso en el que el token no es válido
                alert("usuario Alumno");
                return {path:'/alumno/citas',id:response.data.id}; // Devuelve false si el token no es válido
            }
            else{
                if(response.data.resultado == 'Coordinador'){
                    console.error('Usuario Coordinador');
                    // Aquí puedes manejar el caso en el que el token no es válido
                    alert("usuario Coordinador");
                    return {path:'/coordinador/usuarios',id:response.data.id}; // Devuelve false si el token no es válido
                }
                else{
                    if(response.data.resultado == 'Administrador'){
                        console.error('Usuario Administrador');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario Administrador");
                        return {path:'/admin/institucion',id:response.data.id}; // Devuelve false si el token no es válido
                    }
                    else{
                        console.error('Usuario no encontrado');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario no valido");
                        return {path:'/login',id:response.data.id}; // Devuelve false si el token no es válido
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

