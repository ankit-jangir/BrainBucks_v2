import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';

const AddQuizScreen6 = () => {
  const navigation = useNavigation();
  const [slots, setSlots] = useState(10);

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        name="Add New Quiz"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      {/* Static top section */}
      <View style={styles.topFixed}>
        <Text style={styles.stepText}>6/8 Steps Completed</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.bodyWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Exam Category */}
          <View style={styles.section}>
            <Text style={styles.label}>Exam Category</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>UPSC</Text>
            </View>
          </View>

          {/* Exam Subcategory */}
          <View style={styles.section}>
            <Text style={styles.label}>Exam Subcategory</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Civil Services</Text>
            </View>
          </View>

          {/* Total Slots */}
          <View style={styles.section}>
            <Text style={styles.label}>Enter Total Slots</Text>
            <View
              style={[
                styles.inputContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text style={styles.inputText}>{`Minimum ${slots} Slots`}</Text>
              <TouchableOpacity
                style={styles.adjustButton}
                onPress={() => setSlots(prev => Math.max(1, prev - 1))}>
                <Text style={styles.adjustText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.adjustButton}
                onPress={() => setSlots(prev => prev + 1)}>
                <Text style={styles.adjustText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Entry Fees */}
          <View style={styles.section}>
            <Text style={styles.label}>Entry Fees</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Minimum 10 BB Coins</Text>
            </View>
          </View>

          {/* Question Composition */}
          <View style={styles.section}>
            <Text style={styles.label}>Question Composition</Text>
            <View style={styles.compositionContainer}>
              {[
                {label: 'Indian History', value: 50},
                {label: 'Geography, Indian Polity', value: 50},
              ].map((item, index) => (
                <View key={index} style={{marginBottom: 12}}>
                  <View style={styles.compositionItem}>
                    <Text style={styles.compositionLabel}>{item.label}</Text>
                    <Text style={styles.compositionValue}>{item.value}%</Text>
                  </View>
                  <View style={styles.progressBarSmall}>
                    <View
                      style={[
                        styles.progressFillSmall,
                        {width: `${item.value}%`},
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* Card 1: Total Questions */}
            <View style={styles.halfCard}>
              <View style={styles.cardBox}>
                <Text style={styles.label}>Total Questions</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>100</Text>
                </View>
              </View>
            </View>

            {/* Card 2: Time/Question */}
            <View style={styles.halfCard}>
              <View style={styles.cardBox}>
                <Text style={styles.label}>Time/Question</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>13 sec</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* Card 3: Repetition */}
            <View style={styles.halfCard}>
              <View style={styles.cardBox}>
                <Text style={styles.label}>Repetition</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Never</Text>
                </View>
              </View>
            </View>

            {/* Card 4: Quiz Time */}
            <View style={styles.halfCard}>
              <View style={styles.cardBox}>
                <Text style={styles.label}>Quiz Time</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>26-6-2025</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Upload File */}
          <View style={styles.sectionimg}>
            <View style={styles.uploadContainer}>
              <Image
                source={require('../../assets/img/cloud.png')}
                style={styles.cloudIcon}
              />
              <Text style={styles.labelimg}>Upload file</Text>
              <Text style={styles.uploadText}>300px x 150px</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Spacer behind button */}
      <View style={styles.bottomSpacer} />
      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => {
          navigation.navigate('Quizrules');
        }}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddQuizScreen6;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topFixed: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  bodyWrapper: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  bottomSpacer: {
    height: 80,
    backgroundColor: '#fff',
  },
  stepText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '400',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    width: '75%',
    backgroundColor: '#9333EA',
    borderRadius: 6,
  },
  section: {
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#e9e9eaff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: '600',
  },
  labelimg: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },
  inputContainer: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 6,
  },
  inputText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  adjustButton: {
    backgroundColor: '#E5E7EB',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  adjustText: {
    fontSize: 14,
    color: '#1F2937',
  },
  compositionContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  compositionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  compositionLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  compositionValue: {
    fontSize: 14,
    color: '#111827',
  },


  uploadContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#4B5563',
  },
  proceedButton: {
    position: 'absolute',
    bottom: 22,
    left: 16,
    right: 16,
    backgroundColor: '#701DDB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
     borderColor: '#e9e9eaff',
    borderWidth: 1,
  },
  sectionimg: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },

  proceedText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  cloudIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    tintColor: '#9CA3AF',
  },

  progressBarSmall: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 4,
  },
  progressFillSmall: {
    height: 6,
    backgroundColor: '#9333EA',
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  halfCard: {
    flex: 0.48,
  },

  cardBox: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 10,
      borderColor: '#e9e9eaff',
    borderWidth: 1,
  },
});
