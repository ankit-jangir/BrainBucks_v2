import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainHeader from '../../components/MainHeader';
import { useNavigation } from '@react-navigation/native';

const Questionscreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <MainHeader
        name="Add Questions"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Add Individual Questions Card */}
        <View style={[styles.card, {backgroundColor: '#FFF4E1'}]}>
          <Image
            source={require('../../assets/img/hiefie.png')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>Add Individual Questions</Text>
          <Text style={styles.cardSubtitle}>Create questions one by one</Text>

          <TouchableOpacity style={styles.orangeBtn}  onPress={() => navigation.navigate('Addquestion')}>
            <Text style={styles.orangeBtnText}>+Add Questions</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Questions Card */}
        <View style={[styles.card, {backgroundColor: '#EAEFFF'}]}>
          <Image
            source={require('../../assets/img/handshack.png')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>Upload Questions</Text>
          <Text style={styles.cardSubtitle}>
            Upload multiple questions at once
          </Text>

          {/* <TouchableOpacity style={styles.purpleBtn}>
            <View style={styles.btnContent}>
              <Image
                source={require('../../assets/img/downloads.png')}
                style={styles.btnIcon}
              />
              <Text style={styles.purpleBtnText}>Download Sample .xlsx</Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.grayBtn} onPress={() => navigation.navigate('UploadQuestionsScreen')}>
            <View style={styles.btnContent}>
              <Text style={styles.grayBtnText}>+Add Bulk Questions</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default Questionscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    minHeight: 350,
    justifyContent: 'space-between',
  },

  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },
  orangeBtn: {
    backgroundColor: '#F5A623',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  orangeBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  purpleBtn: {
    backgroundColor: '#701DDB',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  grayBtn: {
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  uploadBtn: {
    backgroundColor: '#701DDB',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  purpleBtnText: {
    color: 'white',
    fontSize: 16,
  },
  grayBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  uploadBtnText: {
    color: 'white',
    fontSize: 16,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:7,
  },
  btnIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
});
