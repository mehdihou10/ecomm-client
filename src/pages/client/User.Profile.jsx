import React from 'react'
import Profile from '../../components/Profile';
import Header from '../../components/Header';

const UserProfile = () => {
  return (
    <div>
      <Header />
      <Profile type="client" />
    </div>
  )
}

export default UserProfile;
