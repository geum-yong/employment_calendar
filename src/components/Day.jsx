import moment from 'moment';
import styled from 'styled-components';

const DayBox = styled.div`
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

    .selected {
      padding: 1px 5px;
      border-radius: 50%;
      background-color: rgb(255, 119, 48);
      color: #fff;
    }
  }

  .day-contents {
    padding: 5px;
    min-height: 50px;

    .company-button {
      position: relative;
      padding-left: 20px;
      width: 100%;
      text-align: left;

      &:hover {
        color: rgb(255, 119, 48);
      }

      &.start-company::before,
      &.end-company::before {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1.5px 3px;
        border-radius: 5px;
        font-size: 0.5rem;
        color: #fff;
      }

      &.start-company::before {
        content: '시';
        background-color: rgb(255, 119, 48);
      }

      &.end-company::before {
        content: '끝';
        background-color: rgb(58, 71, 90);
      }
    }
  }
`;

const Day = ({ current, currentList, isSelected }) => {
  const startCompanyArr = currentList
    .filter(company => moment(company.start_time).startOf('day').isSame(current.format('YYYY-MM-DD')))
    .sort((company1, company2) => {
      if (company1.name < company2.name) return -1;
      if (company1.name > company2.name) return 1;
      return 0;
    });

  const endCompanyArr = currentList
    .filter(company => moment(company.end_time).startOf('day').isSame(current.format('YYYY-MM-DD')))
    .sort((company1, company2) => {
      if (company1.name < company2.name) return -1;
      if (company1.name > company2.name) return 1;
      return 0;
    });

  return (
    <DayBox className='day-box'>
      <p className='day-num'>
        <span className={isSelected}>{current.format('D')}</span>
      </p>
      <div className='day-contents'>
        {startCompanyArr.map(company => (
          <button key={company.id} className='company-button start-company'>
            {company.name}
          </button>
        ))}
        {endCompanyArr.map(company => (
          <button key={company.id} className='company-button end-company'>
            {company.name}
          </button>
        ))}
      </div>
    </DayBox>
  );
};

export default Day;
