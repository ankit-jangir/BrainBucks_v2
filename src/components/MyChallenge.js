import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {LinearProgress, Button} from '@rneui/themed';
const MyChallenge = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let subs = true;
    if (progress < 1 && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(progress + 0.1);
        }
      }, 100);
    }
    return () => {
      subs = false;
    };
  }, [progress]);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <LinearGradient
          colors={['#16054F', '#430E80']}
          style={styles.linearGradient}>
          <View style={styles.containerCard}>
            <Text style={styles.text1}>#1</Text>
            <Text style={styles.text12}>
              {' '}
              Streaks Count<Text style={styles.text122}> 90/1024 </Text>
            </Text>
          </View>
          <View style={{paddingTop: 20}}>
            <Text style={styles.text11}>UPSC</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <LinearProgress
              style={{marginVertical: 10, padding: 4, borderRadius: 5}}
              value={progress}
              variant="determinate"
            />
            <View style={styles.row1}>
              <Text style={styles.text13}>Probability of Suceeding</Text>
              <Text style={styles.text122}>20%</Text>
            </View>
            <Button
              title="Continue"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default MyChallenge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    width: '100%',
  },
  containerCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  linearGradient: {
    paddingLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
    paddingTop: 10,
    paddingRight: 10,
  },
  text1: {
    color: '#FFFFFF',
  },
  text12: {
    color: 'gray',
  },
  text122: {
    color: '#F0F0F0',
  },
  text11: {
    color: '#F0F0F0',
    fontSize: 32,
    fontWeight: '600',
  },
  text13: {
    color: 'lightgray',
  },
  button: {
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#50258D',
  },
  buttonTitle: {
    color: 'white',
  },
  row1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
