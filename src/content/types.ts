export type ContentData =
  | string
  | string[]
  | { [key: string]: ContentData }
  | ContentData[];

export interface ContentSection {
  title: string;
  content: ContentData;
}
