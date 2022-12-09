import React, {useEffect, useState} from 'react';
import {getActiveParticipation} from '../../utils/participation';
import {TParticipation} from '../../types/participation';
import Loader from '../ui/Loader';
import WaitingList from './WaitingList';
import Participation from './Participation';
import {useProfile} from '../../utils/auth/ProfileContext';
import Event from './Event';

const HomePage = () => {
  const {profile} = useProfile();
  const [participation, setParticipation] = useState<
    TParticipation | undefined
  >(undefined);

  useEffect(() => {
    getActiveParticipation(profile.id).then(_participation => {
      setParticipation(_participation);
    });
  }, [profile]);

  if (!profile) return <Loader />;
  if (participation)
    return <Participation profile={profile} participation={participation} />;
  if (profile.waiting_list) return <WaitingList profile={profile} />;

  return <Event profile={profile} />;
};

export default HomePage;
