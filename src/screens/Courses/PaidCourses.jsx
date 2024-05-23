import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const PaidCourses = () => {
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded2] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const toggleExpansion1 = () => {
    setExpanded2(!expanded1);
  };
  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
          padding: 10,
          borderRadius: 5,
          marginTop:20
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
            1.
          </Text>
          <Text style={{color: '#000'}}>Courses name</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                backgroundColor: 'rgba(112, 29, 219, 1)',
                padding: 5,
                borderRadius: 5,
                color: '#fff',
              }}>
              Buy Now
            </Text>
          </View>
          <TouchableOpacity onPress={toggleExpansion}>
            <Image
              source={require('../../assets/img/down-arrow.png')}
              style={{width: 24, height: 24, margin: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              padding: 10,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/img/play-button.png')}
                style={{width: 24, height: 24, margin: 8}}
              />
              <Text style={{color: '#000'}}>Courses name</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    backgroundColor: 'rgba(112, 29, 219, 1)',
                    padding: 5,
                    borderRadius: 5,
                    color: '#fff',
                  }}>
                  Play Now
                </Text>
              </View>
              <TouchableOpacity onPress={toggleExpansion1}>
                <Image
                  source={require('../../assets/img/down-arrow.png')}
                  style={{width: 24, height: 24, margin: 8}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {expanded1 && (
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 5,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              padding: 10,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                1.
              </Text>

              <Text style={{color: '#000'}}>Courses name</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default PaidCourses;
