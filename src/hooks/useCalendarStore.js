import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, outEventModal, onLoadEvents } from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispath = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    const setActiveEvent = ( calendarEvent ) => {
        dispath( onSetActiveEvent( calendarEvent ) )
    }

    const outEventsModal = (calendarEvent) => {
        dispath( outEventModal(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        try {
            if ( calendarEvent.id ){
                // Actualizando
                await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
                dispath( onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
    
            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispath( onAddNewEvent({...calendarEvent, id: data.evento.id, user }) ); 
        } catch (error) {
            console.log(error);
            dispath( outEventModal(calendarEvent) );
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
        
        
    }

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`events/${activeEvent.id}`);
            dispath( onDeleteEvent() )
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error');
        }
        
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');            
            const eventos = convertEventsToDateEvents( data.eventos );
            dispath( onLoadEvents(eventos));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSeleted: !!activeEvent,
        // Métodos
        outEventsModal,
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
