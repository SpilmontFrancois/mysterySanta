import {View} from 'react-native';
import {COLORS} from '../../utils/globalStyle';

const Line = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 1.5,
        backgroundColor: COLORS.neutral['300'],
        marginVertical: 16,
      }}
    />
  );
};

export default Line;
