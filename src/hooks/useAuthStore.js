import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispath = useDispatch();

    const startLogin = async({ email, password }) => {
        dispath( onChecking());
        try {            
            const { data } = await calendarApi.post('/auth', {email, password})
            localStorage.setItem('token', data.token);    
            localStorage.setItem( 'token-init-date', new Date().getTime() );    
            dispath(onLogin({ name: data.name, uid: data.uid }) )

        } catch (error) {
            dispath( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispath( clearErrorMessage() );
            }, 10);
        }
        
    }

    const startRegister = async({ name, email, password }) => {
        dispath( onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);    
            localStorage.setItem( 'token-init-date', new Date().getTime() ); 
            dispath(onLogin({ name: data.name, uid: data.uid }) )
        } catch( error ) {
            
            dispath( onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispath( clearErrorMessage() );
            }, 10);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispath( onLogoutCalendar() );
        dispath( onLogout());
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispath( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);    
            localStorage.setItem( 'token-init-date', new Date().getTime() ); 
            dispath(onLogin({ name: data.name, uid: data.uid }) )
        } catch (error) {
            localStorage.clear();
            dispath( onLogout() );
        }
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Métodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
    }

}