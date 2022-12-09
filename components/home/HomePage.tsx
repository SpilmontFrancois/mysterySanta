import React, {useEffect, useState} from 'react';
import {getActiveParticipation} from '../../utils/participation';
import {TParticipation} from '../../types/participation';
import Loader from '../ui/Loader';
import WaitingList from './WaitingList';
import Participation from './Participation';
import {useProfile} from '../../utils/auth/ProfileContext';
import Event from './Event';
import {TEvents} from '../../types/event';
import {getCurrentEvent} from '../../utils/event';

const HomePage = () => {
  const {profile} = useProfile();
  const [participation, setParticipation] = useState<
    TParticipation | undefined
  >(undefined);
  const [currentEvent, setCurrentEvent] = useState<TEvents | undefined>(
    undefined,
  );
  useEffect(() => {
    getActiveParticipation(profile.id).then(_participation => {
      setParticipation(_participation);
    });
  }, [profile]);
  useEffect(() => {
    getCurrentEvent().then(_currentEvent => setCurrentEvent(_currentEvent));
  }, []);

  if (!profile || !currentEvent) return <Loader />;
  if (participation)
    return <Participation profile={profile} participation={participation} />;
  if (profile.waiting_list) return <WaitingList profile={profile} />;

  return <Event profile={profile} eventEndDate={currentEvent.end_date} />;
};

export default HomePage;
