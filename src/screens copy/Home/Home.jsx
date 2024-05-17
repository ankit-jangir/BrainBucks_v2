import { StyleSheet, Text, View,SafeAreaView,StatusBar} from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'

const Home = () => {
  return (
    <SafeAreaView >
    <StatusBar
      barStyle="dark-content"
      translucent={false}
    />
    <View>
      <SearchBar />
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})