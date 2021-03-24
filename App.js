import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymusFilesAsync from 'anonymous-files';



const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)



  let openImagePickerAsync =  async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('permissions to access camera is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
     const remoteUri =  await uploadToAnonymusFilesAsync(pickerResult.uri)
     setSelectedImage ({localUri: pickerResult.uri, remoteUri})
    } else{
      setSelectedImage({localUri: pickerResult.uri})

    }     
    
    
  };

  const openShareDialog = async () => {
   if (!(await Sharing.isAvailableAsync())) {
      alert (`the image is available for sharing at: ${selectedImage.remoteUri}`)
      return;
   }

   await Sharing.shareAsync(SelectedImage.localUri);
   
  }


  return (
    <View style={style.container}>
      <Text style = {style.title}>Pick an Image!!</Text>
      
      <TouchableOpacity onPress = {openImagePickerAsync}> 
      <Image    
      source = {{uri: selectedImage !== null ? selectedImage.localUri :  'https://cdn5.dibujos.net/dibujos/pintados/202026/escudo-atletico-river-plate-deportes-escudos-de-futbol-11860375.jpg'}}
      style = {style.image}
      />
      </TouchableOpacity>
      

      {
        selectedImage ? 

        <TouchableOpacity  
      onPress = {openShareDialog}   
      style = {style.button}
      >
        <Text style= {style.buttonText}>Share this image</Text>
      </TouchableOpacity>

      : <View/>
      }
     
    </View>
  
  );       
};

const style = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000' 
  },

  title : {
    fontSize: 30,
    color: 'white'
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain'
  },

  button: {
    backgroundColor: 'red',
    padding: 7,
    marginTop: 10
  },

  buttonText: {
    color: '#fff'
  }
});

export default App;