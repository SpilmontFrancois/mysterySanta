import {StyleSheet, Text, View} from 'react-native';
import {COLORS, globalStyle} from '../../utils/globalStyle';
import Button from '../ui/Button';
import {useState} from 'react';

const FirstConnectionDialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <View style={styles.container}>
      <Text style={[globalStyle.title, styles.text]}>
        Welcome to Mystery Santa
      </Text>
      <Text style={[globalStyle.lightTitle, styles.text]}>
        Please fill in your profile information, then you can register for the
        event to participate in Mystery Santa
      </Text>
      <Button
        text={'Complete your registration'}
        style={{width: '100%', marginVertical: 16}}
        onPress={() => setIsOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.neutral['200'],
    paddingHorizontal: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 16,
    textAlign: 'center',
  },
});
export default FirstConnectionDialog;
