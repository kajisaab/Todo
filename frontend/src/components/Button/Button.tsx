import { ButtonWrapper } from './ButtonStyled';
import { ButtonInterface } from './ButtonInterface';

function Button(props: ButtonInterface): JSX.Element {
  const { title, onClick, disabled } = props;
  return (
    <ButtonWrapper onClick={(e) => onClick(e)} disabled={disabled || false}>
      {title}
    </ButtonWrapper>
  );
}

export default Button;
