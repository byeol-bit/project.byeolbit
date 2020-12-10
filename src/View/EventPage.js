import { useState } from 'react';
import '../css/EventPage.scss'
import EventItem from '../Component/EventItem.js';

function EventPage() {


  return (
    <div className="view-wrap">
      <EventItem></EventItem>
    </div>
  )
}

export default EventPage;
