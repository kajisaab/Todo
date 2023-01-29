import { LandingWrapper } from './LandingStyled';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logout from '../../app/logout';
import { useSnackbar } from 'notistack';
import ThemeToggle from '../../components/ThemeToggle';

function Landing(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.userDetails);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  window.onpopstate = (event) => {
    navigate('/landing');
  };

  return (
    <LandingWrapper darkMode={darkMode}>
      <div className='toggle_section'>
        <ThemeToggle />
      </div>
      <Link to='/todo' style={{ textDecoration: 'none', color: '#fff' }}>
        <div className='card_layout'>Todo Application</div>
      </Link>
      <Link
        to='money-manager'
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        <div className='card_layout'>Expense Tracker</div>
      </Link>
      <button
        onClick={() =>
          Logout({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar })
        }
      >
        Log Out
      </button>
    </LandingWrapper>
  );
}

export default Landing;
