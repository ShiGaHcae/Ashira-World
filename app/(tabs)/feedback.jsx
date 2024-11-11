import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [previousFeedback, setPreviousFeedback] = useState([]);
  const [rating, setRating] = useState(null);
  const maxCharacters = 200;

  const handleSubmit = () => {
    if (feedback.trim()) {
      setPreviousFeedback(prev => [...prev, { id: Date.now().toString(), text: feedback, rating }]);
      Alert.alert('Thank You!', 'Your feedback has been submitted.');
      setFeedback('');
      setRating(null);
    } else {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
    }
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackText}>{item.text}</Text>
      <Text style={styles.feedbackRating}>Rating: {item.rating} ⭐</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback and Suggestions</Text>
      <Text style={styles.subtitle}>Share your thoughts and suggestions to help us improve your experience.</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        maxLength={maxCharacters}
        numberOfLines={4}
      />
      <Text style={styles.characterCount}>{feedback.length}/{maxCharacters}</Text>
      
      <Text style={styles.ratingTitle}>Rate your experience:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <AntDesign name={rating >= star ? 'star' : 'staro'} size={30} color="#F56E0F" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      <FlatList
        data={previousFeedback}
        renderItem={renderFeedbackItem}
        keyExtractor={item => item.id}
        style={styles.feedbackList}
        showsVerticalScrollIndicator={false}
      />
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#F8F8F8',
    marginBottom: 20,
  },
  input: {
    height: 100,
    backgroundColor: '#262626',
    borderRadius: 10,
    color: '#F8F8F8',
    padding: 10,
    marginBottom: 20,
  },
  characterCount: {
    color: '#F8F8F8',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  ratingTitle: {
    fontSize: 16,
    color: '#F8F8F8',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F56E0F',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  feedbackList: {
    marginTop: 20,
  },
  feedbackItem: {
    backgroundColor: '#262626',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  feedbackText: {
    color: '#F8F8F8',
  },
  feedbackRating: {
    color: '#F56E0F',
    fontWeight: 'bold',
  },
});

export default Feedback;
