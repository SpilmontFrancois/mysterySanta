import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSession} from '../utils/auth/SessionContext';
import {getParticipations} from '../utils/participation';
import {TParticipation} from '../types/participation';
import Loader from './ui/Loader';
import {TProfile} from '../types/profile';
import {supabase} from '../lib/supabase';
import {TEvents} from '../types/event';

const HistoryPage = () => {
  const [receiver, setReceiver] = React.useState<TProfile | undefined>(
    undefined,
  );

  const [participations, setParticipations] = React.useState<
    TParticipation[] | undefined
  >(undefined);

  const [events, setEvents] = React.useState<TEvents[] | undefined>(undefined);

  const session = useSession();

  React.useEffect(() => {
    if (session) {
      getParticipations(session.user.id).then(participations => {
        setParticipations(participations);
      });
    }
  }, [session]);

  React.useEffect(() => {
    if (participations) {
      const receiverId =
        participations[0].user1_id === session?.user.id
          ? participations[0].user2_id
          : participations[0].user1_id;

      supabase
        .from('profiles')
        .select('*')
        .eq('id', receiverId)
        .single()
        .then(({data}) => {
          setReceiver(data);
        });
    }
  }, [participations]);

  React.useEffect(() => {
    if (participations && participations.length > 0) {
      const evts: TEvents[] = [];

      Promise.all(
        participations.map(participation => {
          return supabase
            .from('events')
            .select('*')
            .eq('id', participation.event_id)
            .order('end_date', {ascending: false})
            .single();
        }),
      ).then(data => {
        const _events = data.map(d => d.data as TEvents);
        setEvents(_events);
      });
    }
  }, [participations]);

  if (!participations) return <Loader />;

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/tree.png')}
        style={styles.background}>
        <ScrollView>
          <Text style={styles.titleHistory}>Your Mystery Santa :</Text>
          {participations.map((participation, index) => (
            <View
              key={participation.id}
              style={[
                styles.items,
                events &&
                events[index]?.end_date.split('-')[0] ===
                  new Date().getFullYear().toString()
                  ? styles.active
                  : styles.notActive,
              ]}>
              <Text style={styles.title}>
                Your {events ? events[index]?.end_date.split('-')[0] : ''}'s
                Mystery Santa
              </Text>

              {events &&
              events[index]?.end_date.split('-')[0] ===
                new Date().getFullYear().toString() ? (
                <View>
                  <Text style={styles.description}>
                    You are currently participating in the{' '}
                    {events ? events[index]?.end_date.split('-')[0] : ''}'s
                    December Secret Santa. Don't forget to order the gift of{' '}
                    <Text style={styles.bold}>
                      {receiver?.full_name?.split(' ')[0]}
                    </Text>{' '}
                    before <Text style={styles.bold}>December 15th</Text>.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.description}>
                    You participated in the{' '}
                    {events ? events[index]?.end_date.split('-')[0] : ''}'s
                    December Secret Santa. You have sent a gift to{' '}
                    <Text style={styles.bold}>
                      {receiver?.full_name?.split(' ')[0]}
                    </Text>
                    .
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#BC4633',
    borderRadius: 10,
    backgroundColor: '#EE9334',
  },
  title: {
    fontWeight: '500',
    fontSize: 19,
    textAlign: 'center',
    color: '#4F2F0D',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#4F2F0D',
  },
  titleHistory: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#4F2F0D',
    fontFamily: 'lucida grande',
  },
  active: {},
  notActive: {
    opacity: 0.85,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    alignSelf: 'center',
    zIndex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default HistoryPage;
