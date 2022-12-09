import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import Button from '../ui/Button';
import {
  handleParticipation,
  PARTICIPATION_STATUS,
} from '../../utils/participation';
import React, {useState} from 'react';
import {COLORS} from '../../utils/globalStyle';
import {TProfile} from '../../types/profile';
import {useTimer} from '../../hooks/useTimer';

type Props = {
  profile: TProfile;
  eventEndDate: string;
};

const Event = ({profile, eventEndDate}: Props) => {
  const [loading, setLoading] = useState(false);
  const formattedTimer = useTimer(eventEndDate);

  const onPress = () => {
    setLoading(true);
    handleParticipation(profile)
      .then(participationStatus => {
        if (participationStatus === PARTICIPATION_STATUS.CREATED) {
          Alert.alert('OUIII CEST CREER');
        } else if (participationStatus === PARTICIPATION_STATUS.WAITING_LIST) {
          Alert.alert(
            'No user found for the moment',
            'No user in waiting list for the moment, you will be notified by mail when a user with the same budget as you will register',
          );
        }
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'An error occured, please try again');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.iconsTop}>
          <Image source={require('../../assets/img/Star.png')} />
          <Image source={require('../../assets/img/TopRight.png')} />
        </View>
        <View>
          <Text style={styles.text}>Time left :</Text>
          <Text style={styles.timer}>{formattedTimer}</Text>
          <Text style={styles.subText}>Before the event ends</Text>
        </View>
        <View style={styles.iconsBottom}>
          <Image source={require('../../assets/img/BottomLeft.png')} />
          <Image source={require('../../assets/img/Star.png')} />
        </View>
      </View>
      <Button
        loading={loading}
        text={'Participate to Secret Santa'}
        onPress={onPress}
        style={[styles.button, {height: 80}]}
      />
      <Image
        source={require('../../assets/img/Chimney.png')}
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
    color: COLORS.neutral['700'],
  },
  subText: {
    textAlign: 'center',
    fontSize: 16,
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

export default Event;
