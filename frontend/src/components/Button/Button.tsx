import { ButtonWrapper } from './ButtonStyled';
import { ButtonInterface } from './ButtonInterface';

function Button(props: ButtonInterface): JSX.Element {
  const { title, onClick, disabled, width = 120 } = props;
  return (
    <ButtonWrapper
      onClick={(e) => onClick(e)}
      disabled={disabled || false}
      width={width}
    >
      {title}
    </ButtonWrapper>
  );
}

export default Button;
