import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 0.9em;
  margin-bottom: 0.75rem;
  color: var(--textColor);
`

const Field = styled.input`
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  flex: 1;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--inputColor);
  backdrop-filter: saturate(200%) blur(20px);
  color: var(--titleColor);
  border: none;
  border-radius: var(--radius);
  transition: var(--transitionSlow);

  &:focus {
    background-color: var(--inputFocusColor);
  }

  &::placeholder {
    color: var(--textColor);
    opacity: 0.5;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`

function Input(props) {
  return(
    <Wrapper>
      {props.label && <Label for={props.name}>{props.label}</Label> }
      <Field type={props.type} name={props.name} placeholder={props.placeholder ? props.placeholder : props.name} />
    </Wrapper>
  )
}

export default Input;