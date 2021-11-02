import { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Header = styled.div`
  display: flex;
  padding: 5px 0;
  justify-content: center;

  .current-date {
    width: 90px;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: rgb(255, 119, 48);
  }

  .date-controller {
    font-size: 1.1rem;
  }
`;

const CalendarHeader = () => {
  const [date, setDate] = useState(moment());

  // 이전달 버튼 클릭
  const onPriviousButton = () => {
    setDate(date.clone().subtract(1, 'month'));
  };

  // 다음달 버튼 클릭
  const onNextButton = () => {
    setDate(date.clone().add(1, 'month'));
  };

  return (
    <Header>
      <button className='date-controller' aria-label='이전달' onClick={onPriviousButton}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <p className='current-date'>{date.format('YYYY.MM')}</p>
      <button className='date-controller' aria-label='다음달' onClick={onNextButton}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </Header>
  );
};

export default CalendarHeader;
