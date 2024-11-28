import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from './CardItem';
import { ChristmasOutfitT } from '../types';

const VotingCardItem = (props: ChristmasOutfitT & { hasActions?: boolean }) => {
  const [currentVotes, setCurrentVotes] = useState(props.votes);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const storedOutfits = await AsyncStorage.getItem('CHRISTMAS_OUTFITS');
        if (storedOutfits) {
          const parsedOutfits = JSON.parse(storedOutfits);
          const outfit = parsedOutfits.find(o => o.id === props.id);
          if (outfit) {
            setCurrentVotes(outfit.votes);
          }
        }
      } catch (error) {
        console.error('Failed to load votes:', error);
      }
    };

    loadVotes();
  }, [props.id, props.votes]);

  return <CardItem {...props} votes={currentVotes} />;
};

export default VotingCardItem; 