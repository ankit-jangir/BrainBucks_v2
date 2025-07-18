import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import {Slider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import MainHeader from '../../components/MainHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown} from 'react-native-element-dropdown';

const Schedulequiz = () => {
  const navigation = useNavigation();

  const [questionCount, setQuestionCount] = useState('');
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [repeatOption, setRepeatOption] = useState('never');

  const repeatOptions = [
    {label: 'never', value: 'never'},
    {label: '5 minutes', value: '5'},
    {label: '10 minutes', value: '10'},
    {label: '30 minutes', value: '30'},
    {label: '1 hour', value: '60'},
  ];

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleDateConfirm = date => {
    setSelectedDate(
      prev =>
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          prev.getHours(),
          prev.getMinutes(),
        ),
    );
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    setSelectedDate(
      prev =>
        new Date(
          prev.getFullYear(),
          prev.getMonth(),
          prev.getDate(),
          time.getHours(),
          time.getMinutes(),
        ),
    );
    setTimePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <View style={styles.fixedProgressBar}>
        <Text style={styles.stepText}>5/8 Steps Completed</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardRow}>
          <View style={[styles.card]}>
            <Text style={styles.cardTitle}>Exam Category</Text>
            <Text style={styles.cardValue}>UPSC</Text>
          </View>
          <View style={[styles.card]}>
            <Text style={styles.cardTitle}>Exam Sub Category</Text>
            <Text style={styles.cardValue}>Civil Services</Text>
          </View>
        </View>

        <Text style={styles.label}>Enter Total Number of Questions</Text>
        <TextInput
          style={[styles.input, styles.shadow]}
          placeholder="Enter number"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          value={questionCount}
          onChangeText={setQuestionCount}
        />
        <Text style={styles.inputHint}>
          Minimum 10 Questions • Maximum 500 Questions
        </Text>

        <Text style={[styles.label, {marginTop: 20}]}>
          Questions Composition
        </Text>
        <View style={[styles.qBox, styles.shadow]}>
          <ScrollView style={{maxHeight: 200}} nestedScrollEnabled={true}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={{marginTop: index === 0 ? 0 : 12}}>
                <View style={styles.qRow}>
                  <Text style={styles.qTitle}>Geography, Indian Polity</Text>
                  <Text style={styles.qPercent}>50%</Text>
                </View>
                <View style={styles.qProgressBar}>
                  <View style={[styles.qProgressFill, {width: '50%'}]} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={[styles.label, {marginTop: 20}]}>
          Select Time Per Question
        </Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={120}
            step={5}
            value={timePerQuestion}
            onValueChange={setTimePerQuestion}
            minimumTrackTintColor="#9333EA"
            maximumTrackTintColor="#ddd"
            thumbStyle={styles.thumbStyle}
          />
          <Text style={styles.sliderValue}>{timePerQuestion}s</Text>
        </View>

        <Text style={styles.label}>Schedule Quiz</Text>
        <View style={styles.scheduleRow}>
          <TouchableOpacity
            style={[styles.scheduleBox, styles.shadow]}
            onPress={() => setDatePickerVisibility(true)}>
            <Image
              source={require('../../assets/img/date.png')}
              style={styles.iconImg}
            />
            <Text style={styles.scheduleText}>
              {selectedDate.toISOString().split('T')[0]}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.scheduleBox, styles.shadow]}
            onPress={() => setTimePickerVisibility(true)}>
            <Image
              source={require('../../assets/img/time.png')}
              style={styles.iconImg}
            />
            <Text style={styles.scheduleText}>
              {selectedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          Repeat Quiz After Minutes{' '}
          <Text style={{color: '#9CA3AF'}}>(optional)</Text>
        </Text>
        <Dropdown
          style={[styles.dropdown, styles.shadow]}
          dropdownPosition="auto"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          iconStyle={styles.iconStyle}
          data={repeatOptions}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="never"
          value={repeatOption}
          onChange={item => setRepeatOption(item.value)}
        />
      </ScrollView>

      <View style={styles.bottomFixed}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            const num = parseInt(questionCount);
            if (!questionCount || isNaN(num)) {
              showToast('Please enter total number of questions');
              return;
            }
            if (num < 10) {
              showToast('Minimum 10 questions required');
              return;
            }
            if (num > 500) {
              showToast('Maximum 500 questions allowed');
              return;
            }
            navigation.navigate('Addquizscreen');
          }}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </View>
  );
};

export default Schedulequiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  fixedProgressBar: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  stepText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '400',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginVertical: 8,
  },
  progressFill: {
    height: 6,
    width: '62.5%',
    backgroundColor: '#9333EA',
    borderRadius: 6,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    height: 88,
  },
  cardTitle: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '400',
  },
  cardValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: '#111827',
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    fontSize: 12,
    color: '#111827',
  },
  inputHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  qBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    height: 240,
    borderRadius: 12,
    marginTop: 10,
  },
  qRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  qPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  qProgressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 6,
  },
  qProgressFill: {
    height: 6,
    backgroundColor: '#9333EA',
    borderRadius: 6,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    marginLeft: 12,
    color: '#9333EA',
    fontWeight: '600',
  },
  scheduleRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  scheduleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
  },
  scheduleText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#111827',
  },
  iconImg: {
    width: 20,
    height: 20,
    tintColor: '#9333EA',
  },
  bottomFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingBottom:30,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  dropdown: {
    marginTop: 8,
    height: 50,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: '#6B7280',
  },
  itemTextStyle: {
    fontSize: 12,
    color: '#000',
  },
  thumbStyle: {
    height: 14,
    width: 14,
    backgroundColor: '#9333EA',
    borderRadius: 7,
  },
});
