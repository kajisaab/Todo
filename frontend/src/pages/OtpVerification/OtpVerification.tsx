import { OtpVerifyWrapper } from './OtpVerificationStyled';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../Home/authFunction';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const padTime = (time: any) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time: any) => {
  const minutes = Math.floor(time / 60);

  const seconds = time % 60;
  return ` 0${minutes} : ${padTime(seconds)}`;
};

function OtpVerification() {
  const { email } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [otpValue, setOtpvalue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let timer: any;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  const blurFunction = (e: any) => {
    if (e.target.value.length === 0) {
      setError(true);
    }
  };

  const onChange = (value: string) => {
    if (value.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
    setOtpvalue(value);
  };

  const onOTPResendSuccess = () => {
    enqueueSnackbar('Please check your email for OTP', {
      variant: 'success',
      preventDuplicate: true,
    });
    setCounter(() => 300);
  };

  const onOTPResendFailure = () => {
    enqueueSnackbar('Could not resend OTP', {
      variant: 'error',
      preventDuplicate: true,
    });
  };

  const reSendOTP = () => {
    authAPI(
      'resend-otp',
      { email: email },
      onOTPResendSuccess,
      onOTPResendFailure
    );
  };

  const onCLick = async () => {
    const data = {
      email: email,
      otp: Number(otpValue),
    };
    try {
      const response = await axios.post<any, any>(`auth/verify-OTP`, data);
      enqueueSnackbar(response.data, {
        variant: 'success',
        preventDuplicate: true,
      });
      navigate('/Sign In');
    } catch (err) {
      enqueueSnackbar('OTP does not match', {
        variant: 'error',
        preventDuplicate: true,
      });
    }
  };
  return (
    <OtpVerifyWrapper>
      <div className='center_container'>
        <span className='heading'>Verify OTP</span>
        <div className='otp_message'>
          <span>Please enter the One-Time Passcode to verify your account</span>
          <span>
            A One-Time Password has been sent to : <strong>{email}</strong>
          </span>
        </div>
        <div className='input_fields'>
          <InputField
            name='opt'
            title='OTP Code'
            type='text'
            value={otpValue}
            placeholder='Enter your otp code'
            onBlurFunction={(e: any) => blurFunction(e)}
            required
            error={error}
            errorMessage={'Otp code is required'}
            onChange={(e: Event & { target: HTMLInputElement }) =>
              onChange(e.target.value)
            }
          />
        </div>

        <Button
          onClick={() => onCLick()}
          disabled={error || !otpValue}
          title='Verify OTP'
        />
        <Button
          onClick={() => reSendOTP()}
          disabled={counter !== 0}
          title='Resend'
        />
        <div className='timer_section'>
          <span>Please wait for : </span>
          <strong> {format(counter)}</strong> to resend OTP
        </div>
      </div>
    </OtpVerifyWrapper>
  );
}

export default OtpVerification;
