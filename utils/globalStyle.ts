import {StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#F05454',
  secondary: '#30475D',
  neutral: {
    100: '#F5F5F5',
    200: '#DEDEDE',
    300: '#BFBFBF',
    400: '#A1A1A1',
    500: '#808080',
    600: '#5D5D5D',
    700: '#444444',
    800: '#2B2B2B',
    900: '#121212',
  },
};
export const globalStyle = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
    color: COLORS.primary,
  },
});
