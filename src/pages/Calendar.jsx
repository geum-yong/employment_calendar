import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from '../components/CalendarGrid';
import CalendarHeader from '../components/CalendarHeader';
import CompanyModal from '../components/CompanyModal';

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`;

const Calendar = () => {
  const [date, setDate] = useState(dayjs());
  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [modal, setModal] = useState({
    isView: false,
    current: {
      id: '',
      image: '',
      name: '',
      start_time: '',
      end_time: '',
      content: ``,
    },
  });

  const firstWeek = date.startOf('month').week();
  const lastWeek = date.endOf('month').week() === 1 ? 53 : date.clone().endOf('month').week();
  const firstDay = date.week(firstWeek).startOf('week');
  const lastDay = date.week(lastWeek).endOf('week');

  useEffect(() => {
    const getList = async () => {
      const { data } = await axios.get('https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json');
      setList(data);
    };

    getList();
  }, []);

  useEffect(() => {
    const selectedList = list.filter(item => dayjs(item.start_time).isBetween(firstDay, lastDay) || dayjs(item.end_time).isBetween(firstDay, lastDay));
    setCurrentList(selectedList);
  }, [date, list]);

  console.log(currentList);

  return (
    <Container>
      <CalendarHeader date={date} setDate={setDate} />
      <CalendarGrid date={date} currentList={currentList} firstWeek={firstWeek} lastWeek={lastWeek} setModal={setModal} />
      {modal.isView && <CompanyModal current={modal.current} setModal={setModal} />}
    </Container>
  );
};

export default Calendar;
