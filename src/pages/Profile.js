import React, { Fragment, useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth/AuthContext'
import { ProfileForm } from '../components/profile/ProfileForm'
import { Loader } from '../components/loader/Loader'
import { PostgresContext } from '../context/postgresql/PostgresContext'

export const Profile = () => {
  const { logout, userId } = useContext(AuthContext)
  const { loading, fetchProfile, profileData, profileChange } = useContext(PostgresContext)

  useEffect(() => {
    fetchProfile(userId)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <ProfileForm logout={logout} profileData={profileData} profileChange={profileChange} />
      )}
    </Fragment>
  )
}
