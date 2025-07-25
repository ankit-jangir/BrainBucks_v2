import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Slider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import MainHeader from '../../components/MainHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown} from 'react-native-element-dropdown';
import RoomsApiService from '../../services/api/RoomsApiService';
import BasicServices from '../../services/BasicServices';
// Import your API services
const Schedulequiz = ({route}) => {
  const navigation = useNavigation();

  // Get route params
  const routeParams = route?.params || {};

  // State variables
  const [questionCount, setQuestionCount] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [entryFees, setEntryFees] = useState('');
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [lobbyTime, setLobbyTime] = useState('5');
  const [isLoading, setIsLoading] = useState(false);

  // Lobby time options
  const lobbyTimeOptions = [
    {label: '5 minutes', value: '5'},
    {label: '10 minutes', value: '10'},
    {label: '30 minutes', value: '30'},
    {label: '1 hour', value: '60'},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(prev => 
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        prev.getHours(),
        prev.getMinutes(),
      )
    );
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedDate(prev => 
      new Date(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate(),
        time.getHours(),
        time.getMinutes(),
      )
    );
    setTimePickerVisibility(false);
  };

  const formatDate = (date) => {
    const pad = num => num.toString().padStart(2, '0');
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  const validateInputs = () => {
    if (!questionCount.trim()) {
      showToast('Please enter number of questions');
      return false;
    }

    if (!totalSlots.trim()) {
      showToast('Please enter number of slots');
      return false;
    }

    if (!entryFees.trim()) {
      showToast('Please enter entry fees');
      return false;
    }

    if (parseInt(entryFees) < 10) {
      showToast('Minimum Entry Fees is 10');
      return false;
    }

    if (parseInt(totalSlots) < 10) {
      showToast('Minimum Number of Slots is 10');
      return false;
    }

    if (parseInt(questionCount) < 1) {
      showToast('Minimum Number of Questions is 1');
      return false;
    }

    // Check if scheduled time is in the future
    if (selectedDate <= new Date()) {
      showToast('Please select a future date and time');
      return false;
    }

    return true;
  };

  const createQuiz = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const roomServ = new RoomsApiService();
      const scheduledTime = formatDate(selectedDate);

      // Prepare quiz data combining route params and form data
      const quizData = {
        // Route params data
        category_id: routeParams.category_id,
        sub_cat_id: routeParams.sub_cat_id,
        category_name: routeParams.category_name,
        category_image: routeParams.category_image,
        subCategoryName: routeParams.subCategoryName,
        room_id: routeParams.room_id,
        room_name: routeParams.room_name,
        
        // Form data
        total_ques: parseInt(questionCount),
        entryFees: parseInt(entryFees),
        slots: parseInt(totalSlots),
        sch_time: scheduledTime,
        lobby_time: `${lobbyTime} mins`,
        time_per_que: timePerQuestion,
      };

      console.log('Creating quiz with data:', quizData);

      const createRes = await BasicServices.apiTryCatch(
        async () => await roomServ.createQuiz(quizData),
        showToast,
      );

       if (createRes) {
      navigation.navigate('roomenter', {
        obj: createRes.view_data,
      });
    }

    } catch (error) {
      console.error('Error creating quiz:', error);
      showToast('An error occurred while creating the quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainHeader
        name="Schedule Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Display category info if available */}
          {routeParams.category_name && (
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryLabel}>Category: {routeParams.category_name}</Text>
              {routeParams.subCategoryName && (
                <Text style={styles.categoryLabel}>
                  Subcategory: {routeParams.subCategoryName}
                </Text>
              )}
            </View>
          )}

          {/* Question Count Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Number of Questions</Text>
            <TextInput
              style={[styles.input, styles.shadow]}
              placeholder="Enter number of questions"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
              value={questionCount}
              onChangeText={setQuestionCount}
            />
          </View>

          {/* Slots Available and Entry Fees Row */}
          <View style={styles.rowContainer}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Slots Available</Text>
              <TextInput
                style={[styles.halfInput, styles.shadow]}
                placeholder="No. of slots"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                value={totalSlots}
                onChangeText={setTotalSlots}
              />
            </View>
            
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Entry Fees (₹)</Text>
              <TextInput
                style={[styles.halfInput, styles.shadow]}
                placeholder="Entry fees"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                value={entryFees}
                onChangeText={setEntryFees}
              />
            </View>
          </View>

          {/* Time Per Question Slider */}
          <View style={styles.inputGroup}>
            <View style={styles.sliderHeader}>
              <Text style={styles.label}>Time for Each Question</Text>
              <Text style={styles.timeValue}>{timePerQuestion}s</Text>
            </View>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.slider}
                minimumValue={5}
                maximumValue={120}
                step={5}
                value={timePerQuestion}
                onValueChange={setTimePerQuestion}
                minimumTrackTintColor="#9333EA"
                maximumTrackTintColor="#E5E7EB"
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>5s</Text>
                <Text style={styles.sliderLabel}>120s</Text>
              </View>
            </View>
          </View>

          {/* Schedule Date and Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Quiz</Text>
            <View style={styles.scheduleRow}>
              <TouchableOpacity
                style={[styles.scheduleBox, styles.shadow]}
                onPress={showDatePicker}>
                <Image
                  source={require('../../assets/img/date.png')}
                  style={styles.iconImg}
                />
                <Text style={styles.scheduleText}>
                  {selectedDate.toLocaleDateString('en-GB')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.scheduleBox, styles.shadow]}
                onPress={showTimePicker}>
                <Image
                  source={require('../../assets/img/time.png')}
                  style={styles.iconImg}
                />
                <Text style={styles.scheduleText}>
                  {selectedDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Lobby Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lobby Time</Text>
            <Dropdown
              style={[styles.dropdown, styles.shadow]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={lobbyTimeOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Select lobby time"
              value={lobbyTime}
              onChange={item => setLobbyTime(item.value)}
            />
          </View>

          {/* Create Quiz Button */}
          <TouchableOpacity
            style={[
              styles.proceedButton, 
              styles.shadow,
              isLoading && styles.disabledButton
            ]}
            onPress={createQuiz}
            disabled={isLoading}
            activeOpacity={0.8}>
            <Text style={styles.proceedText}>
              {isLoading ? 'Creating Quiz...' : 'Create Quiz'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Date Time Pickers */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
        />
      </View>
    </>
  );
};

export default Schedulequiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  categoryInfo: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#9333EA',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
    marginBottom: 4,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontWeight: '400',
    fontSize: 13,
    color: '#444548ff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfInputContainer: {
    flex: 0.48,
  },
  halfInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sliderHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9333EA',
  },
  sliderWrapper: {
    marginTop: 4,
  },
  slider: {
    height: 30,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  thumbStyle: {
    height: 20,
    width: 20,
    backgroundColor: '#9333EA',
    borderRadius: 10,
    shadowColor: '#9333EA',
  },
  trackStyle: {
    height: 6,
    borderRadius: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scheduleText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  iconImg: {
    width: 20,
    height: 20,
    tintColor: '#9333EA',
  },
  dropdown: {
    height: 56,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#111827',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: '#6B7280',
  },
  proceedButton: {
    marginTop: 20,
    backgroundColor: '#9333EA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  proceedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  shadow: {
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
