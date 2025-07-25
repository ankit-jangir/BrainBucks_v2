import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {ProgressBar} from 'react-native-paper';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';

const subjectCategories = [
  {id: '1', name: 'Sciences', image: require('../../assets/img/science.png')},
  {id: '2', name: 'Mathematics', image: require('../../assets/img/maths.png')},
  {id: '3', name: 'History', image: require('../../assets/img/history.png')},
  {id: '4', name: 'Languages', image: require('../../assets/img/language.png')},
  {id: '5', name: 'Arts', image: require('../../assets/img/art.png')},
  {id: '6', name: 'Technology', image: require('../../assets/img/tech.png')},
  {id: '7', name: 'Physics', image: require('../../assets/img/tech.png')},
  {id: '8', name: 'Chemistry', image: require('../../assets/img/tech.png')},
  {id: '9', name: 'Geography', image: require('../../assets/img/tech.png')},
  {id: '10', name: 'Economics', image: require('../../assets/img/tech.png')},
];

const bgColors = [
  '#EFF6FF',
  '#F0FDF4',
  '#FEF2F2',
  '#FAF5FF',
  '#FDF2F8',
  '#ECFEFF',
];

const tags = [
  'Biology',
  'Calculus',
  'World War II',
  'English',
  'Hindi',
  'Maths',
];

const SubjectCategory = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  const handleContinue = () => {
    if (!selectedId) {
      ToastAndroid.show(
        'Please select a subject category!',
        ToastAndroid.SHORT,
      );
    } else {
      navigation.navigate('Quizoverview', {categoryId: selectedId});
    }
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

      {/* Fixed Header Content */}
      <View style={styles.fixedContent}>
        <Text style={styles.stepText}>3/8 Steps Completed</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.3}
          color="#9333EA"
        />
        <Text style={styles.title}>Choose Subject Category</Text>
        <Text style={styles.subtitle}>
          Select a subject to create your quiz
        </Text>
        <View style={styles.searchBox}>
          <Image
            source={require('../../assets/img/searchicon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for subjects.."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Scrollable Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollArea}
        contentContainerStyle={{paddingBottom: 180}}>
        {/* Category Grid */}
        <View style={styles.grid}>
          {subjectCategories.map((item, index) => {
            const isSelected = item.id === selectedId;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedId(item.id)}
                style={[
                  styles.card,
                  {
                    backgroundColor: bgColors[index % bgColors.length],
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? '#9333EA' : 'transparent',
                  },
                ]}>
                <Image source={item.image} style={styles.img} />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tags */}
        <Text style={styles.popularTagTitle}>Popular Tags</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagContainer}
          style={styles.tagScrollContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.continueWrapper}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubjectCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 20,
    marginTop: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1.3,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 48,
    height: 48,
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  popularTagTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 8,
  },
  tagScrollContainer: {
    marginBottom: -50,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingLeft: 4,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    height: 36,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10,
    color: '#1A1A1A',
  },
  continueWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 50,
    zIndex: 10,
  },
  continueButton: {
    backgroundColor: '#701DDB',
    borderRadius: 10,
    height: 56,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
