import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const UserAvatar = ({uri}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={styles.avatar} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#2196F3',
  },
});

export default UserAvatar;
