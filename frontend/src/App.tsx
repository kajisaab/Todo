import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { MyGlobalStyle } from './app/GlobalTheme/MyGlobalStyle';
import { useAppSelector } from './app/hooks';
import Landing from './pages/Landing';
import Todo from './pages/Todo';
import PageNotFound from './pages/404Page';
import { ProtectedRoutes } from './app/PrivateRoute';
function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.userDetails);
  return (
    <>
      <MyGlobalStyle darkMode={darkMode} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
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
