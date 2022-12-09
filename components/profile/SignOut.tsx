import React from 'react';
import {Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {supabase} from '../../lib/supabase';
import {COLORS} from '../../utils/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const SignOut = () => {
  return (
    <TouchableHighlight
      onPress={() => {
        console.log('sign out');
        supabase.auth.signOut();
      }}
      style={{alignSelf: 'flex-end', marginTop: 16}}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.neutral[500],
          padding: 10,
          marginBottom: 16,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          supabase.auth.signOut();
        }}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          style={{color: '#fff'}}
          size={24}
        />
        <Text style={{color: '#fff', marginLeft: 10}}>Sign out</Text>
      </TouchableOpacity>
    </TouchableHighlight>
  );
};

export default SignOut;
