export interface SocialMediaConfig {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'twitter';
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  enabled: boolean;
}

export interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledDate: Date;
  status: 'pending' | 'published' | 'failed';
  prompt?: string;
  media?: MediaFile[];
}

export interface ApiKeys {
  openaiKey: string;
}