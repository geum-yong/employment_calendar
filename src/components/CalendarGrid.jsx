import moment from 'moment';
import styled from 'styled-components';
import Day from './Day';

const CalendarBox = styled.div`
  border: 1px solid #eee;

  .calendar-header {
    display: flex;
    background-color: rgb(179, 179, 179);

    .calendar-header-day {
      flex: 1;
      padding: 4px 0 2px;
      text-align: center;
      font-size: 12px;
      color: #fff;

      &:not(:last-child) {
        border-right: 1px solid #eee;
      }
    }
  }
`;

const CalendarRow = styled.div`
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarGrid = ({ date, currentList, firstWeek, lastWeek, setModal }) => {
  const calendarArr = () => {
    const result = [];

    for (let week = firstWeek; week <= lastWeek; week++) {
      result.push(generateRow(week));
    }

    return result;
  };

  const generateRow = week => (
    <CalendarRow className='row' key={week}>
      {Array(7)
        .fill(0)
        .map((_, i) => {
          const current = date.clone().week(week).startOf('week').add(i, 'day');
          const isSelected = moment().format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';

          return <Day key={current.format('YYYYMMDD')} current={current} currentList={currentList} isSelected={isSelected} setModal={setModal} />;
        })}
    </CalendarRow>
  );

  return (
    <CalendarBox>
      <div className='calendar-header'>
        {DAYS.map(day => (
          <p className='calendar-header-day' key={day}>
            {day}
          </p>
        ))}
      </div>
      {calendarArr()}
    </CalendarBox>
  );
};

export default CalendarGrid;
