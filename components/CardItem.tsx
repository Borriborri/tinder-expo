import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Icon from "./Icon";
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";
import { ChristmasOutfitT } from "../types";

const CardItem = ({
  description,
  hasActions,
  image,
  name,
  category,
  votes,
}: ChristmasOutfitT & { hasActions?: boolean }) => {
  const fullWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Image 
        source={
          typeof image === 'object' && 'uri' in image 
            ? image.uri.startsWith('data:') 
              ? { uri: image.uri }
              : image
            : image
        } 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.categoryBadge}>
        <Icon name="snow" size={14} color={WHITE} />
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.voteBadge}>
            <Icon name="heart" size={16} color={PRIMARY_COLOR} />
            <Text style={styles.voteCount}>{votes} votes</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>

      {hasActions && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            👎 Swipe to vote 👍
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: Dimensions.get("window").width - 80,
    height: 350,
    borderRadius: 8,
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: WHITE,
    marginLeft: 4,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 15,
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  votes: {
    marginLeft: 5,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  instructions: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
  },
  instructionText: {
    textAlign: 'center',
    color: '#666',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  voteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 16,
  },
  voteCount: {
    marginLeft: 5,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default CardItem;