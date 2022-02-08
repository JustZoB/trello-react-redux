import styled from 'styled-components';

export const StyledCard = styled.div<CardProps>`
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 14px;
  padding: 10px;
  background-color: ${(props) => (props.variant === 'secondary' ? '#DDDDDD' : 'white')};
  border-radius: 3px;
  box-shadow: ${(props) => (props.variant === 'secondary' ? '0' : '0 2px 0 0 rgba(34, 60, 80, 0.2)')};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.variant === 'secondary' ? '#EEEEEE' : 'aliceblue')};
  }
`

StyledCard.defaultProps = {
  variant: 'primary'
}

interface CardProps {
  variant?: string,
}
