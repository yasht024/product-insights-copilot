const API_BASE = 'http://127.0.0.1:8000/api';

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
    const res = await fetch(`${API_BASE}/workspaces`);
    if (!res.ok) throw new Error('Failed to fetch workspaces');
    return res.json();
  },

  async getReviews(workspaceId: string, params: URLSearchParams): Promise<PaginatedReviews> {
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/reviews?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async getReviewSummary(workspaceId: string, params: URLSearchParams): Promise<ReviewSummary> {
    const summaryParams = new URLSearchParams(params);
    summaryParams.delete('page');
    summaryParams.delete('limit');
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/reviews/summary?${summaryParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch review summary');
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
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/dashboard/metrics?${params}`);
    if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
    return res.json();
  },

  async bulkAction(workspaceId: string, reviewIds: string[], action: string, value?: string): Promise<{ success: boolean; updated_count: number }> {
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/reviews/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_ids: reviewIds, action, value })
    });
    if (!res.ok) throw new Error('Bulk action failed');
    return res.json();
  },

  async generateDraft(workspaceId: string, reviewId: string, tone: string = 'concise'): Promise<{ draft: string }> {
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/reviews/${reviewId}/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tone })
    });
    if (!res.ok) throw new Error('Failed to generate draft');
    return res.json();
  },

  getExportUrl(workspaceId: string, params: URLSearchParams): string {
    return `${API_BASE}/workspaces/${workspaceId}/reviews/export?${params.toString()}`;
  },
  
  async syncFeeds(workspaceId: string, days: number, maxReviewsPerStore: number): Promise<SyncResult> {
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days, max_reviews_per_store: maxReviewsPerStore })
    });
    if (!res.ok) throw new Error('Failed to sync feeds');
    return res.json();
  },

  async getSyncStatus(workspaceId: string): Promise<SyncStatus> {
    const res = await fetch(`${API_BASE}/workspaces/${workspaceId}/sync-status`);
    if (!res.ok) throw new Error('Failed to fetch scrape status');
    return res.json();
  },

};
