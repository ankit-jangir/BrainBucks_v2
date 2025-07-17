import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import basic from '../../services/BasicServices';
import {useNavigation} from '@react-navigation/native';

export default function ExamSearchScreen() {
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [examResults, setExamResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://auth.brainbucks.in/stream/get/public?blobname=';

  const saveToRecentSearches = async text => {
    try {
      const existing = await AsyncStorage.getItem('recentSearches');
      let arr = existing ? JSON.parse(existing) : [];
      if (!arr.includes(text)) {
        arr.unshift(text);
        arr = arr.slice(0, 10); // keep only 10 recent searches
        await AsyncStorage.setItem('recentSearches', JSON.stringify(arr));
      }
    } catch (err) {
      console.error('Saving recent search failed:', err);
    }
  };

  const loadRecentSearches = async () => {
    try {
      const data = await AsyncStorage.getItem('recentSearches');
      if (data) setRecentSearches(JSON.parse(data));
    } catch (err) {
      console.error('Loading recent search failed:', err);
    }
  };

  const submitSearch = async text => {
    if (!text.trim()) return;

    setSearchText(text);
    setLoading(true);

    try {
      let token = await basic.getBearerToken();
      const res = await fetch(`https://quiz.brainbucks.in/home/get/exams`, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });
      const result = await res.json();
      const exams = result?.exams || [];

      const filtered = exams.filter(exam =>
        exam.category_name.toLowerCase().includes(text.toLowerCase())
      );

      setExamResults(filtered);
      await saveToRecentSearches(text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = async keyword => {
    setSearchText(keyword);
    await submitSearch(keyword);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('MyExamQuizzes', {
          id: item._id,
          imgurl: item.image,
          title: item.category_name,
        })
      }>
      <Image
        source={
          item.image
            ? {uri: `${BASE_URL}${item.image}`}
            : require('../../assets/img/sbi.png')
        }
        style={styles.cardImage}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.category_name}</Text>
        <Text style={styles.cardSubtitle}>{`${item.quizCount} Quizzes`}</Text>
      </View>
      <Image
        source={require('../../assets/img/right-arrows.png')}
        style={styles.checkboxIcon}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    loadRecentSearches();
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.searchBox}>
  <Image
    source={require('../../assets/img/seacrc.png')}
    style={styles.searchIcon}
  />
  <TextInput
    ref={inputRef}
    value={searchText}
    onChangeText={text => setSearchText(text)}
    onSubmitEditing={() => submitSearch(searchText)}
    placeholder="Search for Exams"
    placeholderTextColor="#888"
    style={styles.input}
  />
  {searchText.length > 0 && (
    <TouchableOpacity onPress={() => {
      setSearchText('');
      setExamResults([]);
    }}>
      <Image
        source={require('../../assets/img/close.png')} // 👈 Replace with your X icon
        style={styles.clearIcon}
      />
    </TouchableOpacity>
  )}
</View>


      {searchText.length === 0 && recentSearches.length > 0 && (
        <View style={styles.recentBox}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          {recentSearches.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleRecentSearch(item)}>
              <Text style={styles.recentItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>Loading exams...</Text>
      ) : (
        <FlatList
          data={examResults}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            searchText ? (
              <Text style={styles.noResultText}>No exams found</Text>
            ) : null
          }
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  clearIcon: {
  width: 18,
  height: 18,
  tintColor: '#888',
  marginLeft: 8,
},

  container: {
    flex: 1,
    backgroundColor: '#FAF9FA',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#555',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#EEE',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  checkboxIcon: {
    width: 22,
    height: 22,
    tintColor: '#555',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  recentBox: {
    marginBottom: 16,
  },
  recentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  recentItem: {
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
