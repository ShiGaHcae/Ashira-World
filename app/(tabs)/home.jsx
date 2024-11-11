import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Image, Modal, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';

const Home = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [profileVisible, setProfileVisible] = useState(false);

  // Sample data for videos and music
  const videos = [
    { id: '1', title: 'Justin Bieber - Peaches ft. Daniel Caesar, Giveon', uri: 'https://s1.dmcdn.net/v/St8wc1XKRhaKBPWGm/x720' },
    { id: '2', title: 'Taylor Swift - Look What You Made Me Do', uri: 'https://i.ytimg.com/vi/3tmd-ClpJxA/maxresdefault.jpg' },
  ];

  const musicCollection = [
    { id: '1', title: 'Song Title 1', artist: 'Artist 1' },
    { id: '2', title: 'Song Title 2', artist: 'Artist 2' },
  ];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 12,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const openProfile = () => {
    setProfileVisible(true);
  };

  const closeProfile = () => {
    setProfileVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Profile</Text>
          <Image source={require('../../assets/profile.jpg')} style={styles.profileImage} />
          <TouchableOpacity style={styles.button} onPress={openProfile}>
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Modal */}
        <Modal visible={profileVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/profile.jpg')} style={styles.coverImage} />
              <Image source={require('../../assets/profile.jpg')} style={styles.modalProfileImage} />
              <Text style={styles.modalName}>Ashira World</Text>
              <Text style={styles.modalBio}>
                Full-stack developer and tech enthusiast 🌟. Passionate about creating seamless user experiences and exploring new technologies.
              </Text>
              <Text style={styles.modalDetails}>📍 Location: Toledo City</Text>
              <Text style={styles.modalDetails}>🎓 Education: BSIT, 3nd Year</Text>
              <Text style={styles.modalDetails}>🌐 Website: www.ashiraworld.com</Text>
              <Text style={styles.modalDetails}>🎨 Interests: Coding, Gaming, Music Production</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeProfile}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Charisma Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Charisma</Text>
          <Text style={styles.description}>Boost your charisma to unlock new features!</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '87%' }]} />
            <Text style={styles.charismaLevel}>87%</Text>
          </View>
          <Text style={styles.charismaTip}>Tip: Engage more with your followers to boost charisma!</Text>
        </View>

        {/* Followers & Following Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Followers & Following</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.statButton}>
              <Text style={styles.statText}>Followers</Text>
              <Text style={styles.statNumber}>1.2K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statButton}>
              <Text style={styles.statText}>Following</Text>
              <Text style={styles.statNumber}>350</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Videos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎥 Videos</Text>
          <Text style={styles.description}>Your latest videos, tutorials, and highlights!</Text>
          <FlatList
            data={videos}
            renderItem={({ item }) => (
              <View style={styles.videoThumbnail}>
                <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
                <Text style={styles.videoTitle}>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View All Videos</Text>
          </TouchableOpacity>
        </View>

        {/* Music Collection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎶 Music Collection</Text>
          <Text style={styles.description}>Listen to your favorite tunes anytime, anywhere.</Text>
          <FlatList
            data={musicCollection}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.musicItem} onPress={() => alert(`Playing: ${item.title}`)}>
                <View style={styles.musicInfo}>
                  <Image source={require('../../assets/profile.jpg')} style={styles.musicIcon} />
                  <View style={styles.musicDetails}>
                    <Text style={styles.musicTitle}>{item.title}</Text>
                    <Text style={styles.musicArtist}>{item.artist}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶️ Play</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Explore Music</Text>
          </TouchableOpacity>
        </View>

        {/* Create Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Create</Text>
          <Text style={styles.description}>Start your journey to create amazing content!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Creating</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1B1B1E',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#262626',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F8F8F8',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1B1B1E',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: -40,
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#1B1B1E',
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8F8F8',
    marginTop: 8,
  },
  modalBio: {
    color: '#9A9A9A',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  modalDetails: {
    color: '#F56E0F',
    marginVertical: 4,
  },
  closeButton: {
    backgroundColor: '#F56E0F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    marginVertical: 10,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F56E0F',
    borderRadius: 4,
  },
  charismaLevel: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    color: '#F8F8F8',
  },
  charismaTip: {
    color: '#9A9A9A',
    fontStyle: 'italic',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statButton: {
    backgroundColor: '#F56E0F',
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  videoThumbnail: {
    marginVertical: 10,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  videoTitle: {
    marginTop: 5,
    color: '#F8F8F8',
    textAlign: 'center',
  },
  musicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  musicDetails: {
    flexDirection: 'column',
  },
  musicTitle: {
    color: '#F8F8F8',
    fontWeight: 'bold',
  },
  musicArtist: {
    color: '#9A9A9A',
  },
  playButton: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    padding: 8,
  },
  playButtonText: {
    color: '#FFFFFF',
  }, 
});

export default Home;
