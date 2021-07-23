import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends Component {

    constructor(){
        super();
        this.state = {
            hasCameraPermission: null,
            face : []
        }
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({hasCameraPermission: status.status === 'granted'})
    }

    onFaceDetected = (faces) => {
        this.setState({faces: faces})
    }

    onFaceDetectionError = (error) => {
        alert(error)
    }

    render() {
        const {hasCameraPermission} = this.state;

        if(hasCameraPermission === null){
            return(
                <View/>
            )
        }

        if(hasCameraPermission === false){
            return (
                <View><Text> No Access To Camera! </Text></View>
            )
        }

        console.log(this.state.face)

        return (
            <View style = {styles.container}>
                <SafeAreaView style = {styles.androidSafeArea} >
                    <View style = {styles.headingContainer} > 
                        <Text style = {styles.titleText}> FRAPP </Text>
                    </View>

                    <View style = {styles.cameraStyle}>
                        <Camera
                            style = {{flex: 1}}
                            type = {Camera.Constants.Type.front}
                            faceDetectorSettings = {{
                                mode: FaceDetector.Constants.Mode.fast,
                                detectLandmark: FaceDetector.Constants.Landmarks.all,
                                runClassifications: FaceDetector.Constants.Classifications.all
                            }}
                            onFacesDetected = {this.onFaceDetected}
                            onFacesDetectionError = {this.onFaceDetectionError}
                        />
                    </View>

                    <View style = {styles.filterContainer}>

                    </View>

                    <View style = {styles.actionContainer}>

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    androidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    headingContainer : {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleText: {
        fontSize: 30
    },

    cameraStyle: {
        flex: 0.65
    },

    filterContainer : {

    },

    actionContainer: {

    }
})