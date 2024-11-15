import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage"

const HomeScreen = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [storedUsername, setStoredUserName] = useState('');


    // const handleDownloadPress = () => {
    //     setModalVisible1(false);
    // };
    // const handleUploadPress = () => {
    //     setModalVisible2(true);
    // };
    // const closeModal1 = () => {
    //     setModalVisible1(false);
    // };
    // const closeModal2 = () => {
    //     setModalVisible2(false);
    // };

    // useEffect(() => {
    //     const closeModalTimeOut = setTimeout(() => {
    //         closeModal1();
    //         closeModal2();
    //     }, 3000)

    //     return () => {
    //         clearTimeout(closeModalTimeOut);
    //     }
    // }, [modalVisible1, modalVisible2])

    {/* <Modal
                                transparent={true}
                                visible={modalVisible1}
                                onRequestClose={closeModal1}
                            >

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: 325, height: 170 }}>
                                        <View style={{ alignSelf: "center" }}>
                                            <Image source={require("../assets/check.png")} style={{ width: 100, height: 100 }} />
                                        </View>

                                        <Text style={{ fontSize: 14, fontWeight: "400", color: "#8A8A8A", alignSelf: "center" }}>Your File are Downloaded Successfully</Text>

                                    </View>
                                </View>

                            </Modal> */}

    {/* <Modal
                                transparent={true}
                                visible={modalVisible2}
                                onRequestClose={closeModal2}
                            >

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: 325, height: 170 }}>
                                        <View style={{ alignSelf: "center" }}>
                                            <Image source={require("../assets/check.png")} style={{ width: 100, height: 100 }} />
                                        </View>

                                        <Text style={{ fontSize: 14, fontWeight: "400", color: "#8A8A8A", alignSelf: "center" }}>Your File are Upload Successfully</Text>
                                    </View>
                                </View>

                            </Modal> */}

    useEffect(() => {
        // Fetch the stored username from AsyncStorage
        const fetchStoredUserName = async () => {
            const userName = await AsyncStorage.getItem('USER');
            setStoredUserName(userName);
        };

        fetchStoredUserName();
    }, []);


    const logout = async () => {
        try {


            // Clear user authentication information from AsyncStorage
            await AsyncStorage.removeItem('USER_LOGGED_IN');
            await AsyncStorage.removeItem('USER');

            // Navigate to the login screen after logout
            navigation.navigate('login');
        } catch (error) {
            // Handle errors, if any
            console.error('Error during logout:', error);
        }
    };
    const handleBackButton = () => {
        if (isFocused) {
            // Only handle back button on the home screen
            Alert.alert(
                'Exit App',
                'Are you sure you want to exit?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Exit',
                        onPress: () => {
                            // You can add any additional cleanup logic before exiting
                            BackHandler.exitApp(); // This will exit the app
                        },
                    },
                ],
            );

            return true; // Prevent default behavior
        }

        // If not on the home screen, allow the default behavior
        return false;
    };

    useEffect(() => {
        // Add event listener for hardware back button press
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Clean up the event listener on component unmount
        return () => {
            backHandler.remove();
        };
    }, [isFocused]);

    return (
        <View style={styles.container}>

            <View style={{ width: "100%", height: "90%", marginTop: 42 }}>

                <View style={{ alignSelf: "center", paddingTop: 7 }}>
                    <Text style={{ fontSize: 18, fontWeight: "900", color: "#010101" }}>Home</Text>
                </View>
                <View style={{ flexDirection: "row", width: "95%", height: "12%", alignSelf: "center", justifyContent: "space-between" }}>
                    <View style={{ width: 300, height: 100, flexDirection: "row", left: "3%" }}>
                        <View>
                            <Image source={require("../assets/profile.png")} style={{ width: 48, height: 52, borderRadius: 80 }} />
                        </View>
                        <View style={{ left: "2%" }}>
                            <Text style={{ fontSize: 16, fontWeight: 500, color: "#010101", marginTop: 15 }}>Hi,{storedUsername}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={logout} style={{ marginRight: "2%", marginTop: 10, width: 32, height: 32, backgroundColor: "#F5C6C6", borderRadius: 16 }}>
                        <Image source={require("../assets/Group.png")} style={{ width: 18, height: 20, alignSelf: "center", marginTop: 5 }} />
                    </TouchableOpacity>
                </View>


                <View style={{ width: "100%", height: "85%", backgroundColor: "#F2F2F2", borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>

                    <View style={{
                        width: "80%", height: "30%", backgroundColor: "white", alignSelf: "center", marginTop: 50,
                        borderRadius: 32,
                        shadowColor: "#F7F7F7",
                        shadowOffset: { width: 0, height: 10 }, // change this for more shadow
                        shadowOpacity: 0.6,
                        shadowRadius: 6,
                        elevation: 5,

                    }}>
                        <View style={{ marginLeft: 30, marginTop: 30 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Download</Text>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Attendance Specimen</Text>
                        </View>

                        <TouchableOpacity>
                            <View style={{ width: "85%", height: "48%", backgroundColor: '#EC1110', alignSelf: "center", borderRadius: 12, top: "30%" }}>
                                <View style={{ justifyContent: "space-between", width: "88%", height: "45%", flexDirection: "row", alignSelf: "center", top: "27%" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#FFF" }}>Download</Text>
                                    <Ionicons name="arrow-down-sharp" size={20} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={{
                        width: "80%", height: "30%", backgroundColor: "white", alignSelf: "center", marginTop: "15%",
                        borderRadius: 32
                    }}>

                        <View style={{ marginLeft: 30, marginTop: 30 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Enter & Upload</Text>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>Attendance</Text>
                        </View>
                        {/* <View style={{ width: "85%", height: "23%", backgroundColor: '#EC1110', alignSelf: "center", borderRadius: 12, top: "20%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("UploadAttendance")} style={{ flexDirection: "row", alignSelf: "center", marginTop: 12 }}>
                                <Text style={{ fontSize: 12, fontWeight: "700", color: "#FFF", marginRight: 160, marginTop: 2 }}>Download</Text>
                                <Ionicons style={{ marginBottom: 12 }} name="arrow-up-sharp" size={20} color="white" />
                            </TouchableOpacity>
                        </View> */}

<                       TouchableOpacity onPress={() => navigation.navigate("UploadAttendance")}>
                            <View style={{ width: "85%", height: "48%", backgroundColor: '#EC1110', alignSelf: "center", borderRadius: 12, top: "30%" }}>
                                <View style={{ justifyContent: "space-between", width: "88%", height: "45%",  flexDirection: "row", alignSelf: "center", top: "27%" }}>
                                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#FFF" }}>Download</Text>
                                    <Ionicons name="arrow-up-sharp" size={20} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"

    },

});