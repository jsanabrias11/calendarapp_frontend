import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';

import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}


export const LoginPage = () => {

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange} = useForm( registerFormFields );

    const { startLogin, startRegister, errorMessage,  } = useAuthStore();

    const LoginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email:loginEmail, password:loginPassword } );
    }

    const RegisterSubmit = ( event ) => {
        event.preventDefault();
        console.log({ registerName, registerEmail, registerPassword, registerPassword2 });
        if(registerPassword !== registerPassword2){
            Swal.fire('Error al registrar usuario', 'Las claves deben ser iguales', 'error');
        }

        startRegister({name: registerName, email: registerEmail, password: registerPassword});
    }

    useEffect(() => {
        if(errorMessage !== undefined ){
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [ errorMessage ])
    
    // const nDate = new Date()
    // console.log(nDate);

    const ScheduleDay = (fecha) => {
        console.log(new Date().setDate(3));
        console.log(new Date().setDate(1));

        let previo = new Date(fecha.getFullYear(), 0, 0);
        let actual = new Date(fecha.getTime());
        
        console.log(previo);
        console.log(actual);
        console.log(actual - previo);
        console.log((actual - previo + 1));
        console.log((actual - previo + 1) / 86400000);
        console.log(Math.ceil(actual - previo + 1) / 86400000);
      };

    ScheduleDay(new Date);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ LoginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ RegisterSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}