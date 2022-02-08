import styled from 'styled-components';

export const Form: React.FC<Props> = ({onSubmit, children}) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
    >
      {children}
    </StyledForm>
  );
}

export const StyledForm = styled.form`
  display: flex;
`

interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
}
