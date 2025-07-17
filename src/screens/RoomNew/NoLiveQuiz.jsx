import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NoLiveQuiz = ({ onSchedule }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/noquiz.png')} 
                style={styles.image}
      />
      <Text style={styles.title}>No Live Quizzes Found</Text>
      <Text style={styles.subtitle}>Check back later for upcoming quizzes</Text>
      <TouchableOpacity style={styles.button} onPress={onSchedule}>
        <Text style={styles.buttonText}>+ Schedule Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoLiveQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7C3AED', // Purple
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
