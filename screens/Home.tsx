import React, { useState, useEffect, useRef } from "react";
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CardItem } from "../components";
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";
import CHRISTMAS_OUTFITS from "../assets/data/christmasOutfits";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [outfits, setOutfits] = useState(CHRISTMAS_OUTFITS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadOutfits();
    const interval = setInterval(loadOutfits, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadOutfits = async () => {
    try {
      const storedOutfits = await AsyncStorage.getItem('CHRISTMAS_OUTFITS');
      if (storedOutfits) {
        const parsedOutfits = JSON.parse(storedOutfits);
        const sortedOutfits = [...parsedOutfits].sort((a, b) => b.votes - a.votes);
        setOutfits(sortedOutfits);
      }
    } catch (error) {
      console.error('Failed to load outfits:', error);
    }
  };

  const handleVote = async (vote: 'up' | 'down') => {
    if (!outfits || !outfits[currentIndex]) {
      console.warn('No outfit available to vote on');
      return;
    }
    
    try {
      const updatedOutfits = outfits.map((outfit, index) => {
        if (index === currentIndex && vote === 'up') {
          return {
            ...outfit,
            votes: outfit.votes + 1
          };
        }
        return outfit;
      });

      await AsyncStorage.setItem('CHRISTMAS_OUTFITS', JSON.stringify(updatedOutfits));
      setOutfits(updatedOutfits);
      
      if (vote === 'up') {
        swiperRef.current?.swipeRight();
      } else {
        swiperRef.current?.swipeLeft();
      }
    } catch (error) {
      console.error('Failed to update votes:', error);
    }
  };

  const onSwipedComplete = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  return (
    <ImageBackground
      source={require("../assets/images/christmas-bg.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <CardStack
          ref={swiperRef}
          loop={false}
          verticalSwipe={false}
          renderNoMoreCards={() => (
            <View style={styles.noMoreCards}>
              <Text style={styles.noMoreCardsText}>No more outfits to vote on!</Text>
              <Text style={styles.noMoreCardsSubtext}>Check back later for more festive fashion!</Text>
            </View>
          )}
          onSwipedLeft={onSwipedComplete}
          onSwipedRight={onSwipedComplete}
          disableTopSwipe
          disableBottomSwipe
        >
          {outfits.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                {...item}
              />
            </Card>
          ))}
        </CardStack>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.voteButton, styles.downVoteButton]}
            onPress={() => handleVote('down')}
          >
            <Text style={styles.buttonText}>👎</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => navigation.navigate('Upload')}
          >
            <Text style={styles.uploadButtonText}>+ Upload Outfit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.voteButton, styles.upVoteButton]}
            onPress={() => handleVote('up')}
          >
            <Text style={styles.buttonText}>👍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMoreCardsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  noMoreCardsSubtext: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  voteButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  upVoteButton: {
    backgroundColor: '#4CAF50',
  },
  downVoteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    fontSize: 24,
  },
  uploadButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 25,
    elevation: 5,
  },
  uploadButtonText: {
    color: WHITE,
    fontWeight: 'bold',
  },
});

export default Home;
