import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/Rooms.styles';
import { Button, Text, TextInput } from '../../utils/Translate';
import { Dropdown, } from 'react-native-element-dropdown';
import { Slider } from '@rneui/themed';
export default function ScheduleQuizTime({ navigation }) {
    

    

    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubCat, setSelectedSubCat] = useState(null);
    const [isFocusExam, setIsFocusExam] = useState(false);
    const [isFocusSubCat, setIsFocusSubCat] = useState(false);
    const [value, setValue] = useState(0);
    return (
        <View style={[styles.enterRoomMainContainer, { padding: 15 }]}>
            <View style={styles.backandhistory}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backimg, { padding: 20, backgroundColor: '#8D4AE2' }]}>
                    <Image style={[styles.backimg]} resizeMethod='contain' tintColor={"white"} source={require('../../assets/img/arrow-left.png')} />
                </TouchableOpacity>
                <Image style={{ height: 170, width: 200, }} resizeMethod='contain' source={require('../../assets/img/axeimg.png')} />
            </View>

            <View style={styles.flexCenter}>
                <Text style={styles.createLiveText}>Create Live Quiz and Compete with your friends</Text>

                <View style={styles.centerBox}>
                    <View>
                        <Text style={styles.st}>Slots Available</Text>
                        <TextInput
                            style={styles.ddinput}
                            placeholder="no. of slots available" 
                       placeholderTextColor= '#A1A2AD'

                        />
                        <Text style={styles.miniumT}>Minimum 10</Text>

                    </View>
                    <View>
                        <Text style={styles.st}>Entry Fees</Text>
                        <View style={styles.containerb}>
                            <Image style={[styles.backimg]} resizeMethod='contain' source={require('../../assets/img/bb.png')} />

                            <TextInput
                                style={styles.ddinput}
                                placeholder="Entry fees in BB Coins" 
                       placeholderTextColor= '#A1A2AD'

                            />
                        </View>
                        <Text style={styles.miniumT}>Minimum 10</Text>

                    </View>
                   
                    <View>
                    <Text style={styles.st}>Schedule Quiz</Text>
                    <View style={styles.containerbb}>
                    <View style={[styles.FeesContainer1,{backgroundColor:"#282940",borderRadius: 4,padding: 13,}]}>
                    <Image
                      source={require('../../assets/img/Timer.png')}
                      style={{height: 20, width: 20}}
                      resizeMode="contain"
                    />
                    <Text style={[styles.feesT,{color:"#A1A2AD"}]}>20/12/2002</Text>
                  </View>
                        
                  <View style={[styles.FeesContainer1,{backgroundColor:"#282940",borderRadius: 4,padding: 13,}]}>
                    <Image
                      source={require('../../assets/img/time2.png')}
                      style={{height: 20, width: 20}}
                      resizeMode="contain"
                      tintColor={"gray"}
                    />
                    <Text style={[styles.feesT,{color:"#A1A2AD"}]}>12:30</Text>
                  </View>
                    </View>

                </View>

                </View>

                <Button
                    containerStyle={{ width: '100%' }}
                    buttonStyle={styles.proceedbtn}
                    titleStyle={{ color: "#000" }}
                    title={"+Schedule Quiz"}
                    onPress={()=>{navigation.navigate('scheduledsuccessfullyQuiz')}}

                />
            </View>
        </View>
    );
}
