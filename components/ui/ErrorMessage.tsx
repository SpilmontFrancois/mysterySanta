import {Text} from 'react-native';
import {PropsWithChildren} from 'react';

type Props = {};

const ErrorMessage = ({children}: PropsWithChildren) => {
  return <Text style={{color: '#FD510D'}}>{children}</Text>;
};

export default ErrorMessage;
