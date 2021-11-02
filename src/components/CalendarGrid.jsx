import styled from 'styled-components';

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

  .day-box {
    flex: 1;

    &:not(:last-child) {
      border-right: 1px solid #eee;
    }

    .day-num {
      padding: 5px 0 4px;
      background-color: rgb(245, 245, 245);
      text-align: center;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }

    .day-contents {
      padding: 5px;
      min-height: 50px;
    }
  }
`;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarGrid = ({ date }) => {
  const firstWeek = date.clone().startOf('month').week();
  const lastWeek = date.clone().endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();

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
          const isSelected = date.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';

          return (
            <div className='day-box' key={current.format('YYYYMMDD')}>
              <p className='day-num'>{current.format('D')}</p>
              <div className='day-contents'>test</div>
            </div>
          );
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
