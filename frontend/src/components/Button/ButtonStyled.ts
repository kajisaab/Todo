import styled from 'styled-components';

type Props = {
  disabled: boolean;
};
const ButtonWrapper = styled.button<Props>`
  outline: 0;
  border: none;
  background-color: ${(props) =>
    !props.disabled ? props.theme.button.primary : 'gray'};
  color: #fafafa;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  -webkit-box-shadow: -4px 5px 10px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -4px 5px 10px -5px rgba(0, 0, 0, 0.75);
  box-shadow: -4px 5px 10px -5px rgba(0, 0, 0, 0.75);
  font-weight: bold;
`;

export { ButtonWrapper };
