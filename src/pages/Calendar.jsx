import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from '../components/CalendarGrid';
import CalendarHeader from '../components/CalendarHeader';

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Calendar = () => {
  const [date, setDate] = useState(moment());
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  const firstWeek = date.clone().startOf('month').week();
  const lastWeek = date.clone().endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
  const firstDay = date.clone().week(firstWeek).startOf('week');
  const lastDay = date.clone().week(lastWeek).endOf('week');

  useEffect(() => {
    const getList = async () => {
      const { data } = await axios.get('https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json');
      setList(data);
    };

    getList();
  }, []);

  useEffect(() => {
    const selectedList = list.filter(item => moment(item.start_time).isBetween(firstDay, lastDay) || moment(item.end_time).isBetween(firstDay, lastDay));
    setCurrentList(selectedList);
  }, [date, list]);

  console.log(currentList);

  return (
    <Container>
      <CalendarHeader date={date} setDate={setDate} />
      <CalendarGrid date={date} currentList={currentList} firstWeek={firstWeek} lastWeek={lastWeek} />
    </Container>
  );
};

export default Calendar;
