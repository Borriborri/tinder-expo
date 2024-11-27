import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';
import { VOTE_UP_COLOR, VOTE_DOWN_COLOR, WHITE } from '../assets/styles';

type VoteButtonsProps = {
  onUpvote: () => void;
  onDownvote: () => void;
};

const VoteButtons = ({ onUpvote, onDownvote }: VoteButtonsProps) => (
  <View style={styles.container}>
    <TouchableOpacity style={[styles.button, styles.upvoteButton]} onPress={onUpvote}>
      <Icon name="thumbs-up" size={25} color={WHITE} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.downvoteButton]} onPress={onDownvote}>
      <Icon name="thumbs-down" size={25} color={WHITE} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  upvoteButton: {
    backgroundColor: VOTE_UP_COLOR,
  },
  downvoteButton: {
    backgroundColor: VOTE_DOWN_COLOR,
  },
});

export default VoteButtons;
