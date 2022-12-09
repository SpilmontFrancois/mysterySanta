import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TProfile} from '../../types/profile';
import {TParticipation} from '../../types/participation';
import React, {useEffect, useState} from 'react';
import {getProfile} from '../../utils/profile';
import {COLORS, globalStyle} from '../../utils/globalStyle';
import {TEvents} from '../../types/event';
import {getEvent} from '../../utils/event';
import Button from '../ui/Button';

type Props = {
  profile: TProfile;
  participation: TParticipation;
};

const Participation = ({profile, participation}: Props) => {
  const [receiverProfile, setReceiverProfile] = useState<TProfile | undefined>(
    undefined,
  );
  const [event, setEvent] = useState<TEvents | undefined>(undefined);
  const receiverId =
    participation.user1_id === profile.id
      ? participation.user2_id
      : participation.user1_id;

  useEffect(() => {
    getProfile(receiverId)
      .then(_receiverProfile => {
        setReceiverProfile(_receiverProfile);
      })
      .catch(err => console.error(err));

    getEvent(participation.event_id)
      .then(_event => setEvent(_event))
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 32}}>
        <Text style={[globalStyle.lightTitle]}>Welcome,</Text>
        <Text style={globalStyle.title}>{profile.full_name}</Text>
      </View>
      <View style={{marginTop: 16}}>
        <Text style={styles.text}>
          You are currently participating in the Mystery Santa event which ends
          on {event?.end_date}
        </Text>
      </View>
      <Text
        style={[
          {
            fontSize: 24,
            color: COLORS.secondary,
            marginBottom: 8,
            marginTop: 16,
          },
        ]}>
        Participation
      </Text>
      <Text style={styles.text}>
        Here is the person to whom you are going to give a gift and who will
        give you one too
      </Text>
      <View style={styles.participationContainer}>
        {receiverProfile?.avatar_url && (
          <Image
            source={{uri: receiverProfile.avatar_url}}
            style={styles.avatar}
          />
        )}
        <Text style={styles.text}>{receiverProfile?.full_name}</Text>
        <Text style={[styles.lightText, {marginTop: 16}]}>
          Here are his interests to help you in the choice of his gift :
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
          }}>
          {receiverProfile?.interests.map(interest => {
            return (
              <View key={interest as string} style={styles.interestTag}>
                <Text style={{color: COLORS.neutral['100']}}>
                  {interest as string}
                </Text>
              </View>
            );
          })}
        </View>
        <Button text={'Send Gift'} style={{marginTop: 32}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 16,
    color: COLORS.neutral['900'],
  },
  lightText: {
    fontSize: 16,
    color: COLORS.neutral['700'],
  },
  participationContainer: {
    borderRadius: 12,
    marginTop: 32,
    backgroundColor: COLORS.neutral['200'],
    padding: 16,
    display: 'flex',
  },
  avatar: {
    marginBottom: 16,
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  interestTag: {
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
    backgroundColor: COLORS.neutral['900'],
  },
});

export default Participation;
