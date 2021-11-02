import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from '../components/CalendarGrid';
import CalendarHeader from '../components/CalendarHeader';

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Calendar = () => {
  const [date, setDate] = useState(moment());

  return (
    <Container>
      <CalendarHeader date={date} setDate={setDate} />
      <CalendarGrid date={date} />
    </Container>
  );
};

export default Calendar;
