import React, {createContext, PropsWithChildren, useContext} from 'react';
import {TProfile} from '../../types/profile';

type TProfileContextValue = {
  profile: TProfile;
  isFirstConnection: boolean;
};
const ProfileContext = createContext<TProfileContextValue>(
  {} as TProfileContextValue,
);

export function ProfileProvider({
  profile,
  isFirstConnection,
  children,
}: PropsWithChildren<{profile: TProfile; isFirstConnection: boolean}>) {
  return (
    <ProfileContext.Provider value={{profile, isFirstConnection}}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
