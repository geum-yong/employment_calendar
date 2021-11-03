import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 900px;
    max-height: 80vh;
    border-radius: 5px;
    background-color: #fff;
    overflow: auto;

    .modal-header {
      display: flex;
      padding: 15px;
      border-bottom: 1px solid #eee;

      .company-image-box {
        display: flex;
        align-self: center;
        width: 100px;
        height: 60px;
        margin-right: 20px;

        .company-image {
          width: 100%;
          vertical-align: top;
          object-fit: contain;
        }
      }

      .company-info-box {
        padding-top: 10px;

        .company-name {
          margin-bottom: 15px;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .company-date {
          font-size: 0.9rem;

          .diff-day {
            margin-left: 5px;
            color: rgb(255, 119, 48);
          }
        }
      }
    }

    .company-contents {
      padding: 15px;
      text-align: center;
    }

    .close-modal {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 30px;
      color: rgb(193, 193, 193);
    }
  }
`;

const CompanyModal = ({ current, setModal }) => {
  const onCloseModal = ({ target }) => {
    if (target.dataset.close || target.tagName === 'path' || target.tagName === 'svg')
      setModal({
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
  };

  const diffDay = () => {
    const endDate = dayjs(current.end_time).startOf('day');
    const today = dayjs().startOf('day');

    // 마감일 지나기 전
    if (endDate.isAfter(today)) {
      return `${endDate.diff(today, 'days')}일 전`;
    }

    // 마감일 지난 후
    if (endDate.isBefore(today)) {
      return `${today.diff(endDate, 'days')}일 지남`;
    }

    return '오늘';
  };

  return (
    <ModalBox data-close='true' onClick={onCloseModal}>
      <div className='modal-box'>
        <div className='modal-header'>
          <div className='company-image-box'>
            <img className='company-image' src={current.image} alt='current.name' />
          </div>
          <div className='company-info-box'>
            <p className='company-name'>{current.name}</p>
            <p className='company-date'>
              {dayjs(current.start_time).format('YYYY.MM.DD HH:mm')} ~ {dayjs(current.end_time).format('YYYY.MM.DD HH:mm')}
              <span className='diff-day'>({diffDay()})</span>
            </p>
          </div>
        </div>
        <div className='company-contents' dangerouslySetInnerHTML={{ __html: current.content }}></div>
        <button className='close-modal' aria-label='모달창 닫기' data-close='true'>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </ModalBox>
  );
};

export default CompanyModal;
