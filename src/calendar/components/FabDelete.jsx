
import { useSelector } from "react-redux";
import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSeleted } = useCalendarStore();
    const { isDateModalOpen } = useSelector(state => state.ui)

    const handleDelete = () => {
      startDeletingEvent();
    }


  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: hasEventSeleted && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
