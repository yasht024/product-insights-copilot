# Goal Description

Design and develop a highly scalable, minimalist, and premium interactive frontend dashboard for the **Product Insights Copilot**. This dashboard will serve as the control center to triage, analyze, and manage app store reviews (e.g., Android, iOS). 

The UI will focus on a **minimalist aesthetic**: keeping only the most essential metrics on the main dashboard and moving deeper features (Analytics, Categories, Word Cloud, Settings) into a sleek sidebar or menubar navigation.

Additionally, we will solve the "LLM request limits" issue by giving the user granular control over how many reviews and from which dates they want to process before sending them to the LLM.

---

## Tech Stack Decisions (Optimized for Scalability)
- **Frontend Framework**: **React (via Vite)**. React is the industry standard for highly scalable, component-driven dashboards. Vite provides lightning-fast builds.
- **Styling**: **TailwindCSS**. It allows for rapid, scalable, and consistent styling without the bloat of traditional CSS files. We will use a premium dark-mode default with subtle glassmorphism and modern fonts (e.g., Inter).
- **Charts**: **Recharts** for rendering responsive and clean data visualizations.
- **Backend Connectivity**: **FastAPI (Python)**. We will wrap the existing Python CLI/logic in a FastAPI backend to serve REST endpoints to the React frontend. This is highly scalable and integrates perfectly with your existing Python code.

---

## Minimalist UI Structure & Implementation Phases

Based on the newly generated UI components (`stitch_product_insights_copilot`), we will implement the dashboard in a phased approach to ensure stable feature delivery.

### Phase 1: Foundation & Premium Dashboard
**Focus:** Project setup and the central overview page.
- **Setup:** Initialize React (Vite) + Tailwind CSS + FastAPI integration.
- **Sidebar Navigation:** Implement the minimalist layout and routing to all planned pages.
- **Premium Dashboard (`product_insights_copilot_premium_dashboard`):**
  - **High-Level Stats:** Total Reviews, Avg Rating, NPS.
  - **Visualizations:** Rating Distribution and Sentiment Split.
  - **Top Real User Quotes:** A widget highlighting impactful positive/negative reviews.
  - **Categorize Widget:** Progress bar and actionable "Categorize" button containing the LLM batching modal.

### Phase 2: Review Triage & Categorization
**Focus:** Core data management and manual/AI review triage.
- **Reviews Inbox (`reviews_inbox_full_triage_data_table`):** A dedicated full-page data table with advanced search, sorting, and deep filtering (by date, rating, sentiment, and AI category).
- **Categories & Taxonomy (`categories_taxonomy_multi_label_neural_hierarchy`):** Interface to view, edit, and manage the multi-label category hierarchy applied by the LLM.

### Phase 3: Advanced Analytics & Natural Language Processing
**Focus:** Deep dives into sentiment and semantic trends.
- **Analytics & Trends (`analytics_trends_telemetry_sentiment_drift`):** Time-series charts visualizing telemetry data and detecting sentiment drift over time.
- **Word Cloud & Semantic Topics (`word_cloud_semantic_topics_neural_n_gram_clusters`):** Visualizing key n-gram clusters and frequently mentioned semantic topics for quick thematic analysis.

### Phase 4: Ideation & Reporting
**Focus:** Transforming insights into actionable product decisions.
- **Ideation & Roadmapping (`ideation_feature_requests_product_backlog_ai_roadmapping`):** Converting categorized review requests into a structured product backlog and AI-driven roadmap suggestions.
- **Executive Reporting (`reporting_executive_exports_premium_ai_dossiers_automation_pipeline`):** Generating clean, exportable AI dossiers and automating scheduled reports for stakeholders.

### Phase 5: Configuration & Polish
**Focus:** User settings and final refinements.
- **Settings & Preferences (`settings_workspace_preferences_insights_copilot`):** Manage workspace configurations, API keys (LLM), and integrations (Play Store/App Store connections).
- **Final Polish:** Ensure responsive design, smooth micro-animations, and consistent premium dark-mode styling across all modules.

---

## Solving the LLM Request Issue (The Categorize Modal)

To prevent overwhelming the LLM with too many requests, we will implement a smart batching approach driven by user input.

When the user clicks the **"Categorize"** button on the main Dashboard, a modal will appear with the following options:

1. **Date Range Filter [NEW]**:
   - "Which reviews do you want to process?"
   - Options: *Today, Yesterday, This Week, This Month, Custom Date Range*.
2. **Review Count Limit**:
   - "Maximum number of reviews to process?"
   - Options: *Top 50, Top 100, Top 500, All in selected date range*.
3. **Smart Sorting**:
   - "Prioritize by:" 
   - Options: *Newest First, Lowest Rated First, Highest Rated First, Random Sample*.

*Backend Execution*: The React frontend will pass these parameters to the FastAPI backend. The backend will pull only the requested slice of reviews from the database/store, process them in small batches (e.g., 20 at a time) to avoid LLM rate limits, and stream the progress back to the UI.

---

> [!IMPORTANT]
> ## User Review Required
> 
> This updated plan incorporates a phased rollout using the newly designed screens in `stitch_product_insights_copilot`. The phased approach ensures we ship the core dashboard first while maintaining a scalable architecture (React + Tailwind + FastAPI).
> 
> If this phased plan looks good to you, we can move forward with execution starting with **Phase 1 (Foundation & Premium Dashboard)**. Let me know if you are ready to proceed!
