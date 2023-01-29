import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { MyGlobalStyle } from './app/GlobalTheme/MyGlobalStyle';
import { useAppSelector } from './app/hooks';
import Landing from './pages/Landing';
import Todo from './pages/Todo';
import PageNotFound from './pages/404Page';
import { ProtectedRoutes } from './app/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import OtpVerification from './pages/OtpVerification';

function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.userDetails);
  return (
    <>
      <MyGlobalStyle darkMode={darkMode} />
      <BrowserRouter>
        <Routes>
          <Route path='/:page?' element={<Home />} />
          <Route path='/verify-otp/:email' element={<OtpVerification />} />
          <Route
            path={`/reset-password/:id/:token`}
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path='/landing' element={<Landing />} />
            <Route path='/todo' element={<Todo />} />
          </Route>
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
