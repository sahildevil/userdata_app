import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import UserAvatar from './UserAvatar';

const UserCard = ({user}) => {
  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserAvatar uri={user.avatar} />

      <View style={styles.infoContainer}>
        <InfoRow label="ID" value={user.id} />
        <InfoRow label="UID" value={user.uid} />
        <InfoRow label="First Name" value={user.first_name} />
        <InfoRow label="Last Name" value={user.last_name} />
        <InfoRow label="Username" value={user.username} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Password" value={user.password} />
      </View>
    </ScrollView>
  );
};

const InfoRow = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
    fontSize: 16,
    color: '#333',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
});

export default UserCard;
