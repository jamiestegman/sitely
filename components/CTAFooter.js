import styled from 'styled-components';
import Logo from './Logo';
import EmailForm from './EmailForm';

const Wrapper = styled.div`
  padding-top: 120px;
  border-top: solid 1px var(--accentColor);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;


  & > h5 {
    font-size: 2.2em;
    line-height: 1.1em;
    margin-bottom: 1.5rem;

    & u {
      text-decoration: none;
      outline-bottom: solid 5px var(--primaryColor);
      position: relative;
    }

    & u:before {
      display: inline-block;
      position: absolute;
      bottom: 0;
      z-index: -1;

      background: var(--primaryColor);
      content: "";
      opacity: .6;
      height: 25%;
      border-radius: 4px;
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    padding: 30px;

    & > h5 {
      font-size: 26px;
      margin-bottom: 1.5rem;
    }
  }
`

function CTAFooter({ props }) {
  return(
    <Wrapper>
      <h5>Get content just like this in your inbox for <u>free</u>, every week.</h5>
      <EmailForm />
    </Wrapper>
  )
}

export default CTAFooter;