import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image, Animated } from 'react-native';
import React, { useState } from 'react';

const Watch = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const creatorContent = [
    { id: '1', title: 'Creative Music Mix 1', creator: 'Creator A', playtime: '3:45', image: require('../../assets/profile.jpg') },
    { id: '2', title: 'Epic Beats Compilation', creator: 'Creator B', playtime: '5:12', image: require('../../assets/profile.jpg') },
    { id: '3', title: 'Chill Vibes Playlist', creator: 'Creator C', playtime: '4:30', image: require('../../assets/profile.jpg') },
    { id: '4', title: 'Intense Soundscapes', creator: 'Creator D', playtime: '6:50', image: require('../../assets/profile.jpg') },
  ];

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    alert("Share this content!");
  };

  const renderContentItem = (item) => (
    <TouchableOpacity
      style={styles.contentItem}
      onPress={() => {
        setSelectedContent(item);
        setModalVisible(true);
        fadeIn();
      }}
    >
      <Image source={item.image} style={styles.contentImage} />
      <View style={styles.textContainer}>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text style={styles.contentCreator}>{item.creator}</Text>
        <Text style={styles.contentPlaytime}>{item.playtime}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleLike(item.id)}>
        <Text style={[styles.likeButton, likedItems.includes(item.id) && styles.liked]}>❤️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📺 Watch Creator Content</Text>

      <FlatList
        data={creatorContent}
        renderItem={({ item }) => renderContentItem(item)}
        keyExtractor={item => item.id}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.modalContent}>
            <Image source={selectedContent?.image} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedContent?.title}</Text>
            <Text style={styles.modalCreator}>{selectedContent?.creator}</Text>
            <Text style={styles.modalPlaytime}>{selectedContent?.playtime}</Text>
            <Text style={styles.modalDescription}>Watch the content and enjoy the music!</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.buttonText}>▶ Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.buttonText}>🔗 Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8F8F8',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2B2B2E',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 5,
    borderColor: '#3B3B3E',
    borderWidth: 1,
  },
  contentImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 20,
    color: '#F8F8F8',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  contentCreator: {
    color: '#9A9A9A',
    fontStyle: 'italic',
  },
  contentPlaytime: {
    color: '#F56E0F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  likeButton: {
    fontSize: 26,
    color: '#F8F8F8',
  },
  liked: {
    color: '#F56E0F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1B1B1E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    borderColor: '#3B3B3E',
    borderWidth: 1,
  },
  modalImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#F56E0F',
  },
  modalTitle: {
    fontSize: 24,
    color: '#F8F8F8',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
  },
  modalCreator: {
    color: '#9A9A9A',
    fontStyle: 'italic',
  },
  modalPlaytime: {
    color: '#F56E0F',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    color: '#F8F8F8',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  playButton: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Watch;
