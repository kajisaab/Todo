import { HomeWrapper } from './HomeStyled';
import FormContainer from '../../components/FormContainer';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { authAPI } from './authFunction';
import {
  tokenRegistration,
  userDetails,
  viewMode,
} from '../../features/users/userDetailsSlice';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const initialErroState = {
  firstName: false,
  lastName: false,
  email: false,
  address: false,
  password: false,
  repassword: false,
  gender: false,
};

const initialInputState = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  password: '',
  repassword: '',
  gender: '',
};
function Home(): JSX.Element {
  const { page } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<any>({
    ...initialInputState,
  });
  const [errorState, setErrorState] = useState<any>({
    ...initialErroState,
  });
  const [authPage, setAuthPage] = useState('Sign Up');

  useEffect(() => {
    if (page) {
      setAuthPage(page);
    }
  }, [page]);

  const OtpVerifyNavigate = () => {
    navigate(`/verify-otp/${inputValue.email}`);
  };

  const onSuccess = (res: object) => {
    OtpVerifyNavigate();
    setInputValue({ ...initialInputState });
  };

  const onOTPResendSuccess = () => {
    OtpVerifyNavigate();
  };

  const onOTPResendFailure = () => {
    enqueueSnackbar('Could not resend OTP', {
      variant: 'error',
      preventDuplicate: true,
    });
  };

  const onFailure = (err: any) => {
    if (err.response.data === 'User is not verified') {
      authAPI(
        'resend-otp',
        { email: inputValue.email },
        onOTPResendSuccess,
        onOTPResendFailure
      );
      return;
    }
    enqueueSnackbar(err.response.data, {
      variant: 'error',
      preventDuplicate: true,
    });
  };

  const onLoginSuccess = (res: any) => {
    enqueueSnackbar('Successfully Logged In', {
      variant: 'success',
      preventDuplicate: true,
    });
    dispatch(viewMode(res.data.userDetails.darkMode));
    dispatch(tokenRegistration(res.data.token));
    dispatch(userDetails(res.data.userDetails));
    navigate('/landing');
  };

  const onFindPasswordSuccess = (res: { data: string }) => {
    enqueueSnackbar(res?.data, {
      variant: 'success',
      preventDuplicate: true,
    });
  };

  const auth = (type: string) => {
    if (type === 'signup') {
      const { repassword, ...rest } = inputValue;
      authAPI(type, rest, onSuccess, onFailure);
      return;
    }
    const { email, password } = inputValue;
    const data = { email: email, password: password };
    authAPI(type, data, onLoginSuccess, onFailure);
  };

  const onSubmit = () => {
    if (authPage === 'Sign Up') {
      inputValue.firstName &&
      inputValue.lastName &&
      inputValue.email &&
      !errorState.email &&
      inputValue.password &&
      !errorState.password &&
      inputValue.repassword &&
      !errorState.repassword
        ? auth('signup')
        : setErrorState({
            ...errorState,
            firstName: inputValue.firstName.length === 0,
            lastName: inputValue.lastName.length === 0,
            email: errorState.email || inputValue.email.length === 0,
            password: inputValue.password.length === 0,
            repassword: inputValue.repassword.length === 0,
          });
      return;
    }
    if (authPage === 'Sign In') {
      inputValue.email && !errorState.email && inputValue.password
        ? auth('signin')
        : setErrorState({
            ...errorState,
            email: errorState.email || inputValue.email.length === 0,
            password: inputValue.password.length === 0,
          });
    }
    if (authPage === 'Find Your Account') {
      inputValue.email && !errorState.email
        ? authAPI(
            'find-account',
            { email: inputValue.email },
            onFindPasswordSuccess,
            onFailure
          )
        : setErrorState({
            ...errorState,
            email: errorState.email || inputValue.email.length === 0,
          });
    }
  };

  return (
    <HomeWrapper type={authPage}>
      <div className='center_container'>
        <span className='heading'>{authPage}</span>
        <FormContainer
          type={authPage}
          inputValue={inputValue}
          setInputValue={setInputValue}
          errorState={errorState}
          setErrorState={setErrorState}
        />
        {authPage === 'Sign Up' && (
          <div className='forgot_password_container'>
            <span onClick={() => setAuthPage('Sign In')}>
              Already have account ?
            </span>
          </div>
        )}
        {authPage !== 'Sign Up' && (
          <div className='forgot_password_container'>
            <span onClick={() => setAuthPage('Find Your Account')}>
              Forgot Password ?
            </span>
          </div>
        )}

        <Button onClick={() => onSubmit()} title={authPage} />
      </div>
    </HomeWrapper>
  );
}

export default Home;
