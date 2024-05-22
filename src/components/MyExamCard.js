import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MyExamCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.center}>
              <Image
                source={require('../assets/img/Rectangle.png')}
                resizeMode="contain"
                style={styles.mainImage}
              />
              <Text style={styles.title}>SBI-PO</Text>
              <Text style={styles.subtitle}>Active Quizzes 16</Text>
              <Text style={styles.quizCount}>16</Text>
            </View>
          </View>
        </TouchableOpacity>
        
      
      </View>
    </View>
  )
}

export default MyExamCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    height: 130,
    width: 130,
    alignItems: 'center',
    borderRadius:3,
    elevation:4
  },
  center: {
    alignItems: 'center',
  },
  mainImage: {
    width: 25,
    height: 25,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
  },
  subtitle: {
    color: 'lightgray',
    marginTop: 5,
  },
  quizCount: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
    fontSize: 21,
    color:"red"
  },
})
