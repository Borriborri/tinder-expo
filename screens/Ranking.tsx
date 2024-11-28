import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Icon from '../components/Icon';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CHRISTMAS_OUTFITS from '../assets/data/christmasOutfits';
import { useNavigation } from '@react-navigation/native';

const RankingScreen = ({ navigation }) => {
  const [outfits, setOutfits] = useState(CHRISTMAS_OUTFITS);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const storedOutfits = await AsyncStorage.getItem('CHRISTMAS_OUTFITS');
        if (storedOutfits) {
          const parsedOutfits = JSON.parse(storedOutfits);
          setOutfits(parsedOutfits);
        }
      } catch (error) {
        console.error('Failed to load votes:', error);
      }
    };

    // Load votes immediately
    loadVotes();

    // Set up an interval to refresh votes
    const interval = setInterval(loadVotes, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const sortedOutfits = [...outfits].sort((a, b) => b.votes - a.votes);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.rankingItem}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Image 
        source={typeof item.image === 'object' && 'uri' in item.image ? item.image : item.image} 
        style={styles.thumbnail} 
      />
      <View style={styles.outfitInfo}>
        <Text style={styles.outfitName}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.votes}>
          <Icon name="heart" size={14} color={PRIMARY_COLOR} />
          <Text style={styles.votesText}>{item.votes} votes</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎄 Top Christmas Outfits 🎄</Text>
      <FlatList
        data={sortedOutfits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: PRIMARY_COLOR,
  },
  list: {
    padding: 16,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    width: 40,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  outfitInfo: {
    flex: 1,
    marginLeft: 12,
  },
  outfitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  votes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  votesText: {
    marginLeft: 4,
    color: PRIMARY_COLOR,
    fontSize: 14,
  },
});

export default RankingScreen;
