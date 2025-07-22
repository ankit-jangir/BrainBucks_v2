import React, {useState, useEffect} from 'react';
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

const UploadQuestionsScreen = () => {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [search, setSearchTerm] = useState('');
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [xlFile, setXlFile] = useState(null);

  const reloadExams = async () => {
    try {
      setLoading(true);
      const token = await basic.getBearerToken();
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `${QUIZMICRO}/educator/subject?search=${search}`,
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 1) {
        // Transform data for dropdown
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
      setLoading(false);
    }
  };

  // Function to handle Excel file selection
  const selectExcelFile = async () => {
    try {
      const result = await pick({
        type: [types.xls, types.xlsx],
        allowMultiSelection: false,
      });

      if (result && result.length > 0) {
        const file = result[0];
        setXlFile(file);
        ToastAndroid.show('Excel file selected successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User cancelled file selection');
      } else {
        console.error('Error selecting file:', error);
        ToastAndroid.show('Failed to select file', ToastAndroid.SHORT);
      }
    }
  };

  // Function to upload Excel file with questions
  const uploadBulkQuestions = async () => {
    if (!selectedSubject) {
      ToastAndroid.show('Please select a subject first', ToastAndroid.SHORT);
      return;
    }

    if (!xlFile) {
      ToastAndroid.show('Please select an Excel file', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      const token = await basic.getBearerToken();
      
      const formData = new FormData();
      formData.append('sub_id', selectedSubject);
      formData.append('excel', {
        uri: xlFile.uri,
        type: xlFile.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        name: xlFile.name || 'questions.xlsx',
      });

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `${token}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };

      const response = await fetch(
        `${QUIZMICRO}/educator/excel/questions`,
        requestOptions,
      );

      const result = await response.json();
 console.log('====================================');
        console.log(result,'ssssss');
      if (response.ok && result.status === 1) {
        console.log('====================================');
        console.log(result);
        console.log('====================================');
        ToastAndroid.show('Questions uploaded successfully!', ToastAndroid.LONG);
        setXlFile(null);
        setSelectedSubject(null);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading questions:', error);
      ToastAndroid.show(
        error.message || 'Failed to upload questions',
        ToastAndroid.LONG
      );
    } finally {
      setLoading(false);
    }
  };

  // Load subjects on component mount and search change
  useEffect(() => {
    reloadExams();
  }, [search]);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <MainHeader
        name="Add Bulk Questions"
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
            searchPlaceholder="Search subjects..."
            value={selectedSubject}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedSubject(item._id);
              setIsFocus(false);
            }}
            onChangeText={text => {
              setSearchTerm(text);
            }}
            renderItem={item => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.sub_name}</Text>
              </View>
            )}
            dropdownPosition="bottom"
            containerStyle={styles.dropdownContainer}
          />
        </View>

        {/* Excel File Upload Section */}
        <View style={styles.fileUploadSection}>
          <Text style={styles.questionLabel}>Upload Excel File</Text>
          <TouchableOpacity
            style={styles.fileButton}
            onPress={selectExcelFile}
            disabled={loading}>
            <Text style={styles.fileButtonText}>
              {xlFile ? 'Change Excel File' : 'Select Excel File'}
            </Text>
            <Text style={styles.fileName}>
              {xlFile ? xlFile.name : 'No file selected'}
            </Text>
          </TouchableOpacity>
          
          {xlFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileInfoText}>
                Selected: {xlFile.name}
              </Text>
              <Text style={styles.fileSize}>
                Size: {(xlFile.size / 1024).toFixed(2)} KB
              </Text>
            </View>
          )}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionText}>
            • Excel file should contain columns: Question, Option A, Option B, Option C, Option D, Correct Answer
          </Text>
          <Text style={styles.instructionText}>
            • Supported formats: .xls, .xlsx
          </Text>
          <Text style={styles.instructionText}>
            • Maximum file size: 10MB
          </Text>
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#701DDB" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      <View style={styles.bottomFixedButtons}>
        <TouchableOpacity
          style={[styles.proceedButton, loading && styles.disabledButton]}
          onPress={uploadBulkQuestions}
          disabled={loading || !selectedSubject || !xlFile}>
          <Text style={styles.proceedText}>
            {loading ? 'Uploading...' : 'Upload Questions'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UploadQuestionsScreen;

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
  fileUploadSection: {
    marginBottom: 20,
  },
  questionLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileButtonText: {
    color: '#374151',
    fontWeight: '500',
    marginRight: 12,
  },
  fileName: {
    color: '#9CA3AF',
    flex: 1,
  },
  fileInfo: {
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileInfoText: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  instructionsContainer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
  },
  proceedButton: {
    backgroundColor: '#701DDB',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  proceedText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
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
