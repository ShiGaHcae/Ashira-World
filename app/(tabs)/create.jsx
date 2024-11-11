import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal, Image } from 'react-native';
import React, { useState } from 'react';

const Create = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [musicList, setMusicList] = useState([
    { id: '1', title: 'Song Title 1', artist: 'Artist 1', isFavorite: false, image: require('../../assets/profile.jpg') },
    { id: '2', title: 'Song Title 2', artist: 'Artist 2', isFavorite: false, image: require('../../assets/profile.jpg') },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const addContent = () => {
    if (newContent) {
      // Add a new item with a default image for the new song
      setMusicList([...musicList, { id: Date.now().toString(), title: newContent, artist: 'New Artist', isFavorite: false, image: require('../../assets/profile.jpg') }]);
      setNewContent('');
      setModalVisible(false);
    }
  };

  const toggleFavorite = (id) => {
    setMusicList(musicList.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const filteredMusicList = musicList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Create Your Music Content</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search music..."
        placeholderTextColor="#9A9A9A"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Music List Section */}
      <View style={styles.musicListContainer}>
        <Text style={styles.sectionTitle}>Your Music List</Text>
        <FlatList
          data={filteredMusicList}
          renderItem={({ item }) => (
            <View style={styles.musicItem}>
              <Image source={item.image} style={styles.musicImage} />
              <View style={styles.musicInfo}>
                <Text style={styles.musicTitle}>{item.title}</Text>
                <Text style={styles.musicArtist}>{item.artist}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={[styles.favoriteButton, item.isFavorite && styles.favorited]}>❤️</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add New Music</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase/Download Free Effects Section */}
      <View style={styles.effectsContainer}>
        <Text style={styles.sectionTitle}>Purchase or Download Effects</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Browse Free Effects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Purchase Effects</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding New Content */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Music</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter music title"
              value={newContent}
              onChangeText={setNewContent}
            />
            <TouchableOpacity style={styles.button} onPress={addContent}>
              <Text style={styles.buttonText}>Add Music</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Download Content Section */}
      <View style={styles.downloadContainer}>
        <Text style={styles.sectionTitle}>Download Content from Creators</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Creator Content</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1B1B1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8F8F8',
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#262626',
    borderRadius: 10,
    color: '#F8F8F8',
    marginBottom: 15,
  },
  musicListContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8F8F8',
    marginBottom: 10,
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9A9A9A',
  },
  musicImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  musicInfo: {
    flex: 1,
  },
  musicTitle: {
    color: '#F8F8F8',
  },
  musicArtist: {
    color: '#9A9A9A',
  },
  favoriteButton: {
    fontSize: 24,
    color: '#F8F8F8',
  },
  favorited: {
    color: '#F56E0F',
  },
  button: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1B1B1E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#F8F8F8',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#262626',
    borderRadius: 10,
    color: '#F8F8F8',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  downloadContainer: {
    marginTop: 20,
  },
  effectsContainer: {
    marginBottom: 20,
  },
});

export default Create;
