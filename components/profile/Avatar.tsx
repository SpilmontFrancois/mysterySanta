import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../utils/globalStyle';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserPen, faXmark} from '@fortawesome/free-solid-svg-icons';
import {supabase} from '../../lib/supabase';
import {updateAvatar} from '../../utils/profile';

type TAvatarUrl = {
  data: {publicUrl: string};
};

type Props = {
  userId: string;
  avatarUrl?: string;
};

const Avatar = ({userId, avatarUrl}: Props) => {
  const [avatarsUrls, setAvatarsUrls] = useState<TAvatarUrl[] | undefined>(
    undefined,
  );
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const toggleAvatarSelector = () =>
    setIsAvatarSelectorOpen(prevValue => !prevValue);

  useEffect(() => {
    supabase.storage
      .from('avatars')
      .list()
      .then(({data}) => {
        if (data) {
          Promise.all(
            data.map(avatar =>
              supabase.storage.from('avatars').getPublicUrl(avatar.name),
            ),
          ).then(_data => setAvatarsUrls(_data));
        }
      });
  }, []);
  return (
    <>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={toggleAvatarSelector}>
        {avatarUrl ? (
          <Image source={{uri: avatarUrl}} style={styles.avatar} />
        ) : (
          <View style={{paddingLeft: 25}}>
            <FontAwesomeIcon
              icon={faUserPen}
              size={96}
              color={COLORS.neutral['100']}
            />
          </View>
        )}
      </TouchableOpacity>
      {isAvatarSelectorOpen && (
        <View style={styles.avatarSelector}>
          <TouchableOpacity onPress={toggleAvatarSelector} style={styles.cross}>
            <FontAwesomeIcon icon={faXmark} size={32} />
          </TouchableOpacity>
          {avatarsUrls &&
            avatarsUrls.length > 0 &&
            avatarsUrls?.map(avatarObject => {
              return (
                <TouchableOpacity
                  key={avatarObject.data.publicUrl}
                  onPress={() => {
                    updateAvatar(userId, avatarObject.data.publicUrl);
                    setIsAvatarSelectorOpen(false);
                  }}>
                  <Image
                    style={styles.avatar}
                    source={{uri: avatarObject.data.publicUrl}}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 999,
    borderColor: COLORS.neutral['800'],
    borderWidth: 4,
    backgroundColor: COLORS.neutral['900'],
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarSelector: {
    position: 'absolute',
    zIndex: 50,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.neutral['200'],
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cross: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  avatar: {
    width: 160,
    height: 160,
  },
});

export default Avatar;
