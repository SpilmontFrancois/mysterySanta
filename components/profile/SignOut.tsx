import {Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {supabase} from '../../lib/supabase';
import {COLORS} from '../../utils/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

type Props = {};

const SignOut = (props: Props) => {
  return (
    <TouchableHighlight
      onPress={() => supabase.auth.signOut()}
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
        onPress={() => supabase.auth.signOut()}>
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
