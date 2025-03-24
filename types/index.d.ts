export interface Author {
  id: number;
  name: string;
  avatar: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Stats {
  likes: number;
}

export interface Rule {
  id: number;
  description: string;
  content: string;
  author: Author;
  publishTime: string;
  stats: Stats;
  tags: Tag[];
} 