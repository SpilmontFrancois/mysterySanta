import React, {useEffect, useState} from 'react';
import {TInterests} from '../../types/interests';
import {getInterests} from '../../utils/interests';
import {COLORS} from '../../utils/globalStyle';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  userInterests: string[];
  onChange: (values: string[]) => void;
};

const InterestsSelector = ({userInterests, onChange}: Props) => {
  const [interests, setInterests] = useState<TInterests[] | undefined>(
    undefined,
  );
  const [selectedInterests, setSelectedInterests] = useState([
    ...userInterests,
  ]);

  const handleInterestClick = (value: string) => {
    if (selectedInterests.includes(value)) {
      setSelectedInterests(selectedInterests.filter(v => v !== value));
    } else {
      setSelectedInterests([...selectedInterests, value]);
    }
  };
  useEffect(() => {
    getInterests().then(data => setInterests(data as TInterests[]));
  }, []);

  useEffect(() => {
    onChange(selectedInterests);
  }, [selectedInterests, onChange]);
  if (!interests) return null;

  return (
    <>
      <View style={styles.selectorContainer}>
        {interests.map(interest => {
          return (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestTag,
                {
                  backgroundColor: selectedInterests.includes(interest.name)
                    ? COLORS.green
                    : COLORS.neutral['900'],
                },
              ]}
              onPress={() => handleInterestClick(interest.name)}>
              <Text style={{color: COLORS.neutral['100']}}>
                {interest.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
});
export default InterestsSelector;
