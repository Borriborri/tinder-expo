import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateChristmasOutfits = async (newOutfit: any) => {
  try {
    const storedOutfits = await AsyncStorage.getItem('CHRISTMAS_OUTFITS');
    let currentOutfits = storedOutfits ? JSON.parse(storedOutfits) : CHRISTMAS_OUTFITS;
    if (!Array.isArray(currentOutfits)) {
      currentOutfits = CHRISTMAS_OUTFITS;
    }
    
    const updatedOutfits = [newOutfit, ...currentOutfits];
    await AsyncStorage.setItem('CHRISTMAS_OUTFITS', JSON.stringify(updatedOutfits));
    
    return updatedOutfits;
  } catch (error) {
    console.error('Failed to update Christmas outfits:', error);
    throw error;
  }
};

const CHRISTMAS_OUTFITS = [
  {
    id: 1,
    name: "Rudolph Sweater",
    description: "Classic red sweater with light-up nose!",
    image: require("../images/Dylan Verheyen.jpg"),
    votes: 0,
    category: "Ugly Sweater",
    submittedBy: "SantaFan123",
    dateSubmitted: "2023-12-01",
  },
  {
    id: 2,
    name: "Elegant Christmas Eve",
    description: "Perfect for Christmas dinner with the family",
    image: require("../images/Liselot Neirinckx.jpeg"),
    votes: 0,
    category: "Party Outfit",
    submittedBy: "FestiveFashionista",
    dateSubmitted: "2023-12-02",
  },
  {
    id: 3,
    name: "Festive Formal",
    description: "Perfect for Christmas dinner with the family",
    image: require("../images/Sam Vos.jpeg"),
    votes: 0,
    category: "Party Outfit",
    submittedBy: "FestiveFashionista",
    dateSubmitted: "2023-12-02",
  },
  {
    id: 4,
    name: "Holiday Spirit",
    description: "Perfect for Christmas dinner with the family",
    image: require("../images/Michiel Beersmans.jpeg"),
    votes: 0,
    category: "Party Outfit",
    submittedBy: "FestiveFashionista",
    dateSubmitted: "2023-12-02",
  },
  {
    id: 5,
    name: "Christmas Chic",
    description: "Perfect for Christmas dinner with the family",
    image: require("../images/Nicolas Darwazeh.jpeg"),
    votes: 0,
    category: "Party Outfit",
    submittedBy: "FestiveFashionista",
    dateSubmitted: "2023-12-02",
  },
];

export { CHRISTMAS_OUTFITS };
export default CHRISTMAS_OUTFITS; 