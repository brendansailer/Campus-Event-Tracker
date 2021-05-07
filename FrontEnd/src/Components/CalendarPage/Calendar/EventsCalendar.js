import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventsCalendar.css"

moment.locale();
const localizer = momentLocalizer(moment);

export default function EventsCalendar(props) {
    const transformedEvents = props.events.map(e => {
        return {id: e.event_id, start: moment(e.start_time).toDate(), end: moment(e.end_time).toDate(), title: e.event_description}
    })
    console.log(transformedEvents)
    return (
        <div className="events-calendar">
            <Calendar
                localizer={localizer}
                events={transformedEvents}
                style={{ height: 600 }}
            />
        </div>
    )
  }