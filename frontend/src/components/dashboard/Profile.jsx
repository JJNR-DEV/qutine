import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      <span>{user.email}</span>
    </div>
  );
}

export default Profile;
