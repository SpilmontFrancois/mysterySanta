import Button from './ui/Button';
import {useEffect, useState} from 'react';
import {getParticipation} from '../utils/participation';
import {supabase} from '../lib/supabase';
import {useProfile} from '../utils/session';
import {TParticipations} from '../types/participation';
import {Image, StyleSheet, Text, View} from 'react-native';

// TODO : get it from active event
const eventEndDate = new Date('2022-12-25T00:00:00').getTime();

const HomePage = () => {
  const {loading, profile} = useProfile();
  const [participation, setParticipation] = useState<
    TParticipations[] | undefined
  >(undefined);

  const [formattedTimer, setFormattedTimer] = useState('');

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
      getParticipation(profile.id).then(_pcptn => {
        setParticipation(_pcptn);
      });
    }
  }, [profile]);

  const participate = async () => {
    if (profile) {
      const userMatch = await supabase
        .from('profiles')
        .select('*')
        .eq('waiting_list', true)
        .eq('budget', profile.budget)
        .neq('id', profile.id)
        .order('updated_at', {ascending: true})
        .limit(1);

      if (userMatch.data && userMatch.data.length > 0) {
        await supabase
          .from('profiles')
          .update({
            waiting_list: false,
          })
          .eq('id', userMatch.data[0].id);

        const event = await supabase
          .from('events')
          .select('*')
          .order('end_date', {ascending: false})
          .limit(1);
        if (event.data && event.data.length > 0) {
          await supabase.from('participations').insert({
            user1_id: profile.id,
            user2_id: userMatch.data[0].id,
            event_id: event.data[0].id,
          });
        }
      } else {
        const event = await supabase
          .from('events')
          .select('*')
          .order('end_date', {ascending: false})
          .limit(1);
        if (event.data && event.data.length > 0) {
          const participation = await supabase
            .from('participations')
            .select('*')
            .or(`user1_id.eq.${profile.id},user2_id.eq.${profile.id}`)
            .eq('event_id', event.data[0].id);
          if (participation.data && participation.data.length === 0) {
            await supabase
              .from('profiles')
              .update({
                waiting_list: true,
              })
              .eq('id', profile.id);
          } else {
            // Une participation existe déjà
          }
        }
      }
    }
  };

  return (
    <>
      <View style={styles.iconsTop}>
        <Image source={require('../assets/img/Star.png')} />
        <Image source={require('../assets/img/TopRight.png')} />
      </View>
      <Text style={styles.text}>Temps restant :</Text>
      <Text style={styles.timer}>{formattedTimer}</Text>
      <View style={styles.iconsBottom}>
        <Image source={require('../assets/img/BottomLeft.png')} />
        <Image source={require('../assets/img/Star.png')} />
      </View>
      <Button
        text={
          participation
            ? 'Vous avez déjà participé à cet évènement !'
            : 'Participer au Secret Santa !'
        }
        onPress={() => participate()}
        style={
          participation ? {...styles.button, opacity: 0.75} : styles.button
        }
        disabled={!!participation}
      />
      <Image
        source={require('../assets/img/Chimney.png')}
        style={styles.bottomImg}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconsTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  iconsBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  timer: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    padding: 20,
  },
  bottomImg: {
    width: '100%',
  },
});

export default HomePage;
