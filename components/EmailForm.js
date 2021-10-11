import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import Proof from './Proof';

const CTA = styled.form`
  display: flex;
  margin-bottom: ${props => props.margin ? props.margin : '1rem'};

  & > * + * {
    margin-left: 0.5rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    & > * + * {
      margin: auto;
      margin-top: 1rem;
    }
  }
`

function EmailForm(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }


  return(
    <>
      <CTA margin={props.margin} onSubmit={handleSubmit}>
        <Input name="Email" type="email" placeholder="Enter email address" />
        <Button primary willLoad type="submit" link="/">Get Access</Button>
      </CTA>
      <Proof />
    </>
  )
}

export default EmailForm;