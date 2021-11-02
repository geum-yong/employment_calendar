import styled from 'styled-components';
import CalendarGrid from '../components/CalendarGrid';
import CalendarHeader from '../components/CalendarHeader';

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Calendar = () => {
  return (
    <Container>
      <CalendarHeader />
      <CalendarGrid />
    </Container>
  );
};

export default Calendar;
