import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/Rooms.styles';
import { Button, Text, TextInput } from '../../utils/Translate';
import { Dropdown, } from 'react-native-element-dropdown';
import { Slider } from '@rneui/themed';
export default function CreateLiveSlots({ navigation }) {
    const [exams, setExams] = useState([
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]);

    const [subCategories, setSubCategories] = useState([
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ]);

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
                            placeholder="no. of slots available" // Add a placeholder if needed
                        />
                        <Text style={styles.miniumT}>Minimum 10</Text>

                    </View>
                    <View>
                        <Text style={styles.st}>Entry Fees</Text>
                        <View style={styles.containerb}>
                            <Image style={[styles.backimg]} resizeMethod='contain' source={require('../../assets/img/bb.png')} />

                            <TextInput
                                style={styles.ddinput}
                                placeholder="Entry fees in BB Coins" // Add a placeholder if needed
                            />
                        </View>
                        <Text style={styles.miniumT}>Minimum 10</Text>

                    </View>
                    <Dropdown
                        style={styles.dropdownExam}
                        placeholderStyle={[styles.ddexamplaceholderStyle]}
                        selectedTextStyle={styles.ddexamselectedTextStyle}
                        inputSearchStyle={styles.ddexaminputSearchStyle}
                        iconStyle={styles.iconStyle}
                        itemContainerStyle={styles.ddExamItemContainerStyle}
                        itemTextStyle={styles.ddItemTextStyle}
                        data={exams}
                        activeColor='#212121'
                        onConfirmSelectItem={(item) => setSelectedExam(item)}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Exam"
                        searchPlaceholder="Search..."
                        value={selectedExam}
                        onFocus={() => setIsFocusExam(true)}
                        onBlur={() => setIsFocusExam(false)}
                        onChange={item => {
                            setSelectedExam(item.value);
                            setIsFocusExam(false);
                        }}
                    />




                </View>

                <Button
                    containerStyle={{ width: '100%' }}
                    buttonStyle={styles.proceedbtn}
                    titleStyle={{ color: "#000" }}
                    title={"+Create Live Quiz"}
                />
            </View>
        </View>
    );
}
