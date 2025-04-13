export interface Settings {
  id: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  postsPerPage: number;
  defaultCommentStatus: 'open' | 'closed';
  theme: string;
  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  seoSettings: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultKeywords?: string[];
    googleAnalyticsId?: string;
  };
  updatedAt: Date;
}

export interface SettingsUpdateInput {
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  logo?: string;
  favicon?: string;
  postsPerPage?: number;
  defaultCommentStatus?: 'open' | 'closed';
  theme?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  seoSettings?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultKeywords?: string[];
    googleAnalyticsId?: string;
  };
}
