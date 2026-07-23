import type { CustomAppIconId } from "@/lib/custom-app-types";

export type IconId =
  | "chat"
  | "diary"
  | "music"
  | "reading"
  | "story"
  | "game"
  | "appmarket"
  | "checkphone"
  | "shopping"
  | "calendar"
  | "mapmode"
  | "vnplay"
  | "vnchapters"
  | "moments"
  | "group_chat"
  | "settings"
  | "theme"
  | "resources"
  | "characters"
  | "worldbuilder";

export type DesktopIconId = IconId | CustomAppIconId;

export type IconPosition = { id: DesktopIconId; row: number; col: number };

export type IconMeta = {
  id: IconId;
  label: string;
  tone: string;
  placeholder: boolean;
  path?: string;
};

export const PAGE_1_DEFAULT: IconId[] = ["chat", "diary", "music", "calendar", "checkphone", "shopping", "reading"];

export const PAGE_2_DEFAULT: IconId[] = [
  "game",
  "appmarket",
  "story",
  "mapmode"
];

// 第三页默认图标（居中放置，位置见 createDefaultDesktopIconLayout）
export const PAGE_3_DEFAULT: IconId[] = ["worldbuilder"];

export const DOCK_DEFAULT: IconId[] = ["settings", "theme", "resources", "characters"];

export const ICONS: Record<IconId, IconMeta> = {
  chat: { id: "chat", label: "聊天", tone: "var(--c-icon-green)", placeholder: false },
  diary: { id: "diary", label: "手记", tone: "var(--c-icon-violet)", placeholder: false },
  music: { id: "music", label: "音乐", tone: "var(--c-icon-coral)", placeholder: false },
  reading: { id: "reading", label: "阅读", tone: "var(--c-icon-amber)", placeholder: false },
  story: { id: "story", label: "剧情", tone: "var(--c-icon-story, #8b6f52)", placeholder: false },
  game: { id: "game", label: "游戏", tone: "var(--c-icon-blue)", placeholder: false },
  appmarket: { id: "appmarket", label: "应用市场", tone: "var(--c-icon-teal)", placeholder: false },
  checkphone: { id: "checkphone", label: "查手机", tone: "var(--c-icon-slate)", placeholder: false },
  shopping: { id: "shopping", label: "购物", tone: "var(--c-icon-amber)", placeholder: false },
  calendar: { id: "calendar", label: "日历", tone: "var(--c-icon-rose)", placeholder: true },
  mapmode: { id: "mapmode", label: "冒险", tone: "var(--c-icon-amber)", placeholder: false },
  vnplay: { id: "vnplay", label: "漫卷播放", tone: "var(--c-icon-rose)", placeholder: true },
  vnchapters: { id: "vnchapters", label: "章节", tone: "var(--c-icon-rose)", placeholder: true },
  moments: { id: "moments", label: "朋友圈", tone: "var(--c-icon-lilac)", placeholder: false },
  group_chat: { id: "group_chat", label: "群聊", tone: "var(--c-icon-teal)", placeholder: false },
  settings: { id: "settings", label: "设置", tone: "var(--c-icon-slate)", placeholder: false },
  theme: { id: "theme", label: "主题", tone: "var(--c-icon-violet)", placeholder: true },
  resources: { id: "resources", label: "资源库", tone: "var(--c-icon-teal)", placeholder: false },
  characters: {
    id: "characters",
    label: "角色",
    tone: "var(--c-icon-lilac)",
    placeholder: false,
    path: "/characters"
  },
  worldbuilder: {
    id: "worldbuilder",
    label: "筑境",
    tone: "var(--c-icon-amber)",
    placeholder: false,
    path: "/world-builder"
  },
};
