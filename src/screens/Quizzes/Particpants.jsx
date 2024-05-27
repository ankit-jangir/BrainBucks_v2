import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';

export default function Participants({ participants }) {
    const data = [
        {
            name: 'vads',
        },
        {
            name: 'Yogesh ',
        },
        {
            name: 'kaju',
        },
        {
            name: 'sonu',
        },
    ]
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ParticipantItem data={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const ParticipantItem = ({ data, index }) => {
  return (
    <View style={styles.participantContainer}>
      <Text style={styles.participantText}>{index + 1}. {data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dark',
  },
  participantContainer: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#E2E2E2',
    paddingLeft: 15,
  },
  participantText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    color:'#000'
  },
});
