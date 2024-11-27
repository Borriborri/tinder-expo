import React, { useState, useEffect, useCallback } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CardItem } from "../components";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../assets/styles";
import CHRISTMAS_OUTFITS from "../assets/data/christmasOutfits";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const [outfits, setOutfits] = useState(CHRISTMAS_OUTFITS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVote = (outfitId: number, vote: 'up' | 'down') => {
    setOutfits(currentOutfits => {
      const newOutfits = currentOutfits.map(outfit => {
        if (outfit.id === outfitId) {
          const newVotes = outfit.votes + (vote === 'up' ? 1 : -1);
          return {
            ...outfit,
            votes: Math.max(0, newVotes)
          };
        }
        return outfit;
      });
      persistVotes(newOutfits);
      return newOutfits;
    });
  };

  const persistVotes = async (outfitsToSave = outfits) => {
    try {
      await AsyncStorage.setItem('CHRISTMAS_OUTFITS', JSON.stringify(outfitsToSave));
    } catch (error) {
      console.error('Failed to save votes:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadVotes = async () => {
        try {
          const storedOutfits = await AsyncStorage.getItem('CHRISTMAS_OUTFITS');
          if (storedOutfits) {
            setOutfits(JSON.parse(storedOutfits));
          }
        } catch (error) {
          console.error('Failed to load votes:', error);
        }
      };
      loadVotes();
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/images/christmas-bg.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <CardStack
          loop={false}
          verticalSwipe={false}
          renderNoMoreCards={() => (
            <View style={styles.noMoreCards}>
              <Text style={styles.noMoreCardsText}>No more outfits to vote on!</Text>
              <Text style={styles.noMoreCardsSubtext}>Check back later for more festive fashion!</Text>
            </View>
          )}
          ref={(newSwiper): void => setSwiper(newSwiper)}
          onSwipedRight={(index) => {
            handleVote(outfits[index].id, 'up');
            setCurrentIndex(index + 1);
          }}
          onSwipedLeft={(index) => {
            handleVote(outfits[index].id, 'down');
            setCurrentIndex(index + 1);
          }}
          currentIndex={currentIndex}
        >
          {outfits.map((item, index) => (
            <Card key={`${item.id}-${item.votes}`}>
              <CardItem
                hasActions
                {...item}
              />
            </Card>
          ))}
        </CardStack>
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
});

export default Home;
