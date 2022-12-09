import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSession } from '../utils/auth/SessionContext';
import { getParticipation } from '../utils/participation';
import { TParticipations } from '../types/participation';
import Loader from './ui/Loader';
import { TProfile } from '../types/profile';
import { supabase } from '../lib/supabase';
import { TEvents } from '../types/event';
import { getEvent } from '../utils/event';

const HistoryPage = () => {
  const [receiver, setReceiver] = React.useState<TProfile | undefined>(
    undefined,
  );

  const [participations, setParticipations] = React.useState<
    TParticipations[] | undefined
  >(undefined);

  const [events, setEvents] = React.useState<TEvents[] | undefined>(undefined);

  const session = useSession();

  React.useEffect(() => {
    if (session) {
      getParticipation(session.user.id).then(participations => {
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
        .then(({ data }) => {
          setReceiver(data);
        });
    }
  }, [participations]);

  //Ca ne récupère pas le bon event
  // React.useEffect(() => {
  //   if (participations && participations.length > 0) {
  //     getEvent(participations?.[0].event_id).then(event => {
  //       setEvent(event);
  //     });
  //   }
  // });

  //get the year of the participation
  React.useEffect(() => {
    if (participations && participations.length > 0) {
      const evts: TEvents[] = [];

      Promise.all(participations.map(participation => {
        return supabase
          .from('events')
          .select('*')
          .eq('id', participation.event_id)
          .order('end_date', { ascending: false })
          .single()

      })).then((data) => {
        const _events = data.map((d) => d.data as TEvents)
        setEvents(_events)

      }
      );
    }
  }, [participations]);

  if (!participations) return <Loader />;

  return (
    <View>
      <ImageBackground
        source={require('../assets/img/tree.png')}
        style={styles.background}>
        <ScrollView>
          <Text style={styles.titleHistory}>Vos participations :</Text>
          {participations.map((participation, index) => (
            <View key={participation.id} style={[styles.items, events && events[index]?.end_date.split('-')[0] === new Date().getFullYear().toString() ? styles.active : styles.notActive]}>
              <Text style={styles.title}>Votre Secret Santa de {events ? events[index]?.end_date.split('-')[0] : ""}</Text>

              {
                events && events[index]?.end_date.split('-')[0] === new Date().getFullYear().toString() ?
                  <View>
                    <Text style={styles.description}>
                      Vous participez actuellement au Secret Santa du mois de
                      Décembre. N'oubliez pas de commander le cadeau de{' '}
                      <Text style={styles.bold}>
                        {receiver?.full_name?.split(' ')[0]}
                      </Text>{' '}
                      avant le <Text style={styles.bold}>15 Décembre</Text>.
                    </Text>
                  </View>
                  :
                  <View>
                    <Text style={styles.description}>
                      Vous avez participé au Secret Santa du mois de
                      Décembre {events ? events[index]?.end_date.split('-')[0] : ""}. Vous avez envoyé un cadeau à{' '}
                      <Text style={styles.bold}>
                        {receiver?.full_name?.split(' ')[0]}
                      </Text>.
                    </Text>
                  </View>
              }


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
    //light bold
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
    width: '85%',
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
