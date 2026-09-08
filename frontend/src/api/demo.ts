import type {
  AnalyticsData,
  AnalyticsGranularity,
  DashboardMetricOptions,
  DashboardMetrics,
  PaginatedReviews,
  Review,
  ReviewSummary,
  SyncResult,
  SyncStatus,
  WordCloudData,
  WordCloudSentiment,
  WordCloudTerm,
  Workspace,
} from './client';

type DemoTemplate = { text: string; rating: number; version: string };

const templates: DemoTemplate[] = [
  { text: 'Trading charts are smooth and the option chain is easy to understand.', rating: 5, version: '8.21' },
  { text: 'Mutual fund investing and SIP setup feel simple for beginners.', rating: 5, version: '8.21' },
  { text: 'The portfolio dashboard gives a clear view of stocks and returns.', rating: 5, version: '8.20' },
  { text: 'Fast order placement and a clean interface make trading convenient.', rating: 5, version: '8.21' },
  { text: 'The new dark mode and watchlist design look polished.', rating: 4, version: '8.20' },
  { text: 'UPI payments are quick and adding money works reliably.', rating: 4, version: '8.19' },
  { text: 'Good investment platform but advanced chart tools need improvement.', rating: 4, version: '8.20' },
  { text: 'Customer support resolved my account issue quickly.', rating: 4, version: '8.19' },
  { text: 'The app works but the option chain sometimes loads slowly.', rating: 3, version: '8.21' },
  { text: 'Portfolio values take time to refresh after market close.', rating: 3, version: '8.20' },
  { text: 'More indicators and drawing tools would improve the trading charts.', rating: 3, version: '8.19' },
  { text: 'The interface is useful but account statements are hard to find.', rating: 3, version: '8.20' },
  { text: 'Brokerage charges are not explained clearly before placing an order.', rating: 2, version: '8.21' },
  { text: 'Customer support takes too long to answer account verification issues.', rating: 2, version: '8.20' },
  { text: 'The latest update causes login problems and repeated verification.', rating: 2, version: '8.21' },
  { text: 'Charts freeze during market hours and order placement becomes slow.', rating: 2, version: '8.19' },
  { text: 'Money withdrawal is delayed and the transaction status is unclear.', rating: 1, version: '8.21' },
  { text: 'The app crashes when opening the portfolio after the new update.', rating: 1, version: '8.20' },
  { text: 'Account verification keeps failing and customer care is not responding.', rating: 1, version: '8.19' },
  { text: 'Order execution failed during market hours and support did not help.', rating: 1, version: '8.21' },
];

const now = new Date();
let reviews: Review[] = Array.from({ length: 240 }, (_, index) => {
  const template = templates[index % templates.length];
  const createdAt = new Date(now);
  createdAt.setUTCDate(createdAt.getUTCDate() - ((index * 7) % 90));
  createdAt.setUTCHours(8 + (index % 10), (index * 13) % 60, 0, 0);
  return {
    id: `demo-${String(index + 1).padStart(4, '0')}`,
    author: 'Anonymous demo reviewer',
    platform: index % 4 === 0 ? 'Apple App Store' : 'Google Play Store',
    rating: template.rating,
    text: template.text,
    version: template.version,
    status: index % 5 === 0 ? 'Reviewed' : 'Unread',
    created_at: createdAt.toISOString(),
  };
});

const stopWords = new Set([
  'about', 'after', 'again', 'all', 'also', 'and', 'app', 'are', 'been', 'but', 'can',
  'for', 'from', 'good', 'has', 'have', 'into', 'its', 'more', 'new', 'not', 'now',
  'only', 'the', 'their', 'them', 'then', 'there', 'this', 'too', 'use', 'very', 'was',
  'were', 'when', 'with', 'would', 'your',
]);

function canonicalPlatform(value: string): 'ios' | 'android' {
  return /apple|ios/i.test(value) ? 'ios' : 'android';
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function filteredReviews(params: URLSearchParams): Review[] {
  const q = (params.get('q') || '').trim().toLocaleLowerCase();
  const platform = params.get('platform') || 'All Platforms';
  const version = params.get('version') || 'All Versions';
  const rating = Number(params.get('rating') || 0);
  const status = params.get('status') || 'All Statuses';
  const days = Number(params.get('days') || 0);
  const minWords = Number(params.get('min_words') || 0);
  const cutoff = new Date();
  if (days) cutoff.setDate(cutoff.getDate() - days);

  return reviews.filter((review) => {
    if (q && !`${review.text} ${review.author}`.toLocaleLowerCase().includes(q)) return false;
    if (platform === 'iOS' && canonicalPlatform(review.platform) !== 'ios') return false;
    if (platform === 'Android' && canonicalPlatform(review.platform) !== 'android') return false;
    if (version !== 'All Versions' && review.version !== version) return false;
    if (rating && review.rating !== rating) return false;
    if (status !== 'All Statuses' && status !== 'all' && review.status !== status) return false;
    if (days && (!review.created_at || new Date(review.created_at) < cutoff)) return false;
    return wordCount(review.text) > minWords;
  });
}

function averageRating(items: Review[]): number | null {
  if (!items.length) return null;
  return Math.round(items.reduce((sum, review) => sum + review.rating, 0) / items.length * 100) / 100;
}

function termSet(text: string): Map<string, 'unigram' | 'bigram'> {
  const tokens = (text.toLocaleLowerCase().match(/[a-z][a-z']{2,}/g) || [])
    .map((token) => stopWords.has(token) ? null : token);
  const terms = new Map<string, 'unigram' | 'bigram'>();
  for (const token of tokens) if (token) terms.set(token, 'unigram');
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const left = tokens[index];
    const right = tokens[index + 1];
    if (left && right && left !== right) terms.set(`${left} ${right}`, 'bigram');
  }
  return terms;
}

export async function getWorkspaces(): Promise<Workspace[]> {
  return [{ id: 'ws_1', name: 'Groww Mobile App · Demo' }];
}

export async function getReviews(params: URLSearchParams): Promise<PaginatedReviews> {
  const filtered = filteredReviews(params).sort((a, b) =>
    String(b.created_at).localeCompare(String(a.created_at))
  );
  const page = Math.max(1, Number(params.get('page') || 1));
  const limit = Math.max(1, Number(params.get('limit') || 25));
  return {
    items: filtered.slice((page - 1) * limit, page * limit),
    total: filtered.length,
    page,
    limit,
    available_versions: [...new Set(reviews.map((review) => review.version))].sort().reverse(),
    available_statuses: [...new Set(reviews.map((review) => review.status))].sort(),
  };
}

export async function getReviewSummary(params: URLSearchParams): Promise<ReviewSummary> {
  const filtered = filteredReviews(params);
  return {
    total: filtered.length,
    unread: filtered.filter((review) => review.status === 'Unread').length,
    one_star: filtered.filter((review) => review.rating === 1).length,
    average_rating: averageRating(filtered),
    ios: filtered.filter((review) => canonicalPlatform(review.platform) === 'ios').length,
    android: filtered.filter((review) => canonicalPlatform(review.platform) === 'android').length,
    excluded_non_store: 0,
    min_words: Number(params.get('min_words') || 0),
    days: Number(params.get('days') || 0),
  };
}

export async function getDashboardMetrics(options: DashboardMetricOptions): Promise<DashboardMetrics> {
  const baseParams = new URLSearchParams({
    days: String(options.days),
    min_words: String(options.minWords),
  });
  const all = filteredReviews(baseParams);
  const selected = options.platform === 'All Platforms'
    ? all
    : all.filter((review) => canonicalPlatform(review.platform) === (options.platform === 'iOS' ? 'ios' : 'android'));
  const ios = all.filter((review) => canonicalPlatform(review.platform) === 'ios');
  const android = all.filter((review) => canonicalPlatform(review.platform) === 'android');
  const advocates = selected.filter((review) => review.rating >= options.advocateMin);
  const critics = selected.filter((review) => review.rating <= options.criticMax);
  const neutral = selected.filter((review) => review.rating > options.criticMax && review.rating < options.advocateMin);
  const total = selected.length;
  const ratings = selected.map((review) => review.rating).sort((a, b) => a - b);
  const percent = (count: number) => total ? Math.round(count / total * 1000) / 10 : 0;
  const iosAverage = averageRating(ios);
  const androidAverage = averageRating(android);
  return {
    total_reviews: total,
    ios_reviews: selected.filter((review) => canonicalPlatform(review.platform) === 'ios').length,
    android_reviews: selected.filter((review) => canonicalPlatform(review.platform) === 'android').length,
    ios_average_rating: iosAverage == null ? null : Math.round(iosAverage * 10) / 10,
    android_average_rating: androidAverage == null ? null : Math.round(androidAverage * 10) / 10,
    store_rating_difference: iosAverage == null || androidAverage == null ? null : Math.round((iosAverage - androidAverage) * 10) / 10,
    average_rating: Math.round((averageRating(selected) || 0) * 10) / 10,
    median_rating: ratings.length ? ratings[Math.floor(ratings.length / 2)] : 0,
    rating_advocacy_score: Math.round((percent(advocates.length) - percent(critics.length)) * 10) / 10,
    advocates_count: advocates.length,
    neutral_count: neutral.length,
    critics_count: critics.length,
    advocates_percent: percent(advocates.length),
    neutral_percent: percent(neutral.length),
    critics_percent: percent(critics.length),
    oldest_review_at: selected.at(-1)?.created_at || null,
    newest_review_at: selected[0]?.created_at || null,
    rating_distribution: Object.fromEntries([1, 2, 3, 4, 5].map((rating) => [String(rating), selected.filter((review) => review.rating === rating).length])) as DashboardMetrics['rating_distribution'],
    advocate_min: options.advocateMin,
    critic_max: options.criticMax,
    days: options.days,
    min_words: options.minWords,
  };
}

function periodKey(date: Date, granularity: AnalyticsGranularity): string {
  const value = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  if (granularity === 'weekly') value.setUTCDate(value.getUTCDate() - ((value.getUTCDay() + 6) % 7));
  if (granularity === 'monthly') value.setUTCDate(1);
  if (granularity === 'quarterly') {
    value.setUTCMonth(Math.floor(value.getUTCMonth() / 3) * 3, 1);
  }
  return value.toISOString().slice(0, 10);
}

export async function getAnalytics(days: number, granularity: AnalyticsGranularity, platform: string): Promise<AnalyticsData> {
  const params = new URLSearchParams({ days: String(days), min_words: '0' });
  if (platform !== 'All Platforms') params.set('platform', platform);
  const current = filteredReviews(params);
  const groups = new Map<string, Review[]>();
  for (const review of current) {
    const key = periodKey(new Date(review.created_at || ''), granularity);
    groups.set(key, [...(groups.get(key) || []), review]);
  }
  const critical = current.filter((review) => review.rating <= 3).length;
  const versions = [...new Set(current.map((review) => review.version))].map((version) => {
    const items = current.filter((review) => review.version === version);
    return { version, reviews: items.length, average_rating: averageRating(items) || 0 };
  }).sort((a, b) => b.reviews - a.reviews);
  return {
    generated_at: new Date().toISOString(),
    days,
    granularity,
    platform,
    total_reviews: current.length,
    reviews_per_day: Math.round(current.length / days * 10) / 10,
    velocity_change_percent: null,
    average_rating: averageRating(current),
    previous_average_rating: null,
    rating_change: null,
    critical_reviews: critical,
    critical_percent: current.length ? Math.round(critical / current.length * 1000) / 10 : 0,
    critical_change_points: null,
    ios_reviews: current.filter((review) => canonicalPlatform(review.platform) === 'ios').length,
    android_reviews: current.filter((review) => canonicalPlatform(review.platform) === 'android').length,
    oldest_review_at: current.at(-1)?.created_at || null,
    newest_review_at: current[0]?.created_at || null,
    rating_distribution: Object.fromEntries([1, 2, 3, 4, 5].map((rating) => [String(rating), current.filter((review) => review.rating === rating).length])) as AnalyticsData['rating_distribution'],
    series: [...groups.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([period, items]) => ({
      period,
      ios: items.filter((review) => canonicalPlatform(review.platform) === 'ios').length,
      android: items.filter((review) => canonicalPlatform(review.platform) === 'android').length,
      total: items.length,
      average_rating: averageRating(items),
      critical_percent: Math.round(items.filter((review) => review.rating <= 3).length / items.length * 1000) / 10,
    })),
    versions,
  };
}

export async function getWordCloud(days: number, platform: string, sentiment: WordCloudSentiment, minFrequency: number): Promise<WordCloudData> {
  const params = new URLSearchParams({ days: String(days), min_words: '0' });
  if (platform !== 'All Platforms') params.set('platform', platform);
  let current = filteredReviews(params);
  if (sentiment === 'positive') current = current.filter((review) => review.rating >= 4);
  if (sentiment === 'neutral') current = current.filter((review) => review.rating === 3);
  if (sentiment === 'negative') current = current.filter((review) => review.rating <= 2);
  const counts = new Map<string, { kind: 'unigram' | 'bigram'; ratings: number[]; sample: string }>();
  for (const review of current) {
    for (const [term, kind] of termSet(review.text)) {
      const value = counts.get(term) || { kind, ratings: [], sample: review.text };
      value.ratings.push(review.rating);
      counts.set(term, value);
    }
  }
  const allTerms: WordCloudTerm[] = [...counts.entries()].filter(([, value]) => value.ratings.length >= minFrequency).map(([term, value]) => {
    const average = value.ratings.reduce((sum, rating) => sum + rating, 0) / value.ratings.length;
    return { term, kind: value.kind, mentions: value.ratings.length, polarity: Math.round((average - 3) / 2 * 100) / 100, average_rating: Math.round(average * 100) / 100, velocity_percent: null, is_new: false, sample_review: value.sample };
  }).sort((a, b) => b.mentions - a.mentions || a.term.localeCompare(b.term));
  const words = allTerms.filter((term) => term.kind === 'unigram').slice(0, 40);
  const phrases = allTerms.filter((term) => term.kind === 'bigram').slice(0, 20);
  const terms = [...words, ...phrases].sort((a, b) => b.mentions - a.mentions);
  const positivePhrases = terms.filter((term) => term.kind === 'bigram' && term.polarity > 0);
  const negativePhrases = terms.filter((term) => term.kind === 'bigram' && term.polarity < 0);
  return {
    generated_at: new Date().toISOString(),
    days,
    platform,
    sentiment,
    review_count: current.length,
    total_matching_reviews: current.length,
    truncated: false,
    distinct_terms: allTerms.length,
    min_frequency: minFrequency,
    top_positive: positivePhrases.sort((a, b) => b.polarity - a.polarity)[0] || null,
    top_negative: negativePhrases.sort((a, b) => a.polarity - b.polarity)[0] || null,
    terms,
  };
}

export async function bulkAction(reviewIds: string[], action: string, value?: string) {
  if (action === 'mark_status' && value) {
    reviews = reviews.map((review) => reviewIds.includes(review.id) ? { ...review, status: value } : review);
  }
  return { success: true, updated_count: reviewIds.length };
}

export async function generateDraft(reviewId: string, tone: string): Promise<{ draft: string }> {
  const review = reviews.find((item) => item.id === reviewId);
  const issue = review?.rating && review.rating <= 2 ? 'the issue you experienced' : 'your feedback';
  return { draft: `Thank you for sharing ${issue}. Our product team is reviewing this feedback. (${tone} demo draft)` };
}

export async function syncFeeds(days: number, maxReviewsPerStore: number): Promise<SyncResult> {
  return { status: 'partial', days, max_reviews_per_store: maxReviewsPerStore, new_reviews: 0, source_counts: { google_play: 0, apple_app_store: 0 }, scanned_counts: { google_play: 0, apple_app_store: 0 }, duplicate_counts: { google_play: 0, apple_app_store: 0 }, errors: ['The public demo uses a privacy-safe bundled dataset; connect a hosted API to import store reviews'] };
}

export async function getSyncStatus(): Promise<SyncStatus> {
  return { last_synced_at: new Date().toISOString(), status: 'success' };
}

export function getExportUrl(params: URLSearchParams): string {
  const lines = [['id', 'platform', 'rating', 'version', 'status', 'created_at', 'text'], ...filteredReviews(params).map((review) => [review.id, review.platform, review.rating, review.version, review.status, review.created_at || '', review.text])];
  const csv = lines.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}
