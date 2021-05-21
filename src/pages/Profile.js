import React, { Fragment, useEffect } from "react";
import { ProfileForm } from "../components/profile/ProfileForm";
import { Loader } from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  selectProfileLoading,
} from "../reduxToolkit/SliceWithAPI/profileSlice";

export const Profile = () => {
  const loading = useSelector(selectProfileLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile("USER_TOKEN"));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <ProfileForm />
      )}
    </Fragment>
  );
};
