import type { Item } from "./types";
import minecraftArt from "@/assets/minecraft.jpg";
import fortniteArt from "@/assets/fortnite.jpg";
import call_of_dutyArt from "@/assets/call-of-duty.jpg";

export const games: Item[] = [
  { id: "elden-ring", name: "Elden Ring", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg" },
  { id: "sekiro-shadows-die-twice", name: "Sekiro: Shadows Die Twice", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg" },
  { id: "it-takes-two", name: "It Takes Two", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/a/aa/It_Takes_Two_cover_art.png" },
  { id: "a-way-out", name: "A Way Out", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/8/83/A_Way_Out_Logo.jpg" },
  { id: "red-dead-redemption-2", name: "Red Dead Redemption 2", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg" },
  { id: "hollow-knight", name: "Hollow Knight", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/d/de/Hollow_Knight_2026_cover_art.jpg" },
  { id: "cuphead", name: "Cuphead", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Cuphead_%28artwork%29.png" },
  { id: "dark-souls-iii", name: "Dark Souls III", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg" },
  { id: "rocket-league", name: "Rocket League", category: "games", image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg" },
  { id: "minecraft", name: "Minecraft", category: "games", image: minecraftArt },
  { id: "fortnite", name: "Fortnite", category: "games", image: fortniteArt },
  { id: "resident-evil-4-remake", name: "Resident Evil 4 Remake", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/d/df/Resident_Evil_4_remake_cover_art.jpg" },
  { id: "resident-evil-requiem", name: "Resident Evil Requiem", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/1/15/Resident_Evil_Requiem_Cover_Art.jpg" },
  { id: "resident-evil-village", name: "Resident Evil Village", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png" },
  { id: "uncharted-4-a-thief-s-end", name: "Uncharted 4: A Thief's End", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Uncharted_4_box_artwork.jpg" },
  { id: "god-of-war-ragnar-k", name: "God of War Ragnar\u00f6k", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg" },
  { id: "silent-hill-2-remake", name: "Silent Hill 2 Remake", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/c/c1/Silent_Hill_2_remake_cover.jpg" },
  { id: "clair-obscur-expedition-33", name: "Clair Obscur: Expedition 33", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/5/5a/Clair_Obscur%2C_Expedition_33_Cover_1.webp" },
  { id: "overwatch", name: "Overwatch", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg" },
  { id: "call-of-duty-series", name: "Call of Duty Series", category: "games", image: call_of_dutyArt },
  { id: "grand-theft-auto-v", name: "Grand Theft Auto V", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png" },
  { id: "the-last-of-us-part-i", name: "The Last of Us Part I", category: "games", image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg" },
];
