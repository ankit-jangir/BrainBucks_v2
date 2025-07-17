import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker'; // ✅ IMPORT
import { useNavigation } from '@react-navigation/native';

const metrics = [
  {
    icon: require('../../assets/img/questionmark.png'),
    label: 'Total Questions',
    value: '100',
  },
  {
    icon: require('../../assets/img/watch.png'),
    label: 'Time/Question',
    value: '13 sec',
  },
  {
    icon: require('../../assets/img/repetation.png'),
    label: 'Repetition',
    value: 'never',
  },
  {
    icon: require('../../assets/img/calender.png'),
    label: 'Quiz Time',
    value: '26–52 min',
  },
  {
    icon: require('../../assets/img/ticket.png'),
    label: 'Total Slots',
    value: '20',
  },
  {
    icon: require('../../assets/img/purse.png'),
    label: 'Entry Fees',
    value: '₹100',
  },
];

const Quizrules = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const pickImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7B61FF" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIconWrapper}>
          <Image
            source={require('../../assets/img/icon_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Quiz</Text>
      </View>

      {/* Step Progress */}
      <View style={styles.progressWrapper}>
        <Text style={styles.progressText}>7/8 Steps Completed</Text>
        <ProgressBar progress={0.875} color="#fff" style={styles.progressBar} />
      </View>

      {/* Sticky Tab Bar */}
      <View style={styles.stickyTabContainer}>
        {[
          {label: 'UPSC', icon: require('../../assets/img/cap.png')},
          {
            label: 'Civil Services',
            icon: require('../../assets/img/bulding.png'),
          },
        ].map(item => (
          <TouchableOpacity key={item.label} style={styles.tabItem}>
            <Image source={item.icon} style={styles.tabIcon} />
            <Text style={styles.tabText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scroll Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Rules Input */}
        <View style={styles.rulesContainer}>
          <Text style={styles.label}>Enter Rules for Quiz</Text>
          <View style={styles.textAreaWrapper}>
            <TextInput
              placeholder="Enter quiz rules..."
              placeholderTextColor="#717173"
              multiline
              style={styles.textArea}
            />
            <View style={styles.rulesFooter}>
              <TouchableOpacity>
                <Text style={styles.addRuleText}>+ Add More Rule</Text>
              </TouchableOpacity>
              <Text style={styles.charCount}>1/2000</Text>
            </View>
          </View>
        </View>

        {/* Question Composition */}
        <Text style={styles.label}>Question Composition</Text>
        <View style={styles.chipsWrapper}>
          {['Indian History', 'Geography, Indian Polity'].map((topic, idx) => (
            <View key={idx} style={styles.chip}>
              <Text style={styles.chipText}>{topic}</Text>
              <TouchableOpacity style={styles.chipCloseBtn}>
                <Text style={styles.chipCloseText}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          {metrics.map((item, idx) => (
            <View key={idx} style={styles.metricBox}>
              <View style={styles.metricHeader}>
                <Image source={item.icon} style={styles.metricIcon} />
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
              <Text style={styles.metricValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Upload Banner Image */}
        <Text style={styles.label}>Upload Banner Image</Text>
        <View style={styles.uploadWrapper}>
          <View style={styles.dashedBox}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage}
                  : require('../../assets/img/peoples.png')
              }
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={styles.changeImageBtn}
            onPress={pickImageFromGallery}>
            <Image
              source={require('../../assets/img/gallary.png')}
              style={styles.changeImageIcon}
            />
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Preview Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.previewBtn}
          onPress={() => {
            navigation.navigate('quzescreen');
          }}>
          <Text style={styles.previewText}>Preview Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quizrules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#701DDB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 28,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
    marginLeft: 12,
  },
  progressWrapper: {
    backgroundColor: '#701DDB',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#A78BFA',
    borderRadius: 3,
  },
  stickyTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 13,
    borderRadius: 12,
    padding: 15,
    marginTop: -10,
    elevation: 3,
    zIndex: 10,
  },

  tabItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 4,
  },

  tabIcon: {
    width: 19,
    height: 19,
    marginRight: 6,
    resizeMode: 'contain',
  },

  tabText: {
    color: '#701DDB',
    fontSize: 16,
    fontWeight: '600',
  },

  tabTextActive: {
    color: '#7B61FF',
    fontWeight: '600',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 140,
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
    color: '#111827',
    marginTop: 15,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#000',
    fontSize: 15,
  },
  rulesFooter: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addRuleText: {
    color: '#7A33FF', // purple color
    fontWeight: '500',
  },

  charCount: {
    color: '#A0A0A0',
    fontSize: 13,
  },
  rulesContainer: {
    marginBottom: 16,
  },
  textAreaWrapper: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 3,
  },
  addRuleBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  charCount: {
    color: '#A0A0A0',
    fontSize: 13,
  },
  charCount: {
    color: '#999',
    fontSize: 12,
  },
  chipsWrapper: {
    gap: 10,
    marginVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  chipText: {
    color: '#374151',
    fontSize: 15,
    flex: 1,
  },

  chipCloseBtn: {
    marginLeft: 12,
  },
  chipCloseText: {
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  metricBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    width: '47%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  metricIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  metricLabel: {
    fontSize: 13,
    color: '#333',
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  imageBox: {
    backgroundColor: '#F1F1F1',
    borderRadius: 16,
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewBtn: {
    backgroundColor: '#701DDB',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  previewText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },

  backIconWrapper: {
    padding: 4,
  },
  backIcon: {
    width: 28,
    height: 25,
    resizeMode: 'contain',
  },
  uploadWrapper: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  dashedBox: {
    borderWidth: 1.5,
    borderColor: '#D0D5DD',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'hidden',
  },

  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },

  changeImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  changeImageIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'cover',
  },

  changeImageText: {
    color: '#701DDB',
    fontWeight: '500',
    fontSize: 14,
  },
});
