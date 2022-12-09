import React, {useEffect, useState} from 'react';
import Button from './ui/Button';
import {getParticipations, handleParticipation} from '../utils/participation';
import {useProfile} from '../hooks/useProfile';
import {TParticipation} from '../types/participation';
import {Image, StyleSheet, Text, View} from 'react-native';
import Loader from './ui/Loader';
import {COLORS} from '../utils/globalStyle';

// TODO : get it from active event
const eventEndDate = new Date('2022-12-25T00:00:00').getTime();

const HomePage = () => {
  const {loading, profile} = useProfile();
  const [participations, setParticipations] = useState<
    TParticipation[] | undefined
  >(undefined);

  const [formattedTimer, setFormattedTimer] = useState('');
  const hasParticipation = participations?.length && participations.length > 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timer = eventEndDate - now;

      let days = Math.floor(timer / (1000 * 60 * 60 * 24)).toString();
      let hours = Math.floor(
        (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ).toString();
      let minutes = Math.floor(
        (timer % (1000 * 60 * 60)) / (1000 * 60),
      ).toString();
      let seconds = Math.floor((timer % (1000 * 60)) / 1000).toString();

      days = Number(days) < 10 ? '0' + days : days;
      hours = Number(hours) < 10 ? '0' + hours : hours;
      minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
      seconds = Number(seconds) < 10 ? '0' + seconds : seconds;

      setFormattedTimer(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (profile) {
      getParticipations(profile.id).then(_participations => {
        setParticipations(_participations);
      });
    }
  }, [profile]);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.iconsTop}>
          <Image source={require('../assets/img/Star.png')} />
          <Image source={require('../assets/img/TopRight.png')} />
        </View>
        <View>
          <Text style={styles.text}>Time left :</Text>
          <Text style={styles.timer}>{formattedTimer}</Text>
        </View>
        <View style={styles.iconsBottom}>
          <Image source={require('../assets/img/BottomLeft.png')} />
          <Image source={require('../assets/img/Star.png')} />
        </View>
      </View>
      <Button
        text={
          hasParticipation
            ? 'You have already participage \n to this event !'
            : 'Participate to Secret Santa !'
        }
        onPress={() => {
          if (profile) handleParticipation(profile);
        }}
        style={[
          hasParticipation ? {...styles.button, opacity: 0.75} : styles.button,
          {height: 80},
        ]}
        disabled={!!hasParticipation}
      />
      <Image
        source={require('../assets/img/Chimney.png')}
        style={styles.bottomImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.neutral['100'],
  },
  timerContainer: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconsTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
  },
  iconsBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.neutral['700'],
  },
  timer: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.neutral['900'],
  },
  button: {
    marginHorizontal: 50,
    marginTop: 50,
    padding: 20,
  },
  bottomImg: {
    width: '100%',
  },
});

export default HomePage;
