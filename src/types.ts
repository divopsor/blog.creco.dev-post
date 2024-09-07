export interface Item {
  id: string;
  body?: {
    contents: string;
    createdAt: number;
    updatedAt: number;
    markdown: string;
  };
}
