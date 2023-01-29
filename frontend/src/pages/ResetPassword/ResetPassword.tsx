import { ResetPasswordWrapper } from './ResetPasswordStyled';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface ParamsInterface {
  id?: string;
  token?: string;
}

interface InputValueInterface {
  password: string;
  repassword: string;
}

interface ErroStateInterface {
  password: boolean;
  repassword: boolean;
}

const initialErroState = {
  password: false,
  repassword: false,
};

const initialInputState = {
  password: '',
  repassword: '',
};

const passwordRegex: any =
  /^(?=.*[a-z].*[a-z])(?=.*[!"#...\d].*[!"#...\d]).{8,}$/gim;

function ResetPassword(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<InputValueInterface>({
    ...initialInputState,
  });
  const [errorState, setErrorState] = useState<ErroStateInterface>({
    ...initialErroState,
  });
  const [errorMessage, setErrorMessage] = useState<InputValueInterface>({
    password: 'Password is required',
    repassword: 'Repassword is required',
  });
  const params: any = useParams();
  const { token }: ParamsInterface = params;
  const { enqueueSnackbar } = useSnackbar();

  const blurFunction = (e: any) => {
    const { name } = e.nativeEvent.target;
    const { value } = e.target;
    if (value.length === 0) {
      setErrorState({ ...errorState, [name]: true });
    }

    if (name === 'password') {
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
  };

  const onChangeEvent = (e: any) => {
    if (e.target.name === 'repassword') {
      if (e.target.value !== inputValue.password) {
        setErrorMessage({
          ...errorMessage,
          repassword: 'Password does not match',
        });
        setErrorState({ ...errorState, repassword: true });
      } else {
        setErrorState({ ...errorState, repassword: false });
      }
    }
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onResetPasswordSuccess = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      preventDuplicate: true,
    });
    navigate('/');
  };

  const onFailure = (err: string) => {
    enqueueSnackbar(err, {
      variant: 'error',
      preventDuplicate: true,
    });
  };

  const onCLick = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        'auth/forgotPassword',
        { password: inputValue.password },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const message: string = await response.data;
      onResetPasswordSuccess(message);
    } catch (err: any) {
      onFailure(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResetPasswordWrapper>
      <div className='center_container'>
        <span className='heading'>Reset Password</span>
        <div className='input_fields'>
          <InputField
            name='password'
            title='New Password'
            type='password'
            value={inputValue.password}
            placeholder='Enter your password'
            onBlurFunction={(e: any) => blurFunction(e)}
            required
            error={errorState.password}
            errorMessage={errorMessage.password}
            onChange={(e: Event & { target: HTMLInputElement }) =>
              onChangeEvent(e)
            }
          />
          <InputField
            name='repassword'
            title='Retype Password'
            type='password'
            value={inputValue.repassword}
            placeholder='Re-Enter your password'
            onBlurFunction={(e: any) => blurFunction(e)}
            required
            error={errorState.repassword}
            errorMessage={errorMessage.repassword}
            onChange={(e: Event & { target: HTMLInputElement }) =>
              onChangeEvent(e)
            }
          />
        </div>

        <Button
          onClick={() => onCLick()}
          disabled={
            errorState.password ||
            !inputValue.password ||
            !inputValue.repassword ||
            errorState.repassword ||
            loading
          }
          title='Reset Password'
        />
      </div>
    </ResetPasswordWrapper>
  );
}

export default ResetPassword;
