import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TProfile} from '../types/profile';
import {COLORS, globalStyle} from '../utils/globalStyle';
import {getWaitingListQueue} from '../utils/profile';

type Props = {
  profile: TProfile;
};

const WaitingList = ({profile}: Props) => {
  const [queuePosition, setQueuePosition] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    getWaitingListQueue(profile.budget!).then(data => {
      // @ts-ignore
      const index = data?.findIndex(_profile => _profile.id === profile.id);
      if (index !== undefined && index >= 0) {
        setQueuePosition(index + 1);
      }
    });
  }, [profile]);

  return (
    <View style={styles.container}>
      <Text style={[globalStyle.title, styles.text]}>Waiting list</Text>
      <Text style={[globalStyle.lightTitle, styles.text]}>
        You are currently on the waiting list, you will be notified by mail when
        a user is found for your Secret Santa
      </Text>
      {queuePosition && (
        <Text style={[styles.text, {color: COLORS.green, fontWeight: 'bold'}]}>
          Position in queue : {queuePosition}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    marginVertical: 8,
    textAlign: 'center',
  },
});
export default WaitingList;
