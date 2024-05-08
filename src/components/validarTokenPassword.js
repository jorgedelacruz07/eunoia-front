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
            return {path:'/tutor/citas',id:response.data.id}; // Devuelve true si el token es válido
        } else {
            if(response.data.resultado == 'Alumno'){
                return {path:'/alumno/citas',id:response.data.id}; // Devuelve false si el token no es válido
            }
            else{
                if(response.data.resultado == 'Coordinador'){
                    return {path:'/coordinador/usuarios',id:response.data.id}; // Devuelve false si el token no es válido
                }
                else{
                    if(response.data.resultado == 'Administrador'){
                        return {path:'/admin/institucion',id:response.data.id}; // Devuelve false si el token no es válido
                    }
                    else{
                        console.error('Usuario no encontrado');
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
