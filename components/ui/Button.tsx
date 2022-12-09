import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {COLORS, globalStyle} from '../../utils/globalStyle';
import React from 'react';

type Props = TouchableOpacityProps & {
  secondary?: boolean;
  text: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
};

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        props.secondary ? globalStyle.secondaryButton : globalStyle.button,
        props.style,
      ]}>
      {props.loading ? (
        <ActivityIndicator size={'large'} color={COLORS.neutral['100']} />
      ) : (
        <Text
          style={{
            color: props.secondary ? COLORS.primary : COLORS.neutral['100'],
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
          }}>
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
