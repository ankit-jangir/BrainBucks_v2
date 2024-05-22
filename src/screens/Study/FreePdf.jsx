import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation

const FreePdf = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('QuestionPapers')}
        style={styles.touchableOpacity}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/img/banner.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Name</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Total</Text>
              <Text style={[styles.detailsText, styles.count]}>Count</Text>
              <Text style={styles.detailsText}>PDFs</Text>
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <TouchableOpacity style={styles.arrowButton}>
              <Image
                source={require('../../assets/img/right-arr.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FreePdf;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  touchableOpacity: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginTop: 10,
    flexDirection: 'row',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 35,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.18,
    backgroundColor: '#EFEFEF',
    borderRadius: 100,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 0.65,
    width: '90%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 20,
    paddingLeft: 10,
    color: '#000',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  detailsText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: '#7E7E7E',
  },
  count: {
    color: '#D92828',
    paddingHorizontal: 5,
  },
  arrowContainer: {
    flex: 0.1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
