import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loader;
