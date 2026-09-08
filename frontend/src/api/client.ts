const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

async function request(path: string, options?: RequestInit): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: AbortSignal.timeout(options?.method === 'POST' ? 300_000 : 15_000),
    });
  } catch {
    throw new Error('Cannot connect to the review service. Check that the app services are running, then retry.');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = typeof body?.detail === 'string' ? body.detail : null;
    throw new Error(detail || (response.status >= 500
      ? 'The review service is unavailable. Restart the app services and retry.'
      : `The review request failed (${response.status}). Please retry.`));
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The review API is not configured at this address. Check the app service connection.');
  }
  return response;
}

export interface Workspace {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  author: string;
  platform: string;
  rating: number;
  text: string;
  version: string;
  status: string;
  created_at: string | null;
}

export interface PaginatedReviews {
  items: Review[];
  total: number;
  page: number;
  limit: number;
  available_versions: string[];
  available_statuses: string[];
}

export interface ReviewSummary {
  total: number;
  unread: number;
  one_star: number;
  average_rating: number | null;
  ios: number;
  android: number;
  excluded_non_store: number;
  min_words: number;
  days: number;
}

export interface DashboardMetrics {
  total_reviews: number;
  ios_reviews: number;
  android_reviews: number;
  ios_average_rating: number | null;
  android_average_rating: number | null;
  store_rating_difference: number | null;
  average_rating: number;
  median_rating: number;
  rating_advocacy_score: number;
  advocates_count: number;
  neutral_count: number;
  critics_count: number;
  advocates_percent: number;
  neutral_percent: number;
  critics_percent: number;
  oldest_review_at: string | null;
  newest_review_at: string | null;
  rating_distribution: Record<'1' | '2' | '3' | '4' | '5', number>;
  advocate_min: number;
  critic_max: number;
  days: number;
  min_words: number;
}

export interface DashboardMetricOptions {
  platform: string;
  advocateMin: number;
  criticMax: number;
  days: number;
  minWords: number;
}

export type AnalyticsGranularity = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export interface AnalyticsPoint {
  period: string;
  ios: number;
  android: number;
  total: number;
  average_rating: number | null;
  critical_percent: number;
}

export interface AnalyticsVersion {
  version: string;
  reviews: number;
  average_rating: number;
}

export interface AnalyticsData {
  generated_at: string;
  days: number;
  granularity: AnalyticsGranularity;
  platform: string;
  total_reviews: number;
  reviews_per_day: number;
  velocity_change_percent: number | null;
  average_rating: number | null;
  previous_average_rating: number | null;
  rating_change: number | null;
  critical_reviews: number;
  critical_percent: number;
  critical_change_points: number | null;
  ios_reviews: number;
  android_reviews: number;
  oldest_review_at: string | null;
  newest_review_at: string | null;
  rating_distribution: Record<'1' | '2' | '3' | '4' | '5', number>;
  series: AnalyticsPoint[];
  versions: AnalyticsVersion[];
}

export type WordCloudSentiment = 'all' | 'positive' | 'neutral' | 'negative';

export interface WordCloudTerm {
  term: string;
  kind: 'unigram' | 'bigram';
  mentions: number;
  polarity: number;
  average_rating: number;
  velocity_percent: number | null;
  is_new: boolean;
  sample_review: string;
}

export interface WordCloudData {
  generated_at: string;
  days: number;
  platform: string;
  sentiment: WordCloudSentiment;
  review_count: number;
  total_matching_reviews: number;
  truncated: boolean;
  distinct_terms: number;
  min_frequency: number;
  top_positive: WordCloudTerm | null;
  top_negative: WordCloudTerm | null;
  terms: WordCloudTerm[];
}

export interface SyncResult {
  status: 'success' | 'partial';
  days: number;
  max_reviews_per_store: number;
  new_reviews: number;
  source_counts: {
    google_play: number;
    apple_app_store: number;
  };
  scanned_counts: {
    google_play: number;
    apple_app_store: number;
  };
  duplicate_counts: {
    google_play: number;
    apple_app_store: number;
  };
  errors: string[];
}

export interface SyncStatus {
  last_synced_at: string | null;
  status: 'success' | 'partial' | 'never';
}

export const apiClient = {
  async getWorkspaces(): Promise<Workspace[]> {
    const res = await request(`/workspaces`);
    return res.json();
  },

  async getReviews(workspaceId: string, params: URLSearchParams): Promise<PaginatedReviews> {
    const res = await request(`/workspaces/${workspaceId}/reviews?${params.toString()}`);
    return res.json();
  },

  async getReviewSummary(workspaceId: string, params: URLSearchParams): Promise<ReviewSummary> {
    const summaryParams = new URLSearchParams(params);
    summaryParams.delete('page');
    summaryParams.delete('limit');
    const res = await request(`/workspaces/${workspaceId}/reviews/summary?${summaryParams.toString()}`);
    return res.json();
  },

  async getDashboardMetrics(workspaceId: string, options: DashboardMetricOptions): Promise<DashboardMetrics> {
    const params = new URLSearchParams({
      platform: options.platform,
      advocate_min: String(options.advocateMin),
      critic_max: String(options.criticMax),
      days: String(options.days),
      min_words: String(options.minWords),
    });
    const res = await request(`/workspaces/${workspaceId}/dashboard/metrics?${params}`);
    return res.json();
  },

  async getAnalytics(workspaceId: string, days: number, granularity: AnalyticsGranularity, platform: string): Promise<AnalyticsData> {
    const params = new URLSearchParams({ days: String(days), granularity, platform });
    const res = await request(`/workspaces/${workspaceId}/analytics?${params}`);
    return res.json();
  },

  async getWordCloud(
    workspaceId: string,
    days: number,
    platform: string,
    sentiment: WordCloudSentiment,
    minFrequency: number,
  ): Promise<WordCloudData> {
    const params = new URLSearchParams({
      days: String(days),
      platform,
      sentiment,
      min_frequency: String(minFrequency),
      limit: '60',
    });
    const res = await request(`/workspaces/${workspaceId}/word-cloud?${params}`);
    return res.json();
  },

  async bulkAction(workspaceId: string, reviewIds: string[], action: string, value?: string): Promise<{ success: boolean; updated_count: number }> {
    const res = await request(`/workspaces/${workspaceId}/reviews/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_ids: reviewIds, action, value })
    });
    return res.json();
  },

  async generateDraft(workspaceId: string, reviewId: string, tone: string = 'concise'): Promise<{ draft: string }> {
    const res = await request(`/workspaces/${workspaceId}/reviews/${reviewId}/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tone })
    });
    return res.json();
  },

  getExportUrl(workspaceId: string, params: URLSearchParams): string {
    return `${API_BASE}/workspaces/${workspaceId}/reviews/export?${params.toString()}`;
  },
  
  async syncFeeds(workspaceId: string, days: number, maxReviewsPerStore: number): Promise<SyncResult> {
    const res = await request(`/workspaces/${workspaceId}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days, max_reviews_per_store: maxReviewsPerStore })
    });
    return res.json();
  },

  async getSyncStatus(workspaceId: string): Promise<SyncStatus> {
    const res = await request(`/workspaces/${workspaceId}/sync-status`);
    return res.json();
  },

};
