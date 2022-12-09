import React, {useEffect, useState} from 'react';
import {getParticipations} from '../utils/participation';
import {TParticipation} from '../types/participation';
import Loader from './ui/Loader';
import EventParticipation from './EventParticipation';
import WaitingList from './WaitingList';
import Participation from './Participation';
import {useProfile} from '../utils/auth/ProfileContext';

const HomePage = () => {
  const {profile} = useProfile();
  const [participations, setParticipations] = useState<
    TParticipation[] | undefined
  >(undefined);

  const hasParticipation = participations?.length && participations.length > 0;

  useEffect(() => {
    if (profile) {
      getParticipations(profile.id).then(_participations => {
        setParticipations(_participations);
      });
    }
  }, [profile]);

  if (!profile) return <Loader />;
  if (hasParticipation) return <Participation profile={profile} />;
  if (profile.waiting_list) return <WaitingList profile={profile} />;

  return <EventParticipation profile={profile} />;
};

export default HomePage;
