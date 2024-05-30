import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text as BBText,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from 'react-native';
import {Text} from '../../utils/Translate';
import {ColorsConstant} from '../../constants/Colors.constant';
import {StyleConstants} from '../../constants/Style.constant';
import {Image} from '@rneui/base';
import styles from '../../styles/Studymaterials.styles';
import StudyApiService from '../../services/api/StudyApiService';
import Toast from 'react-native-toast-message';
import {useCurrentId} from '../../context/IdReducer';
import NoDataFound from '../../components/NoDataFound';
export default function QuestionPaperList({navigation, route}) {
  const pdf_id = route.params.pdf_id;
  const saved = new StudyApiService();
  const [loading, setloading] = useState();
  const [ViewPdf, setViewPdf] = useState([]);
  const {idState, context} = useCurrentId();

  useEffect(() => {
    viewPdf();
  }, []);

  async function viewPdf() {
    setloading(true);
    try {
      let res = await saved.getStudyMaterial(idState.id, pdf_id);

      if (res.status === 1) {
        setViewPdf(res.data);
      } else {
        Toast.show({
          type: 'error',
          text1: res.Backend_Error,
        });
      }
    } catch (err) {
      console.log('Error while getting Saved exam data', err.message);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <View>
        <Toast />
      </View>
      <View style={StyleConstants.safeArView}>
        <View style={styles.mainView}>
          <View style={styles.mainView1}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.touchView}>
              <Image
                source={require('../../assets/img/arrows.png')}
                style={{width: 20, height: 15}}
              />
            </TouchableOpacity>
            <View style={styles.QView}>
              <Text style={styles.textQ}>Question Papers</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputV}>
          <View style={styles.inputV1}>
            <View style={styles.inputv2}>
              <TouchableOpacity style={{flex: 0.1}}>
                <Image
                  source={require('../../assets/img/search.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.Inview}
                placeholder="Search for Previous year papers"
                placeholderTextColor={'#7E7E7E'}></TextInput>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator color={ColorsConstant.Theme} size={35} />
            ) : ViewPdf.length === 0 ? (
              <View style={{flex: 1, backgroundColor: 'white'}}>
                <NoDataFound
                  message={'No Data Found'}
                  action={viewPdf}
                  actionText={'Reload'}
                />
              </View>
            ) : (
              ViewPdf.map(res => {
                return (
                  <View key={res._id} style={styles.PView}>
                    <TouchableOpacity style={styles.Ptouch}>
                      <View style={styles.downView}>
                        <View>
                          <Text style={styles.textQue}>{res.display_name}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity style={{paddingRight: 15}}>
                            <Image
                              source={require('../../assets/img/pdf.png')}
                              style={{height: 30, width: 30}}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity style={{paddingRight: 8}}>
                            <Image
                              source={require('../../assets/img/downloading.png')}
                              style={{height: 30, width: 30}}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
