import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const christmas = new Date('2022-12-25T00:00:00').getTime();

const HomePage = () => {
  const [formattedTimer, setFormattedTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timer = christmas - now;

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
      <Image source={require('../assets/img/Chimney.png')} style={styles.bottom} />
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
  bottom: {
  },
});

export default HomePage;
