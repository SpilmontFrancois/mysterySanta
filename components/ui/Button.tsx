import {
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
};

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        props.secondary ? globalStyle.secondaryButton : globalStyle.button,
        props.style,
      ]}>
      <Text
        style={{
          color: props.secondary ? COLORS.primary : COLORS.neutral['100'],
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 16,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
