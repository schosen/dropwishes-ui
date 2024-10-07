"use client";
import withAuth from '../../hoc/withAuth'
import useAuthRedirect from '../../hooks/useAuthRedirect';

const WishlistPage = () => {
  useAuthRedirect('/auth/login', false);

  return (
<></>
  );
};

export default WishlistPage;
