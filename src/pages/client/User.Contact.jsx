import React from 'react'
import Contact from '../../components/Contact';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const UserContact = () => {
  return (
    <div>
      <Header />
      <Contact type="client" />
      <Footer />
    </div>
  )
}

export default UserContact;
