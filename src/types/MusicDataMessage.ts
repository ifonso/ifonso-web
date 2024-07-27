import { z } from "zod";

export const MusicDataScheme = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.object({
    url: z.string(),
    height: z.number(),
    width: z.number(),
  })),
  artists: z.array(z.string()),
  link: z.string(),
  preview_link: z.string(),
});

export type MusicData = z.infer<typeof MusicDataScheme>;

export const MusicMessageSchema = z.object({
  timestamp: z.number(),
  total_time_in_seconds: z.number(),
  progress_time_in_seconds: z.number(),
  is_playing: z.boolean(),
  music: MusicDataScheme,
});

export type MusicDataMessage = z.infer<typeof MusicMessageSchema>;