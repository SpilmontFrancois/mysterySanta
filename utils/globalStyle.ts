import {StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#F05454',
  secondary: '#30475D',
  green: '#129277',
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
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 12,
  },
  secondaryButton: {
    alignItems: 'center',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    color: COLORS.primary,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.neutral['900'],
  },
  lightTitle: {fontSize: 20, color: COLORS.neutral['700']},
});
