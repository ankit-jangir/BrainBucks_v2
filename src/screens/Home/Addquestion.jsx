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
import {launchImageLibrary} from 'react-native-image-picker';
import MainHeader from '../../components/MainHeader';
import {useNavigation} from '@react-navigation/native';

const AddQuestion = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([
    {
      question: '',
      image: null,
      options: ['', '', '', ''],
      correctIndex: null,
    },
  ]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleOptionChange = (text, qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = text;
    setQuestions(updated);
  };

  const handleImagePicker = qIndex => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        const updated = [...questions];
        updated[qIndex].image = image;
        setQuestions(updated);
      }
    });
  };

  const handleAddTextQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        image: null,
        options: ['', '', '', ''],
        correctIndex: null,
      },
    ]);
  };

  const isFormValid = () => {
    return questions.every(
      q =>
        q.question.trim() &&
        q.options.every(opt => opt.trim()) &&
        q.correctIndex !== null,
    );
  };

  const handleProceed = () => {
    // if (!isFormValid()) {
    //   showToast('Please complete all fields and select correct options.');
    //   return;
    // }
    // showToast('Proceeding to schedule quiz...');
    navigation.navigate('Schedulequiz');
  };

  return (
    <View style={styles.wrapper}>
      <MainHeader
        name="Add Questions"
        leftIcon={{
          source: require('../../assets/img/backq.png'),
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {questions.map((q, qIndex) => (
          <View key={qIndex} style={styles.questionBlock}>
            <Text style={styles.label}>Question {qIndex + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your question"
              placeholderTextColor="#9CA3AF"
              value={q.question}
              onChangeText={text => {
                const updated = [...questions];
                updated[qIndex].question = text;
                setQuestions(updated);
              }}
            />

            <TouchableOpacity
              style={styles.fileButton}
              onPress={() => handleImagePicker(qIndex)}>
              <Text style={styles.fileButtonText}>Choose File</Text>
              <Text style={styles.fileName}>
                {q.image
                  ? q.image.fileName || 'Image Selected'
                  : 'No file chosen'}
              </Text>
            </TouchableOpacity>

            {q.image && (
              <Image
                source={{uri: q.image.uri}}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            {['A', 'B', 'C', 'D'].map((label, i) => (
              <View key={i} style={styles.optionContainer}>
                <TouchableOpacity
                  style={styles.radioCircle}
                  onPress={() => {
                    const updated = [...questions];
                    updated[qIndex].correctIndex = i;
                    setQuestions(updated);
                  }}>
                  {q.correctIndex === i && <View style={styles.selectedRb} />}
                </TouchableOpacity>
                <View style={styles.optionTextInputContainer}>
                  <Text style={styles.optionLabel}>Option {label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter option ${label}`}
                    placeholderTextColor="#9CA3AF"
                    value={q.options[i]}
                    onChangeText={text =>
                      handleOptionChange(text, qIndex, i)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        ))}

        <View style={{height: 180}} />
      </ScrollView>

      {/* Fixed Footer with White Background */}
      <View style={styles.bottomFixedButtons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleAddTextQuestion}>
            <Text style={styles.buttonText}>Add Text Option</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleImagePicker(questions.length - 1)}>
            <Text style={styles.buttonText}>Add Image Option</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  label: {
    marginBottom: 4,
    fontSize: 12,
    color: '#111827',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: '#111827',
    fontSize: 12,
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
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9333EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9333EA',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  secondaryButton: {
    flex: 0.48,
    backgroundColor: '#701DDB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  proceedText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  questionBlock: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 16,
  },
  bottomFixedButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
