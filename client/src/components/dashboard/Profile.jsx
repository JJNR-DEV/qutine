import React from 'react';
import {useSelector} from "react-redux";
// import {connect, useSelector} from 'react-redux';
// const { user } = useSelector((state) => state.auth);

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      <span>{user.email}</span>
    </div>
  );
}

export default Profile;
