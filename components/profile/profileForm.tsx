import React from 'react';
import {TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {TProfile} from '../../types/profile';
import Button from '../ui/Button';
import {globalStyle} from '../../utils/globalStyle';

type Props = {
  user: Partial<TProfile>;
};

const ProfileForm = ({user}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      full_name: user.full_name ?? '',
      avatar_url: user.avatar_url ?? '',
      budget: user.budget ?? '',
      address: user.address ?? '',
      interests: user.interests ?? [],
    },
  });
  const onSubmit = (data: Partial<TProfile>) => console.log(data);
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={globalStyle.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
      <Button text="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default ProfileForm;
