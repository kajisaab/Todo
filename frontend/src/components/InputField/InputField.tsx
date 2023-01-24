import { InputFieldWrapper } from './InputFieldStyled';
import { InputFieldInterface } from './InputInterface';
import { forwardRef } from 'react';

function InputField(
  props: InputFieldInterface,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    name,
    title,
    value,
    type,
    placeholder,
    onChange,
    error,
    errorMessage,
    required,
    onBlurFunction,
  } = props;
  const onblur = (e: any) => {};

  return (
    <InputFieldWrapper>
      <div className='input_title'>
        {title} {required && <span className='required_notation'>*</span>}
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onBlur={(e) => {
          onBlurFunction ? onBlurFunction(e) : onblur(e);
        }}
        placeholder={placeholder}
        ref={ref}
        onChange={(e) => onChange(e, name)}
      />
      {error && <div className='error_message'>{errorMessage}</div>}
    </InputFieldWrapper>
  );
}

export default forwardRef(InputField);
