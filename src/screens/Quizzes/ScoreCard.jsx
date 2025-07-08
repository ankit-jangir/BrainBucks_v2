import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {StyleConstants} from '../../constants/Style.constant';
import {Text} from '../../utils/Translate';
import Toast from 'react-native-toast-message';
import ReactNativeBlobUtil from 'react-native-blob-util';
import ActiveQuizApiService from '../../services/api/ActiveQuizApiService';
import {useQuiz} from '../../context/QuizPlayReducer';
import Header from '../../components/Header';

export default function ScoreCard({navigation, route}) {
  const [isLoad, setLoad] = useState(false);
  const {quizState, dispatch} = useQuiz();
  const [data, setData] = useState([]);

  const SubActive_id = quizState.id;
  const serv = new ActiveQuizApiService();

  async function getActiveQuizScoreboard() {
    try {
      setLoad(true);
      let res = await serv.getActiveQuizScoreboard(SubActive_id);
      if (res.status === 1) {
        setData(res.answer_sheet);
      } else {
         ToastAndroid.show(res.Backend_Error, ToastAndroid.SHORT);

      }
    } catch (err) {
      console.log('Error while getting earned data', err.message);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getActiveQuizScoreboard();
  }, []);

  const downloadPDF = async data => {
    // Construct HTML content for PDF
    let htmlContent = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Answer Sheet</h2>
          <table>
            <tr>
              <th>QNo.</th>
              <th>My Answer</th>
              <th>Correct Answer</th>
              <th>Marks</th>
            </tr>
    `;

    data.forEach(item => {
      htmlContent += `
        <tr>
          <td>${item.question_no}</td>
          <td>${item.my_answer}</td>
          <td>${item.correct_answer}</td>
          <td>${item.marks}</td>
        </tr>
      `;
    });

    htmlContent += `
          </table>
        </body>
      </html>
    `;

    const {config, fs} = ReactNativeBlobUtil;
    const pathToWrite = `${fs.dirs.DownloadDir}/AnswerSheet.pdf`;

    config({
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: pathToWrite,
        description: 'Downloading answer sheet',
      },
    })
      .fetch(
        'POST',
        'https://your-server-url-to-convert-html-to-pdf',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({html: htmlContent}),
      )
      .then(res => {
         ToastAndroid.show('PDF Downloaded Successfully!', ToastAndroid.SHORT);

      })
      .catch((errorMessage, statusCode) => {
        console.log('Error:', errorMessage);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{zIndex: 10}}>
        <Toast />
      </View>
      <View style={[StyleConstants.safeArView, {backgroundColor: '#701DDB'}]}>
        <View style={styles.Container}>
          {/* <View style={styles.Container_View}>
            <View style={styles.mainview}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.mainviewtouc}
              >
                <Image source={require('../../assets/img/backq.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Scorecard}>My Scorecard</Text>
            </View>
            <View style={[styles.mainview, { marginTop: 20 }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CustomerSupport")}
                style={styles.mainviewtouc}
              >
                <Image
                  source={require("../../assets/img/headphone.png")}
                  style={styles.img1}
                />
              </TouchableOpacity>
            </View>
          </View> */}

          <Header
            title="My Scorecard"
            leftIcon={{
              source: require('../../assets/img/backq.png'),
              onPress: () => navigation.goBack(),
              tintColor:'#fff'
              
            }}
            rightIcon={{
              source: require('../../assets/img/headphone.png'),
              onPress: () => navigation.navigate('CustomerSupport'),
            }}
          />

          <View style={styles.mainview1}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('QuizzesResultRewards');
              }}>
              <Text style={styles.text2}>Reward</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.View1Q}>
          <View style={styles.View2Q}>
            <View style={styles.View3Q}></View>
          </View>
          <Text style={styles.View4Q}>Answer Sheet</Text>
          <View style={styles.View5Q}>
            <View style={styles.View6Q}>
              <View style={styles.View7Q}>
                <Text style={styles.View8Q}>QNo.</Text>
              </View>
              <View style={styles.View9Q}>
                <Text style={styles.View8Q}>My Answer</Text>
              </View>
              <View style={styles.View10Q}>
                <Text style={styles.View8Q}>Correct Answer</Text>
              </View>
              <View style={styles.View11Q}>
                <Text style={styles.View8Q}>Marks</Text>
              </View>
            </View>
            <ScrollView>
              {isLoad ? (
                <View style={styles.View12Q}>
                  <ActivityIndicator size={50} color={'#701DDB'} />
                </View>
              ) : (
                data.map((item, index) => {
                  return <Answerkey key={index} item={item} index={index} />;
                })
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

function Answerkey({item}) {
  return (
    <ScrollView>
      <View style={[StyleConstants.safeArView, {borderColor: '#CFCFCF'}]}>
        <View>
          <View style={styles.View6Q}>
            <View style={styles.View7Q}>
              <Text style={styles.View8Q}>{item.question_no}</Text>
            </View>
            <View style={styles.View9Q}>
              <Text
                style={[
                  styles.View8Q,
                  {
                    color:
                      item.my_answer === item.correct_answer ? 'green' : 'red',
                  },
                ]}>
                {item.my_answer}
              </Text>
            </View>
            <View style={styles.View10Q}>
              <Text style={styles.View8Q}>{item.correct_answer}</Text>
            </View>
            <View style={styles.View11Q}>
              <Text style={styles.View8Q}>{item.marks}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const ls = StyleConstants,
  s = StyleConstants,
  styles = StyleSheet.create({
    Container: {
      paddingHorizontal: 10,
      height: 230,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    Container_View: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mainview: {
      width: 45,
      height: 45,
    },
    mainviewtouc: {
      flex: 1,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff30',
    },
    Scorecard: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 24,
      color: '#fff',
    },
    img1: {
      width: 20,
      height: 20,
    },
    img2: {
      width: 20,
      height: 20,
      marginHorizontal: 15,
    },
    text2: {
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 16,
      color: '#fff',
    },
    mainview1: {
      flexDirection: 'row',
      width: '100%',
      height: 50,
      backgroundColor: '#ffffff40',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
    },
    download: {
      flexDirection: 'row',
      width: '100%',
      height: 50,
      backgroundColor: '#ffffff',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textdow: {
      fontFamily: 'WorkSans-Regular',
      fontSize: 16,
      color: '#000',
    },
    View1Q: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingHorizontal: 0,
    },
    View2Q: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    View3Q: {
      width: 45,
      height: 6,
      borderRadius: 10,
      backgroundColor: '#D9D9D9',
    },
    View4Q: {
      textAlign: 'center',
      fontFamily: 'WorkSans-SemiBold',
      fontSize: 24,
      color: '#000',
    },
    View5Q: {
      flex: 1,
      backgroundColor: '#F1F1F1',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#CFCFCF',
      marginTop: 20,
    },
    View6Q: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 50,
    },
    View7Q: {
      flex: 0.4,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      borderTopWidth: 1,
      borderTopColor: '#CFCFCF',
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    View8Q: {
      fontSize: 14,
      fontFamily: 'WorkSans-Medium',
      color: '#000',
    },
    View9Q: {
      flex: 0.7,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: '#CFCFCF',
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',
    },
    View10Q: {
      flex: 0.8,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: '#CFCFCF',
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',
    },
    View11Q: {
      flex: 0.5,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: '#CFCFCF',
      borderBottomWidth: 1,
      borderBottomColor: '#CFCFCF',
    },
    View12Q: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },
    View13Q: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 50,
    },
    View14Q: {
      flex: 0.4,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    View15Q: {
      flex: 0.7,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    View16Q: {
      flex: 0.8,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fonttext: {
      fontSize: 16,
      fontFamily: 'WorkSans-Medium',
      color: '#000',
    },
    View17Q: {
      // flex: 0.5,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
