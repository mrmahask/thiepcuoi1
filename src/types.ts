export interface ParentInfo {
  father: string;
  mother: string;
}

export interface Parents {
  groom: ParentInfo;
  bride: ParentInfo;
}

export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapLink: string;
}

export interface Photo {
  url: string;
  caption?: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: 'yes' | 'no';
  guestsCount: number;
  timestamp: string;
}

export interface DressCode {
  themeName: string;
  description: string;
  colors: { name: string; hex: string }[];
}
