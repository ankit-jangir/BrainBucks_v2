import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    FlatList,
  } from 'react-native';
import {Text} from '../../utils/Translate';
import React, {useEffect, useState} from 'react';
import {List} from 'react-native-paper';
import styles from '../../styles/Home.styles';


const FreeCourses = ({navigation,data}) => {
  const [expanded, setExpanded] = useState(false);
  const [innerExpanded, setInnerExpanded] = useState(false);


  const handlePress = (e) => {
    setExpanded(!expanded);
  }
  const handleInnerPress = () => setInnerExpanded(!innerExpanded);

  return (
    <View>
      <List.Section>
        <List.Accordion
          title={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                1.
              </Text>
              <Text style={{color: '#000'}}>Courses name {" "}</Text>
            </View>
          }
          expanded={expanded}
          onPress={handlePress}
          right={props => (
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity key={"sdl"} onPress={(e)=>{e.preventDefault(), console.log("SD:K")}}>
                <Text
                  style={{
                    backgroundColor: 'rgba(112, 29, 219, 1)',
                    padding: 5,
                    borderRadius: 5,
                    color: '#fff',
                  }}>
                  Buy Now
                </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handlePress}>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  style={{width: 24, height: 24, margin: 8}}
                />
              </TouchableOpacity>
            </View>
          )}>
          <View>
            <List.Accordion
              title={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/img/play-button.png')}
                    style={{width: 15, height: 15, margin: 8}}
                  />
                  <Text style={{color: '#000'}}>Courses name</Text>
                </View>
              }
              expanded={innerExpanded}
              onPress={handleInnerPress} // This ensures the internal logic is consistent
              right={props => (
                <TouchableOpacity onPress={handleInnerPress}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          backgroundColor: 'rgba(112, 29, 219, 1)',
                          padding: 5,
                          borderRadius: 5,
                          color: '#fff',
                          fontSize: 14,
                        }}>
                        Play Now
                      </Text>
                    </View>
                    <Image
                      source={require('../../assets/img/down-arrow.png')}
                      style={{width: 24, height: 24, margin: 8}}
                    />
                  </View>
                </TouchableOpacity>
              )}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <View style={styles.mainV}>
                    <Text style={styles.mainText}>{item.title}</Text>
                    <View style={styles.mainText1}>
                      <Text style={{color: 'gray'}}>{item.title}</Text>
                    </View>
                  </View>
                )}
                contentContainerStyle={{padding: 15}}
                style={{maxHeight: '100%'}}
                nestedScrollEnabled={true}
              />
            </List.Accordion>
          </View>
        </List.Accordion>
      </List.Section>
    </View>
  );
};

export default FreeCourses;
