import skills from "./skills.json";
import about from "./about.json";
import { ContentSection } from "./types";

export const sections = {
  about,
  skills,
} as unknown as { [key: string]: ContentSection };
