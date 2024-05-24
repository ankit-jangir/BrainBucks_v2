import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation
import styles  from '../../styles/Studymaterials.styles';
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
            <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('QuestionPapers')}>
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

