import { FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import ReelsApiService from '../../services/api/ReelsApiService';
import { ColorsConstant } from '../../constants/Colors.constant';
import { Text, TextInput } from '../../utils/Translate';
import NoDataFound from '../../components/NoDataFound';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { BLOBURL } from '../../config/urls';

export default function ReelTags({ navigation }) {

    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [alotedTags, setAlotedTags] = useState([])
    const [otherTags, setOtherTags] = useState([])
    const [selectedTags, setSelectedTags] = useState(new Set([]))

    const reelServ = new ReelsApiService()

    async function addTags() {
        if (selectedTags.size === 0) {
            Toast.show({
                type: "error",
                text1: "Select atleast one Tag to add"
            })
            return;
        }

        try {
            let arr = Array.from(selectedTags)
            let response = await reelServ.addTag(arr)
            if (response.status === 1) {
                let nextOtherArr = otherTags.filter(item => !selectedTags.has(item._id))
                setOtherTags(nextOtherArr)
                loadAlotedTags()
                setSelectedTags(new Set([]))
            } else {
                Toast.show({
                    type: "info",
                    text1: response.Backend_Error
                })
            }
        } catch (error) {
            console.log("Error in adding tags: ", error.message);
            Toast.show({
                type: "info",
                text1: "Something Went Wrong"
            })
        }

    }

    async function loadAlotedTags() {
        setLoading(true)
        try {
            let res = await reelServ.getAlotedTags();
            if (res.status === 1) {
                setAlotedTags(res.tags)
            } else {
                Toast.show({
                    type: "error",
                    text1: res.Backend_Error
                })
            }
        } catch (err) {
            console.log("Error in Fetching New Tags: ", err.message)
            Toast.show({
                type: "error",
                text1: "Something Went Wrong"
            })
        } finally {
            setLoading(false)
        }
    }

    async function loadOtherTags() {
        setLoading1(true)
        try {
            let res = await reelServ.getNewTags();
            if (res.status === 1) {
                setOtherTags(res.tags)
            } else {
                Toast.show({
                    type: "error",
                    text1: res.Backend_Error
                })
            }
        } catch (err) {
            console.log("Error in fetching new tags ", err.message)
            Toast.show({
                type: "error",
                text1: "Something Went Wrong"
            })
        } finally {
            setLoading1(false)
        }
    }

    function selectTag(id) {
        setSelectedTags((prev) => {
            let temp = new Set(prev)
            temp.has(id) ? temp.delete(id) : temp.add(id)
            return temp;
        })
    }

    useEffect(() => {
        loadOtherTags()
        loadAlotedTags()
    }, [])


    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>

                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.TouchModal}>
                            <Toast />
                        </TouchableOpacity>
                        <View style={styles.mainView}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.TouchImg}>
                                <Image
                                    source={require('../../assets/img/down-arrow.png')}
                                    resizeMode="contain"
                                    style={{ width: 20, height: 20 }}
                                />
                            </TouchableOpacity>

                            <View style={styles.listView}>
                                <View style={styles.listView1}>
                                    <View style={{ flex: 4 }}></View>
                                    <View style={styles.ExamView}>
                                        <Text style={styles.AddText}>+Add Tag</Text>
                                        <TouchableOpacity
                                            style={styles.touchExam}
                                            onPress={addTags}>
                                            <Text style={styles.TextSave}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.inputView}>
                                <View style={styles.inputView1}>
                                    <TextInput
                                        value={search}
                                        onChangeText={setSearch}
                                        style={styles.inputText}
                                        placeholder="Search for Tags"
                                        placeholderTextColor={'#7E7E7E'}
                                    >
                                    </TextInput>
                                    <TouchableOpacity style={styles.touchSearch}>
                                        <Image
                                            source={require('../../assets/img/search.png')}
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ width: '100%' }}>
                                {
                                    loading1 ?
                                        <ActivityIndicator color={ColorsConstant.Theme} size={35} />
                                        :
                                        otherTags.length === 0
                                            ?
                                            <NoDataFound message={"No More Tags"} action={loadOtherTags} actionText={"Reload"} />
                                            :
                                            otherTags.map((item) => {
                                                if (item.tag_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                                    return (
                                                        <View key={item._id} style={styles.plusView}>
                                                            <View style={styles.plusView1}>
                                                                <View style={styles.cateView}>
                                                                    <Image
                                                                        source={{ uri: BLOBURL + item.banner }}
                                                                        style={{
                                                                            width: 40,
                                                                            height: 40,
                                                                            backgroundColor: 'red',
                                                                            borderRadius: 100,
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View style={styles.NameView}>
                                                                    <Text style={styles.Textname}>{item.tag_name}</Text>
                                                                </View>
                                                                <View style={styles.RightVe}>
                                                                    <TouchableOpacity
                                                                        onPress={() => { selectTag(item._id) }}
                                                                        style={{
                                                                            width: 45,
                                                                            height: 45,
                                                                            backgroundColor: selectedTags.has(item._id) ? ColorsConstant.Theme : "#EFEFEF",
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            borderRadius: 50,
                                                                        }}>
                                                                        {
                                                                            selectedTags.has(item._id)
                                                                                ?
                                                                                <Text key={"selected"} style={{ color: '#fff', fontSize: 15 }}>✓</Text>
                                                                                :
                                                                                <Text key={"nonselected"} style={{ color: '#000', fontSize: 15 }}>+</Text>
                                                                        }
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                            }
                                            )
                                }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <View style={styles.stdView}>
                    <View style={styles.stdView1}>
                        <View style={styles.stdView2}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginHorizontal: 4,
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    width: 50,
                                    height: 50,
                                    borderColor: '#F5F5F5',
                                }}>
                                <Image
                                    source={require('../../assets/img/arrow-left.png')}
                                    style={{ height: 25, width: 25 }}></Image>
                            </TouchableOpacity>
                            <View style={styles.examView}>
                                <Text style={styles.textMy}>Reels</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.examMainView}>
                        <View style={styles.examsView}>
                            <Text style={styles.TextExam}>My Tags</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                style={styles.TouchAdd}>
                                <Text style={styles.TextAdd}>+Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView>
                        {
                            loading ?
                                <ActivityIndicator color={ColorsConstant.Theme} size={35} />
                                :
                                alotedTags.length === 0 ?
                                    <NoDataFound scale={0.7} message={"No Tags Aloted Yet "} action={loadAlotedTags} actionText={"Load Again"} />
                                    :
                                    alotedTags.map((item) =>
                                        <View key={item._id} style={styles.viewStudy}>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('reels', {tag_id: item._id})}} style={styles.TouchData}>
                                                <View style={styles.DataView}>
                                                    <View style={styles.cateView}>
                                                        <Image
                                                            source={{ uri: BLOBURL + item.banner }}
                                                            style={{
                                                                height: 30,
                                                                width: 30,
                                                                borderRadius: 100,
                                                            }}></Image>
                                                    </View>
                                                    <View style={styles.NameView}>
                                                        <Text style={styles.Textname}>{item.tag_name}</Text>
                                                    </View>
                                                    <View style={styles.RightVe}>
                                                        <View style={styles.RightVe1}>
                                                            <Image
                                                                source={require('../../assets/img/right-arrow.png')}
                                                                tintColor={'rgba(0, 0, 0, 1)'}
                                                                style={{
                                                                    height: 13,
                                                                    width: 13,
                                                                    borderRadius: 100,
                                                                }}></Image>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                        }
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    TouchModal: {
        flex: 1,
        width: '100%',
        backgroundColor: '#00000040',
    },
    mainView: {
        width: '100%',
        height: 500,
        backgroundColor: ColorsConstant.White,
        paddingVertical: 10,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    TouchImg: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    listView: {
        height: 60,
        width: '100%',
    },
    listView1: {
        flex: 1,
        flexDirection: 'row',
    },
    ExamView: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    AddText: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 16,
        color: '#000'
    },
    touchExam: {
        width: 70,
        height: 30,
        backgroundColor: '#EFF5FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextSave: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 14,
        color: '#367CFF',
    },
    inputView: {
        width: '100%',
        justifyContent: 'center',
        marginVertical: 10,
    },
    inputView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorsConstant.LightGray,
        borderRadius: 10,
        height: 45,
        marginTop: 0,
    },
    inputText: {
        color: ColorsConstant.LightGray,
        fontSize: 13,
        flex: 0.8,
        fontFamily: 'WorkSans-Regular',
        color: ColorsConstant.Black
    },
    touchSearch: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    TextYou: {
        paddingVertical: 120,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },
    stdView: {
        flex: 1,
        backgroundColor: ColorsConstant.White,
    },
    examView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textMy: {
        fontSize: 18,
        fontFamily: 'WorkSans-SemiBold',
        color: "#000",
        textAlign: 'center'
    },
    stdView1: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: ColorsConstant.LightGray,
    },
    stdView2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stdView3: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStudy: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 20,
        paddingRight: 40,
        fontWeight: '600',
        color: 'rgba(46, 46, 46, 1)',
    },
    examMainView: {
        width: '100%',
        height: 60,
        marginBottom: 20
    },
    examsView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TextExam: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 28,
        color: 'rgba(46, 46, 46, 1)',
        fontWeight: '600',
    },
    TouchAdd: {
        width: 70,
        height: 35,
        backgroundColor: '#EFF5FF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#367CFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextAdd: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 14,
        color: '#367CFF',
    },
    viewStudy: {
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 6,
        marginHorizontal: 6
    },
    TouchData: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsConstant.White,
        borderRadius: 5,
        elevation: 1,
        padding: 10
    },
    DataView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    cateView: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.2,
    },
    cateImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    NameView: {
        flex: 0.65,
        width: '100%',
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    Textname: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 16,
        paddingLeft: 10,
        color: '#000',
    },
    RightVe: {
        flex: 0.2,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    RightVe1: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    plusView: {
        width: '100%',
        height: 70,
        borderWidth: 1,
        borderColor: ColorsConstant.LightGray,
        borderRadius: 10,
        marginBottom: 20,
    },
    plusView1: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },


});