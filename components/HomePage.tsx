import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';
import Button from './ui/Button';

const eventEndDate = new Date('2022-12-25T00:00:00').getTime();

const HomePage = () => {
  const [formattedTimer, setFormattedTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timer = eventEndDate - now;

      const days = Math.floor(timer / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timer % (1000 * 60)) / 1000);

      setFormattedTimer(
        `${days}:${hours}:${minutes}:${seconds}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const participate = async () => {
    const user = await supabase.auth.getUser();
    const profile = await supabase.from('profiles').select('*').eq('id', user.data.user?.id);

    if (profile.data) {
      const usersList = await supabase.from('profiles').select('*').eq('waiting_list', true).eq('budget', profile.data[0].budget).neq('id', user.data.user?.id);
      console.log(usersList);

      if (usersList.data && usersList.data.length > 0) {
        const rdm = Math.floor(Math.random() * usersList.data.length);
        console.log(rdm);
        const randomUser = usersList.data[rdm];
        console.log(usersList.data[rdm]);

        await supabase.from('profiles').update({
          waiting_list: false,
        }).eq('id', user.data.user?.id);
        await supabase.from('profiles').update({
          waiting_list: false,
        }).eq('id', randomUser.id);

        await supabase.from('participations').insert({
          user1_id: user.data.user?.id,
          user2_id: randomUser.id,
        });
      } else {
        await supabase.from('profiles').update({
          waiting_list: true,
        }).eq('id', user.data.user?.id);
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
        text={'Participer au Secret Santa !'}
        onPress={() => participate()}
        style={styles.button}
      />
      <Image source={require('../assets/img/Chimney.png')} style={styles.bottomImg} />
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
