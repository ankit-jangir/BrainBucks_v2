import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {pick, types} from '@react-native-documents/picker';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import basic from '../../services/BasicServices';
import {QUIZMICRO} from '../../config/urls';

const AddQuestion = () => {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [search, setSearchTerm] = useState('');
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // Separate loading for search
  const [xlFile, setXlFile] = useState(null);

  // Single question state
  const [question, setQuestion] = useState({
    question: '',
    questionImage: null,
    optionType: 'text',
    options: ['', '', '', ''],
    optionImages: [null, null, null, null],
    correctIndex: null,
  });

  // Debounced search function
  const debounceSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (searchTerm.length >= 2 || searchTerm.length === 0) {
            // Only search if 2+ characters or empty (to show all)
            reloadExams(searchTerm);
          }
        }, 800); // 800ms delay - user ko type karne ka time
      };
    })(),
    []
  );

  // Handle option text change
  const handleOptionChange = (text, optIndex) => {
    const updated = {...question};
    updated.options[optIndex] = text;
    setQuestion(updated);
  };

  // Handle option image change
  const handleOptionImageChange = optIndex => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        const updated = {...question};
        updated.optionImages[optIndex] = image;
        setQuestion(updated);
      }
    });
  };

  // Handle image picker for questions
  const handleQuestionImagePicker = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        const updated = {...question};
        updated.questionImage = image;
        setQuestion(updated);
      }
    });
  };

  const toggleOptionType = newType => {
    const updated = {...question};
    updated.optionType = newType;
    if (newType === 'text') {
      updated.optionImages = [null, null, null, null];
    } else {
      updated.options = ['', '', '', ''];
    }
    updated.correctIndex = null;
    setQuestion(updated);
  };

  // Modified reloadExams function with proper loading states
  const reloadExams = async (searchTerm = '') => {
    try {
      setSearchLoading(true);
      const token = await basic.getBearerToken();
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `${QUIZMICRO}/educator/subject?search=${searchTerm}`,
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 1) {
        const transformedData = result.data.map(item => ({
          label: item.sub_name || item.name || 'Unknown Subject',
          value: item._id || item.id,
          sub_name: item.sub_name || item.name,
          ...item,
        }));

        setSubjectData(transformedData);
      } else {
        setSubjectData([]);
        console.log('No subjects found or invalid response');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjectData([]);
      ToastAndroid.show('Failed to load subjects', ToastAndroid.SHORT);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchTerm(text);
    debounceSearch(text); // Use debounced search
  };

  // Fixed Submit Question Function
  const submitQuestion = async () => {
    try {
      // Validation
      if (!selectedSubject) {
        ToastAndroid.show('Please select a subject', ToastAndroid.LONG);
        return;
      }

      if (!question.question.trim()) {
        ToastAndroid.show('Please enter a question', ToastAndroid.LONG);
        return;
      }

      if (
        question.correctIndex === null ||
        question.correctIndex === undefined
      ) {
        ToastAndroid.show(
          'Please select the correct answer',
          ToastAndroid.LONG,
        );
        return;
      }

      // Validate based on option type
      if (question.optionType === 'text') {
        const emptyOptions = question.options.filter(opt => !opt.trim());
        if (emptyOptions.length > 0) {
          ToastAndroid.show('Please fill all text options', ToastAndroid.LONG);
          return;
        }
      } else {
        const emptyImages = question.optionImages.filter(img => img === null);
        if (emptyImages.length > 0) {
          ToastAndroid.show(
            'Please select all option images',
            ToastAndroid.LONG,
          );
          return;
        }
      }

      setLoading(true);

      const token = await basic.getBearerToken();
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const formdata = new FormData();
      formdata.append('question', question.question.trim());
      formdata.append('ans', (question.correctIndex + 1).toString());
      formdata.append('sub_id', selectedSubject);
      formdata.append(
        'is_opt_img',
        question.optionType === 'image' ? '1' : '0',
      );

      console.log('Basic form data:', {
        question: question.question.trim(),
        ans: question.correctIndex + 1,
        sub_id: selectedSubject,
        is_opt_img: question.optionType === 'image' ? '1' : '0',
      });

      // Add options based on type
      if (question.optionType === 'text') {
        question.options.forEach((option, index) => {
          formdata.append(`option${index + 1}`, option.trim());
        });
        console.log('Text options added:', question.options);
      } else {
        question.optionImages.forEach((img, index) => {
          if (img && img.uri) {
            const optionImage = {
              uri: img.uri,
              type: img.type || 'image/jpeg',
              name: img.fileName || `option_${index + 1}_image.jpg`,
            };
            formdata.append(`option${index + 1}`, optionImage);
            console.log(`Option ${index + 1} image:`, {
              name: optionImage.name,
              type: optionImage.type,
              uri: img.uri.substring(0, 50) + '...',
            });
          }
        });
      }

      // Add question image if exists
      if (question.questionImage && question.questionImage.uri) {
        const questionImg = {
          uri: question.questionImage.uri,
          type: question.questionImage.type || 'image/jpeg',
          name: question.questionImage.fileName || 'question_image.jpg',
        };
        formdata.append('question_url', questionImg);
        console.log('Question image added:', {
          name: questionImg.name,
          type: questionImg.type,
        });
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', token);
      myHeaders.append('Content-Type', 'multipart/form-data');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        `${QUIZMICRO}/educator/upload-question`,
        requestOptions,
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(
          `HTTP ${response.status}: ${errorText || 'Server error'}`,
        );
      }

      const result = await response.json();

      if (result.status === 1 || result.success === true) {
        ToastAndroid.show(result.msg, ToastAndroid.LONG);
        resetQuestion();
      } else {
        const errorMessage =
          result.message || result.error || 'Failed to upload question';
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Submit Question Error:', error);
      const errorMessage =
        error.message || 'Failed to upload question. Please try again.';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced reset function
  const resetQuestion = () => {
    setQuestion({
      question: '',
      questionImage: null,
      optionType: 'text',
      options: ['', '', '', ''],
      optionImages: [null, null, null, null],
      correctIndex: null,
    });
    console.log('Question form reset');
  };

  // Load subjects on component mount only
  useEffect(() => {
    reloadExams(''); // Initial load without search
  }, []); // Empty dependency array - only runs once

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <MainHeader
        name="Add Question"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        {/* Subject Selection Dropdown */}
        <View style={styles.subjectContainer}>
          <Text style={styles.questionLabel}>Select subject</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#701DDB'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={subjectData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              selectedSubject
                ? subjectData.find(item => item.value === selectedSubject)
                    ?.sub_name || 'Select subject'
                : 'Select subject'
            }
            searchPlaceholder="search..."
            value={selectedSubject}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedSubject(item._id);
              setIsFocus(false);
            }}
            onChangeText={handleSearchChange} // Modified handler
            renderItem={item => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.sub_name}</Text>
              </View>
            )}
            renderRightIcon={() => (
              searchLoading ? (
                <ActivityIndicator size="small" color="#701DDB" />
              ) : (
                <Text style={styles.dropdownArrow}>▼</Text>
              )
            )}
            dropdownPosition="bottom"
            containerStyle={styles.dropdownContainer}
          />
        </View>

        {/* Single Question */}
        <View style={styles.questionBlock}>
          <Text style={styles.questionLabel}>Question</Text>

          {/* Option Type Toggle */}
          <View style={styles.optionTypeContainer}>
            <Text style={styles.optionTypeLabel}>Option Type:</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  question.optionType === 'text' && styles.activeToggle,
                ]}
                onPress={() => toggleOptionType('text')}>
                <Text
                  style={[
                    styles.toggleText,
                    question.optionType === 'text' && styles.activeToggleText,
                  ]}>
                  Text
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  question.optionType === 'image' && styles.activeToggle,
                ]}
                onPress={() => toggleOptionType('image')}>
                <Text
                  style={[
                    styles.toggleText,
                    question.optionType === 'image' && styles.activeToggleText,
                  ]}>
                  Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your question"
            placeholderTextColor="#9CA3AF"
            value={question.question}
            multiline
            onChangeText={text => {
              const updated = {...question};
              updated.question = text;
              setQuestion(updated);
            }}
          />

          <TouchableOpacity
            style={styles.fileButton}
            onPress={handleQuestionImagePicker}>
            <Text style={styles.fileButtonText}>Choose Question Image</Text>
            <Text style={styles.fileName}>
              {question.questionImage
                ? question.questionImage.fileName || 'Image Selected'
                : 'No file chosen'}
            </Text>
          </TouchableOpacity>

          {question.questionImage && (
            <Image
              source={{uri: question.questionImage.uri}}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}

          {/* Options */}
          {['A', 'B', 'C', 'D'].map((label, i) => (
            <View key={i} style={styles.optionContainer}>
              <TouchableOpacity
                style={[
                  styles.radioCircle,
                  question.correctIndex === i && styles.selectedRadio,
                ]}
                onPress={() => {
                  const updated = {...question};
                  updated.correctIndex = i;
                  setQuestion(updated);
                }}>
                {question.correctIndex === i && (
                  <View style={styles.selectedRb} />
                )}
              </TouchableOpacity>
              <View style={styles.optionTextInputContainer}>
                <Text style={styles.optionLabel}>Option {label}</Text>

                {question.optionType === 'text' ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter option ${label}`}
                    placeholderTextColor="#9CA3AF"
                    value={question.options[i]}
                    onChangeText={text => handleOptionChange(text, i)}
                  />
                ) : (
                  <View>
                    <TouchableOpacity
                      style={styles.fileButton}
                      onPress={() => handleOptionImageChange(i)}>
                      <Text style={styles.fileButtonText}>Choose Image</Text>
                      <Text style={styles.fileName}>
                        {question.optionImages[i]
                          ? question.optionImages[i].fileName ||
                            'Image Selected'
                          : 'No file chosen'}
                      </Text>
                    </TouchableOpacity>

                    {question.optionImages[i] && (
                      <Image
                        source={{uri: question.optionImages[i].uri}}
                        style={styles.optionPreviewImage}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#701DDB" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomFixedButtons}>
        <TouchableOpacity
          style={[styles.proceedButton, loading && styles.disabledButton]}
          onPress={submitQuestion}
          disabled={loading}>
          <Text style={styles.proceedText}>
            {loading ? 'Submitting...' : 'Submit Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddQuestion;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  subjectContainer: {
    marginBottom: 20,
    zIndex: 1000,
  },
  dropdown: {
    height: 50,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  dropdownContainer: {
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    color: '#111827',
    fontSize: 16,
  },
  optionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  activeToggle: {
    backgroundColor: '#701DDB',
  },
  toggleText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  questionLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    color: '#111827',
    fontSize: 16,
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  fileButtonText: {
    color: '#374151',
    fontWeight: '500',
    marginRight: 12,
    fontSize: 12,
  },
  fileName: {
    color: '#9CA3AF',
    flex: 1,
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  optionPreviewImage: {
    width: '100%',
    height: 100,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 8,
  },
  selectedRadio: {
    borderColor: '#701DDB',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#701DDB',
  },
  optionTextInputContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
    fontWeight: '500',
  },
  questionBlock: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 24,
  },
  bottomFixedButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#6B7280',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  proceedText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
});
