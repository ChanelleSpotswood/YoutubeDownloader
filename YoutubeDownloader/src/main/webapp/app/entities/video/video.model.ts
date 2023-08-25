export interface IVideo {
  id: number;
  title?: string | null;
  videoId?: string | null;
  description?: string | null;
}

export type NewVideo = Omit<IVideo, 'id'> & { id: null };
