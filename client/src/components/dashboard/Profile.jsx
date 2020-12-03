import React from 'react';
// import {connect, useSelector} from 'react-redux';
// const { user } = useSelector((state) => state.auth);

const Profile = () => {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile">
      <span>{email}</span>
    </div>
  );
}

export default Profile;
