import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY_COLOR, WHITE } from '../assets/styles';
import CHRISTMAS_OUTFITS, { updateChristmasOutfits } from '../assets/data/christmasOutfits';
import Icon from '../components/Icon';
import * as FileSystem from 'expo-file-system';

const UploadScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Party Outfit');

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    if (!image || !name || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Create a unique filename
      const filename = `${Date.now()}.jpg`;
      const destPath = `../assets/images${filename}`;

      // Ensure images directory exists
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}assets/images`);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}assets/images`, {
          intermediates: true
        });
      }

      // Copy image to app directory
      await FileSystem.copyAsync({
        from: image,
        to: destPath
      });

      const newOutfit = {
        id: Date.now(),
        name,
        description,
        image: { uri: destPath },
        votes: 0,
        category,
        submittedBy: 'User',
        dateSubmitted: new Date().toISOString().split('T')[0],
      };

      await updateChristmasOutfits(newOutfit);
      
      // Reset form
      setImage(null);
      setName('');
      setDescription('');
      
      // Navigate back
      navigation.navigate('Tab', { screen: 'Vote' });
    } catch (error) {
      console.error('Failed to save outfit:', error);
      alert('Failed to save outfit. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.previewImage} 
            resizeMode="cover"
          />
        ) : (
          <>
            <Icon name="camera" size={40} color={PRIMARY_COLOR} />
            <Text style={styles.uploadButtonText}>Tap to choose a photo</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Outfit Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Outfit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: WHITE,
  },
  uploadButton: {
    height: 200,
    width: '100%',
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  uploadButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UploadScreen; 