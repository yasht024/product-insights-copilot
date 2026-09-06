# Product Insights Copilot — Problem Statement

## Project Context

Build a Product Insights Copilot for the **Groww** platform ([Groww: Stocks, Mutual Fund, IPO — Google Play](https://play.google.com/store/apps/details?id=com.nextbillion.groww&hl=en_IN)).

The goal is to turn raw mobile-store feedback into a weekly pulse that the team can scan in minutes. It should communicate:

- What users care about
- What users actually said
- What the team should do next

Reviews are already public. The system must aggregate them, organize them into themes, summarize the findings, and deliver the resulting insight through familiar tools:

- **Google Docs** for the written weekly pulse
- **Gmail** for a draft email the user can send

This must be accomplished without building custom credential handling or REST API wiring.

## End-to-End Flow

The project is complete when it can:

1. Pull recent App Store and Google Play Store reviews for the product, within the constraints defined below.
2. Cluster the reviews into a small set of themes.
3. Distill the findings into a one-page weekly note.
4. Publish the note to Google Docs so stakeholders can read it.
5. Create a Gmail draft addressed to the user or an alias that contains the note or a clear link to it.

## Deliverables

The weekly one-page pulse must include:

- **Top themes:** What users discuss most often
- **Real user quotes:** Verbatim snippets from reviews, with no invented wording
- **Three action ideas:** Concrete next steps grounded in the identified themes
- **Draft email:** A Gmail draft to the user or an alias containing the weekly note or a clear link to it

## Who This Helps

| Audience | Why it helps |
| --- | --- |
| Product / Growth | Prioritize fixes and improvements based on real user signals |
| Support | Align messaging with what users are actually saying |
| Leadership | Get a one-page product health check without being overwhelmed by raw reviews |

## What Must Be Built

### 1. Review Import

- Import public reviews from approximately the last **8–12 weeks**.
- Capture the fields available in the chosen review export, such as:
  - Rating
  - Title
  - Review text
  - Date

### 2. Theme Clustering

- Group reviews into no more than **five themes**.
- Select themes that fit the actual review data.
- Possible examples include onboarding, KYC, payments, statements, and withdrawals.

### 3. Weekly Pulse

Generate a scannable, one-page weekly note containing:

- The top three themes, selected from the identified themes as appropriate
- Three anonymous, verbatim user quotes
- Three concrete action ideas supported by the themes

### 4. Email Draft

- Create a Gmail draft addressed to the user or an alias.
- Include the weekly note in the email or provide a clear link to the Google Doc.

## Integration Requirements

Use **Model Context Protocol (MCP)** servers or connectors for Google Docs and Gmail.

MCP must be the primary integration path for:

- Creating or updating the weekly pulse in Google Docs
- Creating the Gmail draft

Do not build bespoke OAuth and Google REST API clients as the primary integration method. Use the MCP servers or connectors available in the environment so that Google Docs and Gmail remain consistent with the course tooling and the solution does not duplicate authentication and HTTP plumbing.

The specific MCP servers or connectors may be chosen based on what the environment provides. The requirement is to remain **MCP-first**, rather than calling Google APIs manually.

## Key Constraints

### Reviews

- Use public review exports only.
- Do not scrape content behind store logins.
- Do not use automation that violates app-store terms of service.

### Themes

- Use a maximum of five themes for clustering.
- Highlight only the top three themes in the written pulse.

### Length

- Keep the weekly note scannable and no more than **250 words**, where applicable.

### Privacy

- Do not include personally identifiable information (PII) in any artifact.
- Exclude usernames, email addresses, device IDs, and other identifiable reviewer data.
- Keep quotes anonymous and strip identifying information where necessary.
- Quotes must remain verbatim; do not invent or alter the user's wording.

## Definition of Done

The solution is complete when recent public reviews are transformed into a concise, privacy-safe weekly pulse that:

- Groups the feedback into no more than five themes
- Highlights the top three themes
- Includes three genuine, anonymous review quotes
- Recommends three evidence-based actions
- Is published in Google Docs
- Is included or clearly linked in a ready-to-send Gmail draft
