import {
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../../styles/Rooms.styles';
import {Button, Text, TextInput} from '../../utils/Translate';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import RoomsApiService from '../../services/api/RoomsApiService';
import BasicServices from '../../services/BasicServices';

export default function ScheduleQuizTime({navigation, route}) {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('5 mins');
  const [entryFees, setEntryFees] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [mode, setMode] = useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = type => {
    setMode(type);
    setDatePickerVisibility(true);
  };

  const handleConfirm = selected => {
    setDate(selected);
    setDatePickerVisibility(false);
  };

  const obj = route.params.obj;

  const data = [
    {time: '5 mins', id: 1},
    {time: '10 mins', id: 2},
    {time: '15 mins', id: 3},
  ];

  const formatDate = date => {
    const pad = num => num.toString().padStart(2, '0');
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  async function scheduleQuiz() {
    if (!entryFees || !totalSlots || !selectedTime || !date) {
      ToastAndroid.show('Please Enter All Details Correct', ToastAndroid.SHORT);
      return;
    }

    if (parseInt(entryFees) < 10) {
      ToastAndroid.show('Minimum Entry Fees is 10', ToastAndroid.SHORT);
      return;
    }

    if (parseInt(totalSlots) < 10) {
      ToastAndroid.show('Minimum Number of Slots is 10', ToastAndroid.SHORT);
      return;
    }

    const roomServ = new RoomsApiService();
    const sch_time = formatDate(date);

    const obj2 = {
      entryFees,
      slots: totalSlots,
      sch_time,
      lobby_time: selectedTime,
    };

    const createRes = await BasicServices.apiTryCatch(
      async () => await roomServ.createQuiz({...obj, ...obj2}),
      Toast,
    );

    if (createRes) {
      navigation.navigate('scheduledsuccessfullyQuiz', {
        obj: createRes.view_data,
      });
    }
  }

  return (
    <>
      <View style={{zIndex: 20}}>
        <Toast />
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={[styles.enterRoomMainContainer, {padding: 15}]}>
              <View style={styles.backandhistory}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[
                    styles.backimg,
                    {padding: 20, backgroundColor: '#8D4AE2'},
                  ]}>
                  <Image
                    style={[styles.backimg]}
                    resizeMethod="contain"
                    tintColor={'white'}
                    source={require('../../assets/img/backq.png')}
                  />
                </TouchableOpacity>
                <Image
                  style={{height: 100, width: 150}}
                  resizeMethod="contain"
                  source={require('../../assets/img/axeimg.png')}
                />
              </View>

              <View style={styles.flexCenter}>
                <Text style={styles.createLiveText}>
                  Schedule Quiz and Compete with your friends
                </Text>

                <View
                  style={[styles.centerBox, {gap: 12, paddingVertical: 20}]}>
                  {/* Slots */}
                  <View>
                    <Text style={styles.st}>Slots Available</Text>
                    <TextInput
                      style={styles.ddinput}
                      placeholder="no. of slots available"
                      placeholderTextColor="#A1A2AD"
                      inputMode="numeric"
                      value={totalSlots}
                      onChangeText={setTotalSlots}
                    />
                    <Text style={styles.miniumT}>Minimum 10</Text>
                  </View>

                  {/* Entry Fees */}
                  <View>
                    <Text style={styles.st}>Entry Fees</Text>
                    <View style={[styles.containerb, {alignItems: 'center'}]}>
                      <Image
                        style={[styles.backimg, {marginRight: 8}]}
                        resizeMethod="contain"
                        source={require('../../assets/img/bb.png')}
                      />
                      <TextInput
                        style={[styles.ddinput, {flex: 1}]}
                        placeholder="Entry fees in BB Coins"
                        placeholderTextColor="#A1A2AD"
                        inputMode="numeric"
                        value={entryFees}
                        onChangeText={setEntryFees}
                      />
                    </View>
                    <Text style={styles.miniumT}>Minimum 10</Text>
                  </View>

                  {/* Lobby Time */}
                  <View>
                    <Text style={styles.st}>Lobby Time</Text>
                    <Dropdown
                      style={styles.dropdownExam}
                      placeholderStyle={styles.ddexamplaceholderStyle}
                      selectedTextStyle={styles.ddexamselectedTextStyle}
                      inputSearchStyle={styles.ddexaminputSearchStyle}
                      iconStyle={styles.iconStyle}
                      itemContainerStyle={styles.ddExamItemContainerStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={data}
                      activeColor="#212121"
                      search
                      maxHeight={300}
                      labelField="time"
                      valueField="time"
                      placeholder="Select Lobby Time"
                      searchPlaceholder="Search..."
                      value={selectedTime}
                      onChange={item => setSelectedTime(item.time)}
                    />
                  </View>

                  {/* Schedule Quiz Date & Time */}
                  <View>
                    <Text style={styles.st}>Schedule Quiz</Text>
                    <View style={[styles.containerbb, {gap: 12, marginTop: 6}]}>
                      {/* Date */}
                      <View
                        style={[
                          styles.FeesContainer1,
                          {
                            backgroundColor: '#282940',
                            borderRadius: 4,
                            padding: 13,
                          },
                        ]}>
                        <Image
                          source={require('../../assets/img/Timer.png')}
                          style={{height: 20, width: 20, marginRight: 6}}
                          resizeMode="contain"
                        />
                        <TouchableOpacity
                          onPress={() => showDatePicker('date')}>
                          <Text style={[styles.feesT, {color: '#A1A2AD'}]}>
                            {date.toLocaleDateString()}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Time */}
                      <View
                        style={[
                          styles.FeesContainer1,
                          {
                            backgroundColor: '#282940',
                            borderRadius: 4,
                            padding: 13,
                          },
                        ]}>
                        <Image
                          source={require('../../assets/img/time2.png')}
                          style={{height: 20, width: 20, marginRight: 6}}
                          resizeMode="contain"
                          tintColor={'gray'}
                        />
                        <TouchableOpacity
                          onPress={() => showDatePicker('time')}>
                          <Text style={[styles.feesT, {color: '#A1A2AD'}]}>
                            {date.toLocaleTimeString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <DateTimePickerModal
                      date={date}
                      isVisible={isDatePickerVisible}
                      mode={mode}
                      onConfirm={handleConfirm}
                      onCancel={() => setDatePickerVisibility(false)}
                      minimumDate={new Date()}
                    />
                  </View>
                </View>

                {/* Submit Button */}
                <Button
                  containerStyle={{width: '100%', marginTop: 16}}
                  buttonStyle={styles.proceedbtn}
                  titleStyle={{color: '#000'}}
                  title={'Proceed'}
                  onPress={scheduleQuiz}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
