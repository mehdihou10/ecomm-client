import React from 'react'
import Profile from '../../components/Profile';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const UserProfile = () => {
  return (
    <div>
      <Header />
      <Profile type="client" />
      <Footer />
    </div>
  )
}

export default UserProfile;
