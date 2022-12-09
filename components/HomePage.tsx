import React, {useEffect, useState} from 'react';
import {getParticipations} from '../utils/participation';
import {useProfile} from '../hooks/useProfile';
import {TParticipation} from '../types/participation';
import Loader from './ui/Loader';
import EventParticipation from './EventParticipation';
import WaitingList from './WaitingList';

const HomePage = () => {
  const {loading, profile} = useProfile();
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

  if (loading || !profile) return <Loader />;

  if (profile.waiting_list) return <WaitingList profile={profile} />;

  return <EventParticipation profile={profile} />;
};

export default HomePage;
