import { useAppDispatch, useAppSelector } from '../reduxStore/hooks';
import { dark, light, userDetails } from '../reduxSlices/userInfoSlice';
import { useLayoutEffect } from 'react';
import { MyGlobalStyle } from '@/GlobalTheme/MyGlobalStyle';

export default function Home() {
  const { darkMode, userDetails } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log({ darkMode });

  useLayoutEffect(() => {
    dispatch(dark());
  }, [dispatch]);
  return (
    <>
      <MyGlobalStyle darkMode={darkMode} />

      <span>Landing Page</span>
    </>
  );
}
