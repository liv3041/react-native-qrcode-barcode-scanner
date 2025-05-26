import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator, Platform, PermissionsAndroid ,TouchableOpacity} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [checkingPermission, setCheckingPermission] = useState(true);
  const [scannedId, setScannedId] = useState(null);

  const cameraRef = useRef(null);


  useFocusEffect(
    useCallback(() => {
      setScannedId(null); 
    }, [])
  );
  
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
      setCheckingPermission(false);
    })();
  }, []);

const onReadCode = async (event) => {
    console.log("QR Code=====",event.nativeEvent.codeStringValue);
    if (scannedId) return; 
    const raw = event.nativeEvent.codeStringValue.trim();
    // const match = raw.match(/(\d{2})$/);
    const match = raw.match(/(\d{2})\D*$/); 

    if (!match) return Alert.alert('Invalid Code', 'No two-digit ID at end.');
    const id = match[1];
    // setScannedId(id); 
    console.log("ID",id);

    try {
      const history = JSON.parse(await AsyncStorage.getItem('scanHistory')) || [];
      const updatedHistory = [...history, { id, raw, date: new Date().toISOString() }];
      await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.log('Failed to save scan history:', error);
    }

    navigation.navigate('Detail', { id });
  };
  

  if (checkingPermission) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (!hasPermission) return <Text style={styles.center}>Camera access denied</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scan Barcode</Text>
      <View style={styles.cameraWrapper}>
        <Camera
          ref={cameraRef}
          style={styles.preview}
          cameraType="back"
          scanBarcode={true}
          onReadCode={onReadCode}
          barCodeTypes={[
            'qr',
            'code128',
            'code39',
            'ean13',
            'pdf417',
          ]}
        />
        <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.historyButtonText}>View Scan History</Text>
          </TouchableOpacity>

      </View>
      <Text style={styles.instruction}>Align the barcode within the box</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraWrapper: {
    width: 300,
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  instruction: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: '#444',
  },
  center: {
    flex: 1,
    textAlign: 'center',
    marginTop: 200,
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
