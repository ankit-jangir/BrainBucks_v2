import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/Rooms.styles';
import { Button, Text, TextInput } from '../../utils/Translate';
import { Dropdown, } from 'react-native-element-dropdown';
import { Slider } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker'
import RoomsApiService from '../../services/api/RoomsApiService';
import BasicServices from '../../services/BasicServices';
import { create } from 'react-test-renderer';


export default function ScheduleQuizTime({ navigation, route }) {

    const [date, setDate] = useState(new Date(Date.now()))
    const [time, setTime] = useState(new Date(Date.now()))

    const [selectedTime, setSelectedTime] = useState("5 mins")
    const [entryFees, setEntryFees] = useState()
    const [totalSlots, setTotalSlots] = useState()
    const [mode, setMode] = useState('date')


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = (type) => {
        setMode(type)
        setDatePickerVisibility(true);
    };


    const handleConfirm = (date) => {
        setDate(date);
        setDatePickerVisibility(false)
    };

    let obj = route.params.obj;

    let data = [
        { time: "5 mins", id: 1 },
        { time: "10 mins", id: 2 },
        { time: "15 mins", id: 3 },
    ]

    function formatDate(date) {
        const pad = (num) => num.toString().padStart(2, '0');

        const mm = pad(date.getMonth() + 1); // Months are zero-based
        const dd = pad(date.getDate());
        const yyyy = date.getFullYear();

        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        const ss = pad(date.getSeconds());

        return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
    }

    async function scheduleQuiz() {

        if (!entryFees || !totalSlots || !selectedTime || !date) {
            Toast.show({
                type: 'error',
                text1: "Please Enter All Details Correct"
            })
            return;
        }

        if (entryFees < 10 || totalSlots < 10) {
            Toast.show({
                type: "error",
                text1: "The minimum value for slots and entry fees is 10",
                text1Style: { fontSize: 11 }
            })
            return;
        }

        let roomServ = new RoomsApiService()

        let sch_time = formatDate(date)

        let obj2 = {
            "entryFees": entryFees,
            "slots": totalSlots,
            "sch_time": sch_time,
            "lobby_time": selectedTime
        }

        let helperFunc = () => {
            return async () => {
                let res = await roomServ.createQuiz({ ...obj, ...obj2 })
                return res;
            }
        }

        let createRes = await BasicServices.apiTryCatch(helperFunc(), Toast)

        if (createRes) {
            navigation.navigate("scheduledsuccessfullyQuiz", {
                obj: createRes.view_data
            })
        }

    }

    return (
        <>
            <View key={"tiukl"} style={{ zIndex: 20 }}>
                <Toast />
            </View>
            <View style={[styles.enterRoomMainContainer, { padding: 15 }]}>
                <View style={styles.backandhistory}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backimg, { padding: 20, backgroundColor: '#8D4AE2' }]}>
                        <Image style={[styles.backimg]} resizeMethod='contain' tintColor={"white"} source={require('../../assets/img/arrow-left.png')} />
                    </TouchableOpacity>
                    <Image style={{ height: 170, width: 200, }} resizeMethod='contain' source={require('../../assets/img/axeimg.png')} />
                </View>

                <View style={styles.flexCenter}>
                    <Text style={styles.createLiveText}>Schedule Quiz and Compete with your friends</Text>

                    <View style={styles.centerBox}>
                        <View>
                            <Text style={styles.st}>Slots Available</Text>
                            <TextInput
                                style={styles.ddinput}
                                placeholder="no. of slots available"
                                placeholderTextColor='#A1A2AD'
                                inputMode="numeric"
                                value={totalSlots}
                                onChangeText={setTotalSlots}

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
                                    placeholderTextColor='#A1A2AD'
                                    inputMode="numeric"
                                    value={entryFees}
                                    onChangeText={setEntryFees}
                                />
                            </View>
                            <Text style={styles.miniumT}>Minimum 10</Text>

                        </View>

                        <View>
                            <Text style={styles.st}>Lobby Time</Text>
                            <Dropdown
                                style={styles.dropdownExam}
                                placeholderStyle={styles.ddexamplaceholderStyle}
                                selectedTextStyle={styles.ddexamselectedTextStyle}
                                inputSearchStyle={styles.ddexaminputSearchStyle}
                                iconStyle={styles.iconStyle}
                                itemContainerStyle={styles.ddExamItemContainerStyle}
                                itemTextStyle={styles.ddItemTextStyle}
                                data={data}
                                activeColor='#212121'
                                search
                                maxHeight={300}
                                labelField="time"
                                valueField="time"
                                placeholder="Select Lobby Time"
                                searchPlaceholder="Search..."
                                value={selectedTime}
                                onChange={item => {
                                    setSelectedTime(item.time)
                                }}
                            />
                        </View>

                        <View>
                            <Text style={styles.st}>Schedule Quiz</Text>
                            <View style={styles.containerbb}>
                                <View style={[styles.FeesContainer1, { backgroundColor: "#282940", borderRadius: 4, padding: 13, }]}>
                                    <Image
                                        source={require('../../assets/img/Timer.png')}
                                        style={{ height: 20, width: 20 }}
                                        resizeMode="contain"
                                    />
                                    <TouchableOpacity onPress={() => { showDatePicker('date') }}>
                                        <Text key={date.toLocaleDateString()} style={[styles.feesT, { color: "#A1A2AD" }]}>{date.toLocaleDateString()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.FeesContainer1, { backgroundColor: "#282940", borderRadius: 4, padding: 13, }]}>
                                    <Image
                                        source={require('../../assets/img/time2.png')}
                                        style={{ height: 20, width: 20 }}
                                        resizeMode="contain"
                                        tintColor={"gray"}
                                    />
                                    <TouchableOpacity onPress={() => { showDatePicker('time') }}>
                                        <Text key={date.toLocaleTimeString()} style={[styles.feesT, { color: "#A1A2AD" }]}>{date.toLocaleTimeString()}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <DateTimePickerModal
                                date={date}
                                isVisible={isDatePickerVisible}
                                mode={mode}
                                onConfirm={handleConfirm}
                                onCancel={() => { setDatePickerVisibility(false) }}
                            />


                        </View>

                    </View>

                    <Button
                        containerStyle={{ width: '100%' }}
                        buttonStyle={styles.proceedbtn}
                        titleStyle={{ color: "#000" }}
                        title={"+Schedule Quiz"}
                        onPress={() => { scheduleQuiz() }}

                    />
                </View>
            </View>
        </>
    );
}
