import styled from 'styled-components';

const ContainerBox = styled.div`
  margin: 0 auto;
  width: 1000px;
  background-color: green;
`;

const Container = ({ children }) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default Container;
