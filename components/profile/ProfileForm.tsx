import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { TProfile } from '../../types/profile';
import Button from '../ui/Button';
import { COLORS, globalStyle } from '../../utils/globalStyle';
import { Picker } from '@react-native-picker/picker';
import { BUDGETS, updateProfile } from '../../utils/profile';
import Line from '../ui/Line';
import InterestsSelector from './InterestsSelector';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../settings/routes';
import ErrorMessage from '../ui/ErrorMessage';

type Props = {
  user: TProfile;
};

const ProfileForm = ({ user }: Props) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: user.full_name ?? '',
      avatar_url: user.avatar_url ?? '',
      budget: user.budget ?? '',
      address: user.address ?? '',
      interests: user.interests ?? [],
    },
  });
  const onSubmit = (data: Partial<TProfile>) => {
    updateProfile(user.id, data).then(() => {
      navigation.navigate(routes.HomePage as never);
    });
  };
  return (
    <>
      <Text style={[globalStyle.lightTitle]}>Infos</Text>
      <Controller
        control={control}
        rules={{
          required: 'Full name is required',
          minLength: 2,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[globalStyle.input, { marginVertical: 12 }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={'Full name'}
          />
        )}
        name="full_name"
      />
      {errors.full_name && (
        <ErrorMessage>{errors.full_name.message}</ErrorMessage>
      )}
      <Controller
        control={control}
        rules={{
          required: 'Address is required',
          minLength: 5,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[globalStyle.input, { marginVertical: 12 }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={'Address'}
          />
        )}
        name="address"
      />
      {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
      <Line />
      <Text style={[globalStyle.lightTitle]}>Select your budget</Text>
      <Controller
        control={control}
        rules={{
          required: 'Please select your budget',
        }}
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 12,
              marginVertical: 12,
            }}>
            <Picker onValueChange={onChange} selectedValue={value}>
              {Object.entries(BUDGETS).map(([key, label]) => {
                return <Picker.Item key={key} label={label} value={key} />;
              })}
            </Picker>
          </View>
        )}
        name="budget"
      />
      <ErrorMessage>{errors.budget?.message}</ErrorMessage>
      <Line />
      <Text style={[globalStyle.lightTitle, { marginBottom: 12 }]}>
        Choose some interests
      </Text>
      <Controller
        control={control}
        rules={{
          required: 'Please choose at least one interest',
        }}
        render={({ field: { onChange, value } }) => (
          <InterestsSelector onChange={onChange} userInterests={value} />
        )}
        name="interests"
      />
      {errors.interests && (
        <ErrorMessage>{errors.interests.message}</ErrorMessage>
      )}
      <Button
        text="Submit"
        onPress={handleSubmit(onSubmit)}
        style={
          Object.keys(errors).length > 0 ? { ...styles.button, opacity: 0.75 } : styles.button
        }
        disabled={Object.keys(errors).length > 0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    marginVertical: 24
  },
});

export default ProfileForm;
