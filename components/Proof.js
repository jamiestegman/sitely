import styled from 'styled-components';

const Wrapper = styled.div`
  & p {
    font-size: 14px;
    line-height: 1.3;
    border-bottom: dashed 1px #858f9bbb;
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    & p {
      font-size: 12px;
    }
  }
`

function Proof() {

  return(
    <>
      <Wrapper>
        <p>Join 120+ developers already a part of the community.</p>
      </Wrapper>
    </>
  )
}

export default Proof;