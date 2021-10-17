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

  async function handleSubmit(e) {
    e.preventDefault();

    // const email = e.target.querySelector('input').value;
    // axios
    // .put("api/mail", {
    //   email,
    // })
    // .then((result) => {
    //   if (result.status === 200) {
    //     console.log(result.data.message)
    //     // setLoading(false);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   // setLoading(false);
    // });
  }


  return(
    <>
      <CTA margin={props.margin} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Enter email address" />
        <Button primary type="submit" link="/">Get Access</Button>
      </CTA>
      <Proof />
    </>
  )
}

export default EmailForm;