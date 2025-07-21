import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';

const cardColors = [
  '#DBEAFE',
  '#F4FEF8',
  '#FFFAF2',
  '#FBF8FF',
  '#F0FEFB',
  '#FFFAF2',
  '#F6F8FF',
  '#F0FEFB',
];

const quizzes = [
  {
    title: 'General Knowledge',
    teacher: 'Dr. Smith',
    coins: 500,
    filled: 12,
    total: 50,
  },
  {
    title: 'Science',
    teacher: 'Prof. Johnson',
    coins: 600,
    filled: 25,
    total: 50,
  },
  // Add more quizzes if needed
];

const LiveQuizzes = () => {
  return (
    <FlatList
      data={cardColors}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{padding: 10}}
      renderItem={({item: bgColor, index}) => {
        const quiz = quizzes[index % quizzes.length];
        const seatsLeft = quiz.total - quiz.filled;
        const progress = (quiz.filled / quiz.total) * 100;

        return (
          <View style={[styles.card, {backgroundColor: bgColor}]}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Image
                  source={require('../../assets/img/createroom.png')}
                  style={styles.avatar}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{quiz.title}</Text>
                  <View style={styles.coinRow}>
                    <Image
                      source={require('../../assets/img/SVG.png')}
                      style={styles.coinIcon}
                    />
                    <Text style={styles.coinText}> Win {quiz.coins} Coins</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.shareIconContainer}>
                  <Image
                    source={require('../../assets/img/sharea.png')}
                    style={styles.shareIcon}
                    tintColor={'#4B5563'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.progressWrapper}>
              <Text style={styles.progressText}>
                {quiz.filled}/{quiz.total} seats filled
              </Text>
              <Text style={styles.seatsLeft}>{seatsLeft} seats left</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, {width: `${progress}%`}]} />
            </View>

            <View style={styles.footer}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.teacher}>{quiz.teacher}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enroll Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default LiveQuizzes;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  coinIcon: {
    width: 15,
    height: 15,
    // marginRight: 5,
  },
  shareIconContainer: {
    padding: 5,
  },
  shareIcon: {
    width: 16,
    height: 16,
    objectFit:'contain'
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter',
  },
  coinText: {
    fontSize: 13,
    color: '#6B7280',
    // marginTop: 2,
  },
  progressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  progressText: {
    fontSize: 13,
    color: '#4B5563',
  },
  seatsLeft: {
    fontSize: 13,
    color: '#4B5563',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7C3AED',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1D5DB',
    marginRight: 8,
  },
  teacher: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});
