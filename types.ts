export type ChristmasOutfitT = {
  id: number;
  name: string;
  description: string;
  image: { uri: string } | number;
  votes: number;
  category: string; // "Ugly Sweater" | "Party Outfit" | "Casual Christmas"
  submittedBy: string;
  dateSubmitted: string;
};

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};
