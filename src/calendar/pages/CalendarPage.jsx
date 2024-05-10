import { useState } from 'react';

import { Calendar } from 'react-big-calendar';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { getMessages, localizer } from '../../helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { useEffect } from 'react';


export const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const { user } = useAuthStore();

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({ event, start, end, isSelected });
    const colorDefault = '#0046F4';
    
    const isMyEvent = (event.user._id === user.uid || event.user._id === user.id)

    const color = isMyEvent ? colorDefault : '#6D6D6D';

    const style = {
      backgroundColor: color,
      boderRadius: '0px',
      opacity: 0.8,
      color: 'black'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    //console.log({ DoubleClick : event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    console.log({ Click : event });
    setActiveEvent( event )
  }

  const onViewChanged = ( event ) => {
    console.log({ ViewChanged : event });
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        onView={ onViewChanged }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)'  }}
        messages={ getMessages() }
        //eventPropGetter={  eventPropGetter}
        components={{
          event : CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
