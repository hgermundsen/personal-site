import { ContentData } from "./content/types";

export interface WindowData {
  id: number;
  title: string;
  content: ContentData;
  position: { x: number; y: number };
}
