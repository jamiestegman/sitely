import styled from 'styled-components';

const Container = styled.div`
  max-width: 1296px;
  margin-right: auto;
  margin-left: auto;
  padding-top: calc(var(--headerHeight) + var(--layoutGap));
  padding-right: 80px;
  padding-left: 80px;
  padding-bottom: 4rem;

  @media (max-width: 600px) {
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`

export default Container;