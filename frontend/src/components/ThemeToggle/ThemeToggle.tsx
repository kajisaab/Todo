import { useState } from 'react';
import { ThemeToggleInterface } from './ThemeToggleInterface';
import { ThemeToggleWrapper } from './ThemeToggleStyled';
import { viewMode } from '../../features/users/userDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CiLight, CiDark } from 'react-icons/ci';
import axios from 'axios';

type ResponseProps = {
  darkMode: boolean;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  user_id: number;
};

function ThemeToggle(props: ThemeToggleInterface) {
  const { darkMode, userDetails } = useAppSelector(
    (state) => state.userDetails
  );
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(() => darkMode || false);

  const onChangeTheme = async () => {
    axios
      .patch<ResponseProps, any>(`auth/update-user/${userDetails.user_id}`, {
        darkMode: darkMode ? 'false' : 'true',
      })
      .then((res) => {
        dispatch(viewMode(res.data.darkMode));
        setToggle(!toggle);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ThemeToggleWrapper toggle={toggle}>
      <div className='toggle_path' onClick={() => onChangeTheme()}>
        <div className='toggle_background_first'></div>
        <div className='toggle_background_second'></div>
      </div>
      <div className='toggle_background_bulb' onClick={() => onChangeTheme()}>
        {!toggle ? <CiLight /> : <CiDark />}
      </div>
    </ThemeToggleWrapper>
  );
}

export default ThemeToggle;
