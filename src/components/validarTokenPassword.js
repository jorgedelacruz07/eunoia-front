import axios from 'axios';

export default async function validaTokenPassword(email,password) {
    try {
        // Enviar el token al backend
        debugger
        const response = await axios.post("http://localhost:8080/usuarioApi/validarUsuarioPassword", {
            correo: email,
            password: password
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
            return {path:'/tutor',id:response.data.id}; // Devuelve true si el token es válido
        } else {
            if(response.data.resultado == 'Alumno'){
                console.error('Usuario Alumno');
                // Aquí puedes manejar el caso en el que el token no es válido
                alert("usuario Alumno");
                return {path:'/alumno',id:response.data.id}; // Devuelve false si el token no es válido
            }
            else{
                if(response.data.resultado == 'Coordinador'){
                    console.error('Usuario Coordinador');
                    // Aquí puedes manejar el caso en el que el token no es válido
                    alert("usuario Coordinador");
                    return {path:'/coordinador',id:response.data.id}; // Devuelve false si el token no es válido
                }
                else{
                    if(response.data.resultado == 'Administrador'){
                        console.error('Usuario Administrador');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario Administrador");
                        return {path:'/admin',id:response.data.id}; // Devuelve false si el token no es válido
                    }
                    else{
                        console.error('Usuario no encontrado');
                        // Aquí puedes manejar el caso en el que el token no es válido
                        alert("usuario no valido");
                        return {path:'/error',id:response.data.id}; // Devuelve false si el token no es válido
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
