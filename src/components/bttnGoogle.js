"use client";
import decodeJwt from '@/utils/decodeJwt';
import { GoogleLogin, GoogleOAuthProvider,CredentialResponse } from '@react-oauth/google';
import validaToken from './validarToken';

const Login = () => {

    function handleError(){
        console.log("inicio incorrecto");
    }

    function handleSuccess(CredentialResponse){
        console.log("inicio Exitoso",CredentialResponse);
        if(CredentialResponse.credential){
            const {payload} = decodeJwt(CredentialResponse.credential);
            console.log(payload);
            const validado=validaToken(payload.email);
        }
    }

    return <div>
        <GoogleLogin onError={handleError} onSuccess={handleSuccess} width={200} />
    </div>


};
export default Login;