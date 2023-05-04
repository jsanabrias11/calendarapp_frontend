import { useDispatch, useSelector } from 'react-redux';
import { onOpenDateModal, onCloseDateModal } from '../store';

export const useUiStore = () => {

    const dispath = useDispatch();

    const {
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispath( onOpenDateModal() )
    }

    const closeDateModal = () => {
        
        dispath( onCloseDateModal() )
    }
  
  
    return {
        // Propiedades
        isDateModalOpen,

        // Métodos
        openDateModal,
        closeDateModal,
    }
}
