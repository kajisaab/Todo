import InputField from '../InputField';
import { FormContainerwrapper } from './FormStyled';
import Select from '../Select';
import { useState } from 'react';
interface Props {
  type: string;
  inputValue: any;
  setInputValue: Function;
  errorState: any;
  setErrorState: any;
}

interface InputInterface {
  field: string;
  type: string;
  title: string;
  required?: boolean;
}

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const passwordRegex: any =
  /^(?=.*[a-z].*[a-z])(?=.*[!"#...\d].*[!"#...\d]).{8,}$/gim;
const signup: InputInterface[] = [
  { field: 'firstName', type: 'text', title: 'First Name', required: true },
  { field: 'lastName', type: 'text', title: 'Last Name', required: true },
  { field: 'address', type: 'text', title: 'Address' },
  { field: 'email', type: 'email', title: 'Email', required: true },
  { field: 'password', type: 'password', title: 'Password', required: true },
  {
    field: 'repassword',
    type: 'password',
    title: 'Re-Password',
    required: true,
  },
  { field: 'gender', type: 'select', title: 'Gender', required: true },
];

const signin: InputInterface[] = [
  { field: 'email', type: 'email', title: 'Email', required: true },
  { field: 'password', type: 'password', title: 'Password', required: true },
];

const forgotPassword: InputInterface[] = [
  { field: 'email', type: 'email', title: 'Email', required: true },
];

const genderOption: {
  label: string | number;
  value: string | number;
  detail?: object | null;
}[] = [
  {
    label: 'Male',
    value: 'Male',
    detail: null,
  },
  { label: 'Female', value: 'Female', detail: null },
];

function FormContainer(props: Props): JSX.Element {
  const { type, inputValue, setInputValue, errorState, setErrorState } = props;
  const [errorMessage, setErrorMessage] = useState<any>({
    firstName: 'First Name is required',
    lastName: 'Last Name is required',
    email: 'Email is required',
    address: '',
    gender: 'Gender is required',
    password: 'Password is required',
    repassword: 'Repassword is required',
  });
  const blurFunction = (e: any) => {
    const { name } = e.nativeEvent.target;
    const { value } = e.target;

    if (value.length === 0) {
      setErrorState({ ...errorState, [name]: true });
    }

    if (name === 'password' && type === 'Sign Up') {
      if (!passwordRegex.test(value)) {
        setErrorMessage({
          ...errorMessage,
          password:
            'Password should be of 8 digit, 2 letters and 2 digis or symbol minimum',
        });
        setErrorState({ ...errorState, password: true });
      } else {
        setErrorState({ ...errorState, password: false });
      }
    }

    if (name === 'repassword') {
      if (value !== inputValue.password) {
        setErrorMessage({
          ...errorMessage,
          repassword: 'Password does not match',
        });
        setErrorState({ ...errorState, repassword: true });
      } else {
        setErrorState({ ...errorState, repassword: false });
      }
    }

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrorMessage({
          ...errorMessage,
          email: 'Please enter a valid email',
        });
        setErrorState({ ...errorState, email: true });
      } else {
        setErrorState({ ...errorState, email: false });
      }
    }
  };

  const onChangeEvent = (e: any, type: string) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (value.length > 0) {
      setErrorState({ ...errorState, [name]: false });
    }
  };
  return (
    <FormContainerwrapper type={type}>
      {(type === 'Sign Up'
        ? signup
        : type === 'Sign In'
        ? signin
        : forgotPassword
      ).map((field, ind) =>
        field.type !== 'select' ? (
          <InputField
            key={ind}
            name={field.field}
            title={field.title}
            type={field.type}
            value={inputValue[field.field]}
            placeholder={`Enter ${field.title}`}
            onBlurFunction={(e: any) => blurFunction(e)}
            error={errorState[field.field]}
            errorMessage={
              Object.values(errorState).includes(true) &&
              errorMessage[field.field]
            }
            required={field.required}
            onChange={(e: Event & { target: HTMLInputElement }, type: string) =>
              onChangeEvent(e, type)
            }
          />
        ) : (
          <div className='select_container' key={ind}>
            <Select
              withText={false}
              placeholder={'Select Gender'}
              data={genderOption}
              onClick={() => {}}
            />
          </div>
        )
      )}
    </FormContainerwrapper>
  );
}

export default FormContainer;
