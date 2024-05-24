import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Text} from '../../utils/Translate';

const CardFree = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: '#ffffff',
          margin: 7,
          padding: 20,
          borderRadius: 8,
          elevation:1
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={require('../../assets/img/banner.png')}
              style={{width: 35, height: 35, borderRadius: 100}}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                paddingLeft: 20,
                fontWeight: '700',
              }}>
              SBI-PO Current Affairs
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row',alignItems:'center',marginTop:20,justifyContent:'space-between'}}>
       <View style={{flexDirection: 'row',alignItems:'center'}}>
       <View>
          <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
             Fees
            </Text>
          </View>
          <View style={{flexDirection:'row',paddingLeft:10,alignItems:'center'}}>
          <Image source={require('../../assets/img/bbcoin.png')} resizeMode='contain' style={{width:25,height:25}} />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '700',
                paddingLeft: 5,
              }}>99
            </Text>
          </View>
       </View>
       <View style={{flexDirection: 'row',alignItems:'center',}}>
       <View>
       <Image source={require('../../assets/img/time2.png')} resizeMode='contain' tintColor={'rgba(138, 138, 138, 1)'} style={{width:20,height:20}} />
          </View>
          <View style={{flexDirection:'row',paddingLeft:10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>12/10/2002
            </Text>
          </View>
          </View>
        </View>
        <View style={{flexDirection: 'row',alignItems:'center',marginTop:10,justifyContent:'space-between'}}>
       <View style={{flexDirection: 'row',alignItems:'center'}}>
       <View>
          <Text
              style={{
                color: 'rgba(126, 126, 126, 1)',
                fontSize: 14,
                paddingLeft: 6,
                fontWeight: '500',
              }}>
             Prize
            </Text>
          </View>
          <View style={{flexDirection:'row',paddingLeft:10,alignItems:'center'}}>
          <Image source={require('../../assets/img/bbcoin.png')} resizeMode='contain' style={{width:25,height:25}} />
            <Text
              style={{
                color: 'rgba(245, 184, 7, 1)',
                fontSize: 16,
                fontWeight: '600',
                paddingLeft: 5,
              }}>99
            </Text>
          </View>
       </View>
       <View style={{flexDirection: 'row',alignItems:'center',}}>
       <View>
       <Image source={require('../../assets/img/calendar.png')} resizeMode='contain' tintColor={'rgba(138, 138, 138, 1)'} style={{width:17,height:17}} />
          </View>
          <View style={{flexDirection:'row',paddingLeft:10}}>
            <Text
              style={{
                color: 'rgba(138, 138, 138, 1)',
                fontSize: 14,
                fontWeight: '600',
                paddingLeft: 5,
              }}>12/10/2002
            </Text>
          </View>
       </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center",marginTop:10}} >
         <Image source={require('../../assets/img/dollar.png')} resizeMode='contain' style={{width:25,height:25}} />
         <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',paddingLeft:10}}>
           <Text style={{color:'#2188E7',fontFamily:'WorkSans-SemiBold',fontSize:18}} >988/</Text>
           <Text style={{color:'#333333',fontFamily:'WorkSans-SemiBold',fontSize:18}} >88</Text>
         </View>
       </View>

       <View style={{width:"100%",height:40,justifyContent:"center"}}>
      <View style={{ height: 10, backgroundColor: 'whitesmoke', borderRadius: 10 }}>
        </View>
      </View>


      </View>
    </>
  );
};

export default CardFree;

const styles = StyleSheet.create({});
