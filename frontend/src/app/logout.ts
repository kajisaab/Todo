import {
  tokenRegistration,
  userDetails,
  viewMode,
} from '../features/users/userDetailsSlice';

export default function Logout({ dispatch, enqueueSnackbar }: any) {
  dispatch(tokenRegistration(''));
  dispatch(userDetails({}));
  dispatch(viewMode(false));

  enqueueSnackbar('Successfully Signed Out', {
    variant: 'success',
    preventDuplicate: true,
  });
}
