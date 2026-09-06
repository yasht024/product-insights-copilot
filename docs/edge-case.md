# Product Insights Copilot - Edge-Case Catalog

## 1. Purpose

This catalog defines corner cases and expected fail-safe behavior for the system described in [architecture.md](./architecture.md) and [implementation-plan.md](./implementation-plan.md).

It is intended to drive:

- Unit, integration, contract, adversarial, load, and recovery tests
- LangChain prompt and structured-output validation
- LangGraph routing and checkpoint behavior
- MCP connector preflight and delivery safeguards
- Privacy/security review
- Operations runbooks and release gates

The catalog is comprehensive for the documented architecture, but it must evolve when a review source, model provider, MCP server, or deployment environment is selected or changed.

## 2. Priority and Test Conventions

### 2.1 Priority

| Priority | Meaning |
| --- | --- |
| P0 | Privacy breach, unauthorized email/send, terms violation, corrupt publication, or duplicate external side effect; blocks release |
| P1 | Run correctness, availability, grounding, or recoverability issue; must be handled before production |
| P2 | Quality, usability, or non-critical operational degradation; may be accepted temporarily with documented mitigation |

### 2.2 Test Type

| Code | Test type |
| --- | --- |
| U | Unit test |
| I | Integration test |
| C | MCP/provider contract test |
| A | Privacy, security, or prompt-injection adversarial test |
| R | Restart, replay, and failure-recovery test |
| L | Load/performance test |
| O | Manual operational or release test |

### 2.3 Standard Outcomes

| Outcome | Meaning |
| --- | --- |
| `CONTINUE` | Input is valid and normal processing continues |
| `CONTINUE_WITH_REJECTIONS` | Invalid records are quarantined, counts are stored, and the run continues only if the minimum evidence threshold remains satisfied |
| `BLOCKED_CONFIG` | Startup/preflight stops before model or MCP side effects because required configuration is invalid or incomplete |
| `NEEDS_HUMAN_REVIEW` | The system cannot safely satisfy content requirements and publishes nothing |
| `FAILED_RETRYABLE` | A transient failure is persisted and retried with bounded backoff or resumed later |
| `FAILED_TERMINAL` | A non-transient contract, security, or data-integrity failure stops the run |
| `COMPLETED` | A valid report, one Google Doc, and one unsent Gmail draft are recorded |

## 3. Non-Negotiable Invariants

Any violation below blocks publication:

1. Review sources are approved, public, and terms-compliant.
2. The resolved lookback is from 8 through 12 weeks.
3. Dates and scheduled times use IST (`Asia/Kolkata`, `+05:30`).
4. No raw or detected PII reaches analysis, logs, traces, Google Docs, or Gmail.
5. Final themes do not exceed five; exactly three are highlighted.
6. Exactly three quotes come from three distinct privacy-approved reviews.
7. Each quote is an exact contiguous source span; no generated, translated, corrected, or paraphrased quote is allowed.
8. Exactly three actions reference valid theme/review evidence.
9. The visible weekly-pulse body is no more than 250 words.
10. LangChain analysis chains have no external tools.
11. MCP tools are called only by deterministic post-validation LangGraph nodes.
12. Gmail send capability is unavailable to the application.
13. One logical reporting week produces no more than one document and one unsent draft.

## 4. Configuration and Preflight Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| CFG-001 | Google Play package ID is missing | `BLOCKED_CONFIG`; identify the missing field | P1 / U,I |
| CFG-002 | Apple App Store ID/URL is missing for a two-store production run | `BLOCKED_CONFIG`; fixture-only development may continue | P1 / U,I |
| CFG-003 | A configured product ID does not match the approved product | `BLOCKED_CONFIG`; do not import or publish | P0 / I,O |
| CFG-004 | Lookback is less than 8 or greater than 12 weeks | Reject configuration at startup | P1 / U |
| CFG-005 | Lookback is fractional, negative, text, or null | Reject configuration with field-level error | P1 / U |
| CFG-006 | Timezone is not `Asia/Kolkata` | Reject production configuration; never silently substitute machine-local time | P1 / U,I |
| CFG-007 | Schedule expression is invalid | `BLOCKED_CONFIG`; manual runs remain available | P1 / U,I |
| CFG-008 | Schedule is valid but day/time is not approved | Preflight fails against the operating policy | P1 / I,O |
| CFG-009 | Maximum themes exceeds five | Reject configuration | P0 / U |
| CFG-010 | Highlight/quote/action counts are not exactly three | Reject configuration | P0 / U |
| CFG-011 | Word cap exceeds 250 | Reject configuration | P0 / U |
| CFG-012 | Draft-only flag is false or absent | Reject production configuration | P0 / U,I |
| CFG-013 | Recipient is missing | `BLOCKED_CONFIG` before Gmail access | P1 / U,I |
| CFG-014 | Recipient is not in the allowlist | `FAILED_TERMINAL`; never create draft | P0 / U,C |
| CFG-015 | Drive folder is missing or outside the allowlist | `BLOCKED_CONFIG` | P0 / I,C |
| CFG-016 | Model provider or model name is missing | `BLOCKED_CONFIG` for live analysis; fake-model tests may continue | P1 / U,I |
| CFG-017 | Model credentials are missing/expired | Fail preflight or mark `FAILED_TERMINAL` authentication error; do not retry indefinitely | P1 / I,C |
| CFG-018 | MCP server alias is missing | `BLOCKED_CONFIG` | P1 / U,I |
| CFG-019 | Retention values are negative or violate approved policy | Reject configuration | P0 / U |
| CFG-020 | Unknown configuration fields appear after a spelling error | Strict schema rejects them instead of silently ignoring them | P1 / U |
| CFG-021 | Environment variable unexpectedly overrides checked configuration | Record resolved non-secret config/version and fail if it violates invariants | P1 / I,O |
| CFG-022 | Config changes during a running job | Running job uses its immutable snapshot; new config applies only to a new/restarted run | P1 / I,R |

## 5. Review Source and Acquisition Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| SRC-001 | Source requires login scraping or bypassing store controls | Source is not implemented/enabled; escalate for source-policy review | P0 / O |
| SRC-002 | Source terms or access policy changed | Disable adapter until re-approved; do not fall back to scraping | P0 / C,O |
| SRC-003 | Export comes from an unapproved domain/provider | Reject batch before parsing | P0 / I,A |
| SRC-004 | File claims Google Play but schema matches another source | Reject source/schema mismatch | P1 / I |
| SRC-005 | Same batch is uploaded twice | Source batch fingerprint detects repeat; reuse result or import idempotently | P1 / I |
| SRC-006 | Export is incomplete because provider pagination stopped | Mark batch incomplete and block analysis unless completeness can be proven | P1 / C,I |
| SRC-007 | One store export is present and the other is missing | Production two-store run blocks; explicitly configured single-store test run may continue | P1 / I,O |
| SRC-008 | Source contains reviewer username/profile fields | Adapter ignores them and tests prove they are never mapped or stored | P0 / U,A |
| SRC-009 | Source includes private support-ticket content mixed with reviews | Reject non-public rows/batch; do not treat as store reviews | P0 / I,O |
| SRC-010 | Export has data for multiple apps | Filter only the exact approved product ID and record rejected counts | P0 / I |
| SRC-011 | Export contains test/sandbox app reviews | Reject records whose product ID does not match production target | P1 / I |
| SRC-012 | Provider returns reviews outside requested dates | Downstream fixed-window selector excludes them | P1 / I |
| SRC-013 | Provider mutates/deletes historical reviews between runs | Treat each approved export as a versioned source batch; preserve sanitized audit metadata | P2 / I,O |
| SRC-014 | Export provenance cannot be established | `NEEDS_HUMAN_REVIEW`; no production publication | P0 / I,O |
| SRC-015 | Source returns an HTML error page with HTTP success | Validate media type/schema and reject as malformed source | P1 / C,I |
| SRC-016 | Compressed/archive export contains unexpected paths or executables | Reject unsafe archive entries; never extract outside the restricted import directory | P0 / A,I |

## 6. File Parsing and Schema Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| PAR-001 | Empty file | Stop with no-data result; publish nothing | P1 / U,I |
| PAR-002 | Header-only CSV | Stop with no-data result | P1 / U,I |
| PAR-003 | Missing required review-text column | Reject batch with schema error | P1 / U,I |
| PAR-004 | Column names differ only by case/whitespace | Apply documented normalization; reject ambiguous duplicates | P2 / U |
| PAR-005 | Duplicate column names | Reject batch rather than choose silently | P1 / U |
| PAR-006 | Rows contain extra columns | Ignore only allowlisted optional fields; reject ambiguous schema drift | P1 / U,C |
| PAR-007 | CSV delimiter differs from expected | Detect from allowlisted formats or reject with guidance | P2 / U |
| PAR-008 | Quoted review contains commas, quotes, or newlines | Parse as one field without changing content | P1 / U |
| PAR-009 | Unclosed CSV quote or malformed JSON | Quarantine record/batch according to parser recoverability and record count | P1 / U,I |
| PAR-010 | File uses UTF-8 BOM | Decode successfully and remove BOM from header only | P2 / U |
| PAR-011 | File is UTF-16 or legacy encoding | Reject unless explicitly supported; never silently mojibake content | P1 / U |
| PAR-012 | Binary file has a `.csv` extension | Reject by content/media validation | P1 / A,I |
| PAR-013 | Extremely large field or row | Enforce size limit; quarantine row without exhausting memory | P1 / U,L |
| PAR-014 | Null bytes/control characters appear | Remove only documented unsafe controls or quarantine; preserve visible wording | P1 / U,A |
| PAR-015 | Rating is `4.0`, `five`, `0`, `6`, negative, or null | Convert only unambiguous valid values; reject the rest | P1 / U |
| PAR-016 | Date is missing or unparsable | Reject row; record generic reason without raw value in logs | P1 / U |
| PAR-017 | Title is absent but review text is valid | Accept with null title | P2 / U |
| PAR-018 | Review text is null, empty, or whitespace-only | Reject row | P1 / U |
| PAR-019 | Spreadsheet formula text begins with `=`, `+`, `-`, or `@` | Treat as plain review data; escape if ever exported to a spreadsheet | P0 / A,U |
| PAR-020 | JSON contains deeply nested or recursive-looking content | Enforce depth/size limits and reject malformed payload | P1 / A,L |

## 7. Date, Time, and Reporting-Window Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| TIM-001 | Review date equals `period_start` | Include it; lower boundary is inclusive | P1 / U |
| TIM-002 | Review date equals `period_end` | Include it; upper boundary is inclusive | P1 / U |
| TIM-003 | Review is one instant before the start boundary | Exclude it | P1 / U |
| TIM-004 | Review is one instant after the end boundary | Exclude it | P1 / U |
| TIM-005 | Review date is in the future relative to run cutoff | Exclude and flag source anomaly | P1 / U,I |
| TIM-006 | Source provides date without time or offset | Apply documented store-specific date interpretation in IST and record assumption | P1 / U |
| TIM-007 | Source offset conversion changes calendar date in IST | Use converted IST instant for timestamp logic while retaining source date/offset | P1 / U |
| TIM-008 | Machine timezone differs from IST | Results remain unchanged because timezone is explicit | P1 / U,I |
| TIM-009 | Run crosses midnight IST | Fixed `reporting_week_end` prevents window drift | P1 / I,R |
| TIM-010 | Leap day occurs inside window | Calculate boundaries with calendar-aware date arithmetic | P2 / U |
| TIM-011 | Window crosses month or year boundary | Include correct dates without manual month assumptions | P1 / U |
| TIM-012 | Daylight-saving transition occurs elsewhere | IST logic remains fixed at `+05:30`; source offsets are still parsed correctly | P2 / U |
| TIM-013 | Scheduler fires twice for the same week | Run lock and stable `run_key` collapse duplicate triggers | P0 / I,R |
| TIM-014 | Scheduler misses a week | Operator can backfill with explicit reporting date; current run is not stretched silently | P1 / I,O |
| TIM-015 | Host clock is badly skewed | Use explicit scheduled cutoff and trusted clock/monitoring; fail preflight on unacceptable skew | P1 / I,O |
| TIM-016 | Re-run happens after configuration changed | Original run uses recorded date/config versions; intentional regeneration updates the same logical artifact | P1 / I,R |

## 8. Text Normalization and Language Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| TXT-001 | Review contains emoji | Preserve emoji and process without encoding failure | P2 / U,I |
| TXT-002 | Review contains Hindi or another Indic script | Preserve original text; multilingual model may analyze it; quote is not translated | P1 / U,I |
| TXT-003 | Review contains mixed languages/scripts | Preserve content and optionally detect a single/mixed language tag | P2 / U,I |
| TXT-004 | Review is right-to-left text | Preserve ordering/content and render safely | P2 / U,O |
| TXT-005 | Same visible characters use composed/decomposed Unicode | Normalize consistently for deduplication while preserving a source-verifiable representation | P1 / U |
| TXT-006 | Zero-width characters split PII or malicious instructions | Privacy/security normalization detects them without altering published safe quotes | P0 / A,U |
| TXT-007 | Homoglyphs disguise an email, URL, or account ID | Flag high-risk content or route to privacy review | P0 / A |
| TXT-008 | HTML/Markdown/script tags appear in review | Treat as text; escape on rendering; never execute or create active content | P0 / A,U |
| TXT-009 | Review contains triple backticks or prompt delimiters | Escape/delimit as data; cannot terminate the model prompt boundary | P0 / A |
| TXT-010 | Excessive whitespace/newlines | Normalize only documented surrounding/layout whitespace; retain wording for quote checks | P2 / U |
| TXT-011 | Review contains only emoji/punctuation | Accept only if policy considers it analyzable; never select as an unclear quote | P2 / U,O |
| TXT-012 | Very long review exceeds batch budget | Truncate only analysis copy using documented strategy; retain quote-eligible source and never cut identifiers into misleading text | P1 / U,L |
| TXT-013 | Mojibake is detected | Reject/quarantine or re-decode only with a proven encoding; do not publish corrupted quotes | P1 / U,O |
| TXT-014 | Store title and body repeat the same text | Avoid double-counting it during analysis | P2 / U |
| TXT-015 | Review uses unusual apostrophes/hyphens | Shared exact-match and word-count logic handles Unicode consistently | P1 / U |
| TXT-016 | Language detector is uncertain | Store null/unknown; do not reject otherwise safe content solely for language uncertainty | P2 / U |

## 9. Privacy and PII Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| PII-001 | Email address appears in title or body | Reject or sanitize analysis copy; review is ineligible for quoting | P0 / A,U |
| PII-002 | Email is obfuscated as `name [at] domain` | Detect or route to `needs_review`; never quote | P0 / A |
| PII-003 | Indian/international phone number appears | Detect across spacing, prefixes, and punctuation; never quote | P0 / A |
| PII-004 | PAN, Aadhaar-like, bank, UPI, card, or account number appears | Detect/reject; never log matched value | P0 / A |
| PII-005 | Device ID, order ID, ticket ID, or transaction ID appears | Treat as identifying/sensitive according to policy; exclude from quote | P0 / A |
| PII-006 | Person name appears in review text | High-confidence finding routes to rejection/review; prefer a different clean quote | P0 / A,O |
| PII-007 | Username/profile URL/social handle appears | Detect and exclude from published content | P0 / A |
| PII-008 | PII is split by whitespace or zero-width characters | Canonical detection copy identifies it | P0 / A |
| PII-009 | PII is written in words rather than digits | Detector/policy flags high-risk patterns or requires human review | P0 / A,O |
| PII-010 | False positive removes many safe reviews | Record categories/counts, tune detector with approved evaluation data, but never weaken final scan silently | P1 / A,O |
| PII-011 | False negative survives first privacy pass | Independent final report scan blocks publication | P0 / A,I |
| PII-012 | Safe quote is adjacent to PII elsewhere in same review | Prefer another entirely clean review; do not publish from a review requiring redaction | P0 / A,U |
| PII-013 | Fewer than three clean quote sources remain | `NEEDS_HUMAN_REVIEW`; publish nothing | P0 / I |
| PII-014 | All reviews are privacy-rejected | Stop before analysis; publish nothing | P0 / I |
| PII-015 | PII appears in model validation error | Sanitize exception before log/audit persistence | P0 / A,I |
| PII-016 | PII appears in MCP error echo | Redact before logging; preserve only error category/request ID | P0 / A,C |
| PII-017 | Raw import contains reviewer names in unused columns | Streaming parser discards columns before domain persistence | P0 / U,I |
| PII-018 | Source review key itself is identifying | Hash/protect it and never render or log it | P0 / A,U |
| PII-019 | Human reviewer copies PII into an override | Final validator reruns after overrides and blocks delivery | P0 / I,O |
| PII-020 | External tracing captures prompts/reviews | Content-bearing tracing is disabled by default; enable only after privacy approval with sanitized payloads | P0 / A,O |
| PII-021 | Backup contains expired raw imports | Retention applies to backups or backups are encrypted/expired per approved policy | P0 / O,R |
| PII-022 | Report title/metadata contains recipient or reviewer identity | Validator rejects identifying metadata | P0 / U,I |

## 10. Deduplication and Identity Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| DED-001 | Same stable review ID appears twice in one file | Keep one canonical record and count duplicate | P1 / U |
| DED-002 | Same review appears in overlapping weekly exports | Reuse stored record via source key/fingerprint | P1 / I |
| DED-003 | Same text/rating/date comes from different stores | Keep both because store is part of identity | P1 / U |
| DED-004 | Two distinct users post identical text on same store/date | Stable IDs keep both; fallback fingerprint collision is flagged rather than silently destroying evidence | P1 / U,O |
| DED-005 | Review is edited but stable source ID remains | Apply documented latest-version policy and retain change metadata without double-counting | P1 / I |
| DED-006 | Review rating changes but text stays the same | Stable ID updates canonical rating; run manifests remain reproducible | P1 / I |
| DED-007 | Source does not supply a stable ID | Use keyed content fingerprint and record fallback method | P1 / U |
| DED-008 | Hash collision is detected | Keep records separately, flag anomaly, and do not merge automatically | P1 / U,A |
| DED-009 | Fingerprint key rotates | Version fingerprints and provide controlled reconciliation without duplicating all records | P1 / I,O |
| DED-010 | Whitespace/Unicode variants represent same review | Canonical fingerprint detects equivalent normalized content | P2 / U |
| DED-011 | Near-duplicate spam appears | Flag metric/quality risk; do not automatically remove in MVP without approved policy | P2 / I,O |
| DED-012 | A deduplicated record had a stricter privacy status in another import | Most restrictive privacy status wins | P0 / U,I |

## 11. Data Sufficiency and Distribution Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| DAT-001 | Zero eligible reviews | `NEEDS_HUMAN_REVIEW`; no report or draft | P1 / I |
| DAT-002 | Eligible count is below configured minimum | `NEEDS_HUMAN_REVIEW`; do not fabricate themes | P1 / I |
| DAT-003 | Only one or two defensible themes exist | Fail exact top-three requirement and route to review | P1 / I,O |
| DAT-004 | All ratings are identical | Continue; ranking still uses count/recency tie-breakers | P2 / U,I |
| DAT-005 | One store dominates review volume | Report aggregate truth; record store distribution for interpretation | P2 / I,O |
| DAT-006 | One store has no reviews in the window | Follow approved completeness policy; never imply two-store coverage | P1 / I,O |
| DAT-007 | Sudden extreme volume spike | Continue only after source/duplicate sanity checks; surface operational metric | P1 / I,L |
| DAT-008 | Very few recent reviews but many older reviews | Apply fixed window and volume-first ranking; do not overstate trend | P2 / U,O |
| DAT-009 | Reviews are mostly non-textual/unclear | Exclude from quote candidates and block if evidence threshold fails | P1 / I,O |
| DAT-010 | All eligible reviews concern unrelated content/spam | Route to human review; do not invent product themes | P1 / A,O |
| DAT-011 | Rating distribution conflicts with review wording | Preserve both; theme summary avoids unsupported sentiment claims | P2 / I,O |
| DAT-012 | Batch has mixed production/test dates | Fixed window/product filters exclude invalid rows and report counts | P1 / I |

## 12. LangChain and Model Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| LLM-001 | Provider request times out | Bounded retry with backoff; then `FAILED_RETRYABLE` from checkpoint | P1 / I,R |
| LLM-002 | Provider rate-limits requests | Honor retry guidance/backoff and concurrency cap; do not flood provider | P1 / I,L |
| LLM-003 | Authentication or model access is denied | `FAILED_TERMINAL` configuration/auth error; do not retry indefinitely | P1 / C |
| LLM-004 | Configured model is removed/renamed | Preflight/contract test fails; require explicit model decision and version change | P1 / C,O |
| LLM-005 | Provider does not support requested structured-output mode | Use an explicitly tested LangChain fallback strategy or block configuration | P1 / C,I |
| LLM-006 | Output is invalid JSON or cannot be parsed | One bounded repair/retry with recorded error; then fail analysis | P1 / U,I |
| LLM-007 | Pydantic output has missing fields | Reject and retry/fail according to parse policy | P1 / U,I |
| LLM-008 | Output contains extra unexpected fields | Strict schema rejects them | P1 / U,I |
| LLM-009 | Model returns more than five themes | Deterministic reducer/validator enforces cap or fails; never publish six | P0 / U,I |
| LLM-010 | Model invents review IDs | Evidence validator rejects unknown IDs | P0 / U,I |
| LLM-011 | Model assigns the same review to multiple primary themes | Assignment validator rejects/repairs deterministically; record result | P1 / U,I |
| LLM-012 | Model omits eligible reviews | Coverage validator routes omissions through defined fallback/retry; never silently skew counts | P1 / U,I |
| LLM-013 | Model copies PII from sanitized input metadata | Final PII validator blocks output | P0 / A,I |
| LLM-014 | Review text instructs model to ignore rules | Fixed system prompt/data delimiters and tool-free chain prevent instruction following | P0 / A |
| LLM-015 | Review asks model to reveal other reviews/prompts | Treat as review content; output schema and evidence rules prevent disclosure | P0 / A |
| LLM-016 | Review embeds fake JSON/XML closing delimiters | Robust serialization/delimiting prevents prompt-boundary escape | P0 / A |
| LLM-017 | Context window would be exceeded | Batch deterministically with bounded sizes; never drop reviews without recording it | P1 / U,L |
| LLM-018 | One batch fails while others succeed | Persist batch state; retry only failed batch; final analysis waits for complete coverage | P1 / I,R |
| LLM-019 | Two runs produce different labels for identical inputs | Version/temperature controls and semantic merge reduce drift; evaluation detects change | P2 / I,O |
| LLM-020 | Provider returns a refusal/safety response | Treat as invalid structured output; retry only if policy permits, otherwise human review | P1 / I |
| LLM-021 | Provider returns empty output with success status | Reject as schema failure | P1 / C,I |
| LLM-022 | Streaming response terminates early | Discard incomplete result and retry from durable stage | P1 / I,R |
| LLM-023 | Model/provider changes mid-run | Immutable run configuration keeps the original version; new version applies to a new controlled run | P1 / I,R |
| LLM-024 | Unsupported language yields low-confidence analysis | Route affected evidence to unknown/Other within five-theme cap or human review; never translate quotes | P2 / I,O |
| LLM-025 | Callback/tracer raises an exception | Analysis result is not lost; tracing fails closed or degrades without emitting content | P1 / I,A |
| LLM-026 | Token/cost exceeds configured budget | Stop new batches safely, persist status, and require operator decision | P1 / L,O |

## 13. Theme Formation and Ranking Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| THM-001 | Exactly five defensible themes | Accept all five and highlight deterministic top three | P1 / U,I |
| THM-002 | Six or more candidate themes | Merge/reduce to five using evidence-based rules or fail | P0 / U,I |
| THM-003 | Fewer than three defensible themes | `NEEDS_HUMAN_REVIEW`; do not pad with invented themes | P1 / I |
| THM-004 | `Other` is needed | Count it within the five-theme maximum and document inclusion rule | P2 / U,O |
| THM-005 | `Other` becomes the largest theme | Route for taxonomy/model quality review before publication | P1 / I,O |
| THM-006 | Theme label is vague sentiment such as `Negative` | Reject/rename using evidence to a product-area/problem label | P1 / U,I |
| THM-007 | Theme label contains PII | Final privacy validation blocks report | P0 / A,I |
| THM-008 | Theme label contains Markdown/script injection | Escape/render as text; security validator rejects active content | P0 / A,U |
| THM-009 | Assigned review ID does not exist or is privacy-blocked | Reject assignment | P0 / U,I |
| THM-010 | Review has no primary theme | Coverage validator fails | P1 / U,I |
| THM-011 | Review has two primary themes | Enforce exactly one or fail analysis | P1 / U,I |
| THM-012 | Secondary tag affects volume | Test ensures only primary assignment contributes to count/share/rank | P1 / U |
| THM-013 | Counts/shares supplied by model differ from source data | Ignore model arithmetic; recompute deterministically | P0 / U,I |
| THM-014 | Two themes tie on count | Resolve by low-rating share, then recent share, then normalized label | P1 / U |
| THM-015 | Count and severity tie | Resolve by most-recent-two-week share, then stable label | P1 / U |
| THM-016 | All ranking values tie | Normalized label provides deterministic final order | P2 / U |
| THM-017 | Theme summary claims an unverified root cause | Grounding validator rejects or rewrites as user-observed symptom | P0 / I,O |
| THM-018 | Themes overlap heavily | Merge or reassign until each primary theme is coherent and distinct | P1 / I,O |
| THM-019 | One language is split into separate equivalent theme | Multilingual evaluation/semantic merge combines equivalent concepts | P2 / I,O |
| THM-020 | Theme meaning drifts week to week | Version taxonomy/matching and track drift; do not reuse stale evidence | P2 / I,O |
| THM-021 | A theme has no representative evidence | Exclude or fail; it cannot be highlighted | P1 / U,I |
| THM-022 | Theme count is dominated by near-duplicate spam | Flag quality risk and route to human review under approved spam policy | P1 / I,O |

## 14. Quote Selection Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| QTE-001 | Quote exactly matches a clean source span | Accept and store internal review/theme reference | P1 / U |
| QTE-002 | Quote differs in capitalization | Reject; exact source text is required | P0 / U |
| QTE-003 | Quote corrects spelling or punctuation | Reject; no editing is permitted | P0 / U |
| QTE-004 | Quote translates a non-English review | Reject; publish original language only | P0 / U,I |
| QTE-005 | Ellipsis joins two non-contiguous spans | Reject unless ellipsis exists in source exactly | P0 / U |
| QTE-006 | Quote contains model-invented words | Exact-match validator rejects | P0 / U,I |
| QTE-007 | Same review supplies two quotes | Reject; require three distinct source reviews | P1 / U |
| QTE-008 | Quote comes from a privacy-rejected review | Reject | P0 / U,I |
| QTE-009 | Quote span is clean but PII exists elsewhere in the review | Prefer/restrict to entirely privacy-approved review; reject candidate | P0 / A,U |
| QTE-010 | Quote contains email, phone, account, device, name, or handle | Reject and run final PII gate | P0 / A |
| QTE-011 | Only two clean quote candidates exist | `NEEDS_HUMAN_REVIEW`; publish nothing | P0 / I |
| QTE-012 | Quote belongs to a non-top theme | Reject association unless coverage policy explicitly permits and requirements still pass | P1 / U,O |
| QTE-013 | Three quotes all represent one top theme | Prefer one-per-theme; if coverage rule is mandatory, block until satisfied | P2 / U,O |
| QTE-014 | Quote is too long for 250-word report | Select a shorter exact contiguous span; never truncate silently | P1 / U,I |
| QTE-015 | Quote is too short/vague to understand | Choose another evidence-specific candidate | P2 / O |
| QTE-016 | Quote contains Markdown link/script syntax | Escape as plain text and re-run exactness/privacy checks | P0 / A,U |
| QTE-017 | Unicode normalization makes source comparison fail | Compare using documented normalization while render text stays source-faithful | P1 / U |
| QTE-018 | Source review is edited after quote selection | Run remains reproducible against its versioned source batch; later run uses updated review | P1 / I |
| QTE-019 | Quote is sarcastic or contextually ambiguous | Prefer clearer evidence; do not add interpretation unsupported by theme context | P2 / O |
| QTE-020 | Quote includes product competitor name | Allowed only if privacy/content policy permits and it is relevant; otherwise choose another | P2 / O |
| QTE-021 | Quote contains abusive/profane language | Apply approved stakeholder-content policy without rewriting; choose another if unsuitable | P2 / O |
| QTE-022 | Selected quote source ID is missing during final validation | Fail publication due to broken provenance | P0 / U,I |

## 15. Action Generation Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| ACT-001 | Exactly three grounded actions are returned | Accept after evidence validation | P1 / U,I |
| ACT-002 | Fewer or more than three actions | Reject structured output and retry/fail | P0 / U,I |
| ACT-003 | Two actions are semantic duplicates | Reject or regenerate with distinct scope | P1 / U,I |
| ACT-004 | Action references unknown theme/review ID | Reject | P0 / U,I |
| ACT-005 | Action has no evidence reference | Reject | P0 / U,I |
| ACT-006 | Action claims a technical root cause reviews do not prove | Reject or rewrite as a validation/investigation step | P0 / I,O |
| ACT-007 | Action is vague (`improve experience`) | Fail action-quality rule; require concrete next step | P1 / U,O |
| ACT-008 | Action promises an outcome or deadline not in evidence | Reject unsupported promise | P1 / I,O |
| ACT-009 | Action includes PII copied from evidence | Final privacy validator rejects | P0 / A,I |
| ACT-010 | Action gives investment/financial advice to users | Reject as out of project scope and risk policy | P0 / A,O |
| ACT-011 | Action asks to contact an identifiable reviewer | Reject; reviewer identity is unavailable and must remain so | P0 / A |
| ACT-012 | Suggested owner is unavailable/unknown | Keep owner metadata internal as `TBD` or assign function, not person; concise action can remain | P2 / U,O |
| ACT-013 | Measurement signal is unavailable | Propose an observable validation step rather than invent a metric | P2 / O |
| ACT-014 | Action is grounded only in a non-top theme | Reject unless explicitly justified by selected top-theme evidence | P1 / U |
| ACT-015 | Action includes raw review IDs in rendered report | Strip internal IDs; preserve only in audit artifact | P0 / U,I |
| ACT-016 | Model embeds URL/Markdown/tool instruction in action | Escape or reject; no executable/tool content reaches delivery | P0 / A,U |
| ACT-017 | Actions make pulse exceed 250 words | Regenerate/condense actions without weakening evidence; revalidate | P1 / I |
| ACT-018 | Model refuses to generate an action for sparse evidence | Route to human review rather than fabricating | P1 / I |

## 16. Pulse Composition and Validation Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| PLS-001 | Visible body is exactly 250 words | Accept | P1 / U |
| PLS-002 | Visible body is 251 words | Block publication and recompose | P0 / U,I |
| PLS-003 | Title/timestamp pushes full document over 250 but body is valid | Accept because documented counter applies to visible pulse body only | P2 / U |
| PLS-004 | Markdown markers are counted as words by one component but not another | Use one shared counter in composer, validator, and tests | P1 / U |
| PLS-005 | URL is extremely long | Count visible label, not raw URL; keep document readable | P2 / U |
| PLS-006 | Hyphenated/Unicode words produce inconsistent counts | Unicode-aware shared function decides deterministically | P1 / U |
| PLS-007 | Required section is missing | Block publication | P0 / U,I |
| PLS-008 | Reporting period is missing/reversed | Block publication | P0 / U |
| PLS-009 | More/fewer than three highlighted themes | Block publication | P0 / U |
| PLS-010 | More/fewer than three quotes/actions | Block publication | P0 / U |
| PLS-011 | Duplicate quote/action appears | Reject through uniqueness validator | P1 / U |
| PLS-012 | Internal IDs/debug fields leak into report | Block and sanitize | P0 / A,I |
| PLS-013 | Markdown is malformed | Render safely or fail; do not create active/unreadable document | P1 / U,O |
| PLS-014 | User text creates headings/links unexpectedly | Escape all review-derived content | P0 / A,U |
| PLS-015 | Report claims coverage of both stores when one is missing | Grounding/metadata validator blocks false coverage claim | P0 / I |
| PLS-016 | Average/count differs from repository aggregate | Deterministic reconciliation blocks publication | P0 / U,I |
| PLS-017 | PII is found in title, metadata, theme, quote, action, or link | Block entire artifact | P0 / A,I |
| PLS-018 | Document link is unavailable at composition time | Compose pulse first; draft waits until Docs publication returns valid reference | P1 / I |
| PLS-019 | Empty/whitespace rendered body passes schema | Content validator blocks | P1 / U |
| PLS-020 | Report contains stale previous-week content | Run/reporting-period and evidence IDs must match current run | P0 / I,R |

## 17. LangGraph Workflow and Checkpoint Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| GRF-001 | Worker stops before first checkpoint | Restart same run safely from initial node | P1 / R |
| GRF-002 | Worker stops after ingestion | Resume from durable state without re-import duplication | P1 / R |
| GRF-003 | Worker stops during model batch | Resume/retry incomplete batch; preserve completed batch results | P1 / R |
| GRF-004 | Worker stops after validation but before Docs call | Resume at Docs node using validated artifact | P1 / R |
| GRF-005 | Worker stops after Docs success before ID checkpoint | Reconcile using deterministic marker/folder search; never blindly create another | P0 / R,C |
| GRF-006 | Worker stops after draft success before ID checkpoint | Reconcile draft marker/search capability or require operator review; never blindly duplicate | P0 / R,C |
| GRF-007 | Checkpoint is corrupt/unreadable | Stop side effects and route to operator recovery | P0 / R |
| GRF-008 | Checkpoint schema version is old | Run an explicit migration or block resume; never deserialize unsafely | P1 / R,U |
| GRF-009 | Graph definition changes while run is incomplete | Resume only under compatible graph version or controlled migration | P1 / R,O |
| GRF-010 | Validation failure routes to delivery due to bad edge | Graph path test and runtime assertion block MCP gateway | P0 / U,I |
| GRF-011 | Retry counter is reset on restart | Persist counters in state/repository to prevent infinite retries | P1 / R |
| GRF-012 | A terminal failure is retriggered automatically | Require operator/config change; no automatic loop | P1 / R |
| GRF-013 | Human-review run is resumed without approval | Remain paused/blocked | P0 / R,O |
| GRF-014 | Node returns partial/invalid state | Typed state validation rejects transition | P1 / U,I |
| GRF-015 | Raw review text enters checkpoint state | Schema/security test rejects; store only sanitized data/references | P0 / A,U |
| GRF-016 | Two workers execute same run concurrently | Distributed/local lock ensures one active execution | P0 / I,R |
| GRF-017 | Run is cancelled intentionally | Finish no new side effects; persist cancellation and recovery point | P1 / R,O |
| GRF-018 | Long retry crosses into next reporting week | Run retains original fixed cutoff/run key | P1 / R |
| GRF-019 | Docs succeeds but Gmail is terminally misconfigured | Preserve Doc; mark run terminal/incomplete and require config correction | P1 / I,R |
| GRF-020 | State says complete but artifact reference is missing | Reconciliation check changes status to inconsistent and alerts operator | P0 / R,O |

## 18. MCP Discovery and Tool-Safety Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| MCP-001 | Docs MCP server is unreachable during preflight | `BLOCKED_CONFIG`/retryable connection result; no model/delivery run starts | P1 / C,I |
| MCP-002 | Gmail MCP server is unreachable during preflight | Block connected run before side effects | P1 / C,I |
| MCP-003 | Authentication expires during run | Persist stage, surface reauthorization requirement, and resume after correction | P1 / C,R |
| MCP-004 | Required document-create/update tool is absent | Fail preflight closed | P1 / C |
| MCP-005 | Required Gmail draft-create tool is absent | Fail preflight closed | P1 / C |
| MCP-006 | Multiple tools ambiguously match one semantic role | `BLOCKED_CONFIG`; require explicit mapping | P0 / C,U |
| MCP-007 | Tool name stays same but input schema changes | Contract/schema validation fails before invocation | P1 / C |
| MCP-008 | Tool adds new required field | Fail contract test/preflight with actionable schema difference | P1 / C |
| MCP-009 | Tool returns malformed/non-schema result | Do not advance graph; retry only if transient, otherwise fail | P1 / C,I |
| MCP-010 | MCP server exposes Gmail send tool | Tool registry excludes it; test proves it is unreachable | P0 / A,C |
| MCP-011 | MCP server exposes unrelated/high-privilege tools | Exclude all non-allowlisted tools | P0 / A,C |
| MCP-012 | Analysis model is accidentally bound to MCP tools | Bootstrap/runtime assertion fails application startup | P0 / A,U |
| MCP-013 | Review content resembles an MCP tool call | It remains inert data inside tool-free chain | P0 / A |
| MCP-014 | MCP response echoes report content or sensitive metadata in error | Sanitize logs and audit entry | P0 / A,C |
| MCP-015 | `MultiServerMCPClient` creates fresh sessions by default | Persist run state in repository/checkpoint, never assume session memory | P1 / I,C |
| MCP-016 | Connector requires a stateful session | Open an explicit short-lived stage session and close it safely; repository remains source of truth | P1 / C,I |
| MCP-017 | Connection drops after tool received request | Reconcile artifact before retry to avoid duplicate side effect | P0 / C,R |
| MCP-018 | Tool times out before response | Mark outcome unknown and reconcile; do not blindly repeat create | P0 / C,R |
| MCP-019 | Rate limit is returned | Bounded backoff with jitter; preserve checkpoint | P1 / C,R |
| MCP-020 | Permission scope is broader than required | Security/preflight review blocks production until least privilege is accepted | P0 / C,O |
| MCP-021 | Permission scope is too narrow | Fail preflight with missing capability; no fallback to direct API | P1 / C |
| MCP-022 | Server/tool configuration changes mid-run | Use immutable resolved mapping for run or re-preflight before side effect | P1 / C,R |
| MCP-023 | Connector credentials appear in exception | Redact before persistence/logging | P0 / A,C |
| MCP-024 | Direct Google REST fallback is attempted | Architecture/security test fails build/review | P0 / A,O |

## 19. Google Docs Delivery Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| DOC-001 | Document create succeeds normally | Store document ID/URL before advancing | P1 / C,I |
| DOC-002 | Same logical week is rerun | Update/reuse stored document; do not create another | P0 / C,R |
| DOC-003 | Create succeeds but response is lost | Search/reconcile by restricted folder and run marker before retry | P0 / C,R |
| DOC-004 | Existing document ID returns not found because document was deleted | Mark inconsistent and require controlled recreate/operator decision | P1 / C,O |
| DOC-005 | Existing document was moved to another folder | Verify allowlisted location before update; do not broaden search globally | P0 / C,O |
| DOC-006 | Existing document was manually edited | Apply approved policy: replace managed section/document or require review; never silently destroy unrelated content | P1 / C,O |
| DOC-007 | Document title collision exists without matching run marker | Do not overwrite; create/reconcile using marker and stored ID | P0 / C,I |
| DOC-008 | Destination folder is missing/deleted | Fail before creation and alert operator | P1 / C |
| DOC-009 | Destination folder becomes publicly shared | Security preflight blocks publication | P0 / C,O |
| DOC-010 | Connector creates document with public/default-broad permissions | Detect sharing mismatch, block completion, and follow incident runbook | P0 / C,O |
| DOC-011 | Returned URL is absent or malformed | Do not create Gmail draft; reconcile/fail Docs stage | P1 / C,I |
| DOC-012 | Returned URL does not resolve for intended account | Contract/operational access check fails | P1 / C,O |
| DOC-013 | Wrong week's document ID is loaded | Verify run marker/title/period before update; block mismatch | P0 / U,C |
| DOC-014 | Rendered Markdown is unsupported by connector | Adapter transforms to supported document blocks without changing text/evidence | P1 / C,O |
| DOC-015 | Connector partially writes document | Update idempotently from validated full content or fail/reconcile | P1 / C,R |
| DOC-016 | Report includes raw review IDs/debug/audit fields | Final outbound schema rejects payload | P0 / A,I |
| DOC-017 | Report exceeds 250 words after connector transformation | Validate visible payload before call and verify rendered output when possible | P0 / C,O |
| DOC-018 | Document service quota is exhausted | `FAILED_RETRYABLE` if temporary; otherwise operator action | P1 / C,R |
| DOC-019 | Folder search returns many similarly titled documents | Use exact marker/stored ID; ambiguity requires human review | P0 / C,O |
| DOC-020 | Product name/date contains unsafe title characters | Sanitize title metadata without changing report content | P2 / U,C |

## 20. Gmail Draft Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| GML-001 | Draft creation succeeds | Persist draft ID and verify unsent state | P1 / C,I |
| GML-002 | Same logical week is rerun | Reuse/update stored draft; no duplicate | P0 / C,R |
| GML-003 | Draft create succeeds but response is lost | Reconcile by run marker/approved search; never blindly create another | P0 / C,R |
| GML-004 | Recipient is missing/invalid | Block before MCP call | P0 / U,I |
| GML-005 | Recipient is syntactically valid but not allowlisted | Reject; no draft | P0 / U,C |
| GML-006 | Recipient case/alias representation differs | Canonicalize only according to approved allowlist rules; otherwise block | P0 / U |
| GML-007 | CC/BCC is injected by config or tool default | Outbound schema forbids or enforces empty CC/BCC | P0 / A,C |
| GML-008 | Gmail send tool is discovered | Exclude it and fail security contract if reachable | P0 / A,C |
| GML-009 | Connector automatically sends instead of drafting | Treat as P0 incident; disable integration/schedule and follow rollback runbook | P0 / C,O |
| GML-010 | Existing draft was manually sent | Never alter sent mail; create replacement only with explicit operator-approved policy | P0 / C,O |
| GML-011 | Existing draft was manually edited | Preserve or replace according to managed-draft policy; never send/erase silently | P1 / C,O |
| GML-012 | Existing draft was deleted | Mark inconsistent and require controlled recreate/reconciliation | P1 / C,O |
| GML-013 | Google Doc is not published or link invalid | Do not create draft that falsely points to it | P1 / I,C |
| GML-014 | Subject has wrong product/week | Outbound validator blocks draft call | P0 / U,I |
| GML-015 | Body contains stale pulse from previous week | Verify run ID/period/content hash before call | P0 / U,R |
| GML-016 | Body contains PII, raw review IDs, debug info, or connector metadata | Outbound privacy/schema validation blocks | P0 / A,I |
| GML-017 | Body is empty or missing note/link | Block draft creation | P1 / U,I |
| GML-018 | Body is too large for connector/provider | Use concise validated pulse/link; fail rather than silently truncate | P1 / C |
| GML-019 | Attachment is added unexpectedly | Outbound schema rejects attachments | P0 / A,C |
| GML-020 | Gmail quota/rate limit occurs | Preserve Doc, mark draft stage retryable, and resume only draft node | P1 / C,R |
| GML-021 | Auth/permission error occurs | Preserve Doc; require reauthorization; do not fall back to REST | P1 / C,R |
| GML-022 | Draft tool returns ID but status cannot be verified | Mark unverified/incomplete and require contract/reconciliation check | P1 / C,O |

## 21. Idempotency, Concurrency, and Replay Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| IDE-001 | Two manual commands use same product/week | Unique run key and lock permit only one active run | P0 / I,R |
| IDE-002 | Scheduler and manual backfill collide | Same lock/run key collapses duplicate execution | P0 / I,R |
| IDE-003 | Two processes pass local pre-check simultaneously | Database uniqueness/transaction prevents duplicate run/artifact claim | P0 / I,L |
| IDE-004 | Document ID is persisted but graph checkpoint is not | Resume reads repository and skips create | P0 / R |
| IDE-005 | Draft ID is persisted but graph checkpoint is not | Resume reads repository and skips create | P0 / R |
| IDE-006 | Graph checkpoint advances but artifact ID transaction failed | Reconciliation marks inconsistent; no blind subsequent side effect | P0 / R |
| IDE-007 | Config/prompt/model version changes for same week | Controlled regeneration updates/reuses logical artifacts and records new versions | P1 / I,O |
| IDE-008 | Operator wants a separate corrected edition | Require explicit revision policy/key; never happen implicitly | P1 / O |
| IDE-009 | Run lock holder crashes | Lease expires safely and new worker reconciles durable state | P1 / R,L |
| IDE-010 | Stale worker resumes after lock transferred | Fencing token/ownership check rejects its writes | P0 / R,L |
| IDE-011 | Duplicate source rows race across batches | Database uniqueness/fingerprint transaction prevents duplicate persistence | P1 / I,L |
| IDE-012 | Retry policy repeats non-idempotent MCP create | Adapter must reconcile or use connector-supported idempotency marker | P0 / C,R |
| IDE-013 | Logical week definition changes | Existing run keys remain immutable; migration/new revision is explicit | P1 / U,O |
| IDE-014 | Completed run is invoked again | Return stored completion/artifact references unless explicit regeneration is authorized | P1 / I |

## 22. Persistence, Migration, Backup, and Retention Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| DB-001 | SQLite database is locked | Bounded retry; then `FAILED_RETRYABLE`; do not corrupt state | P1 / I,L |
| DB-002 | Disk is full during import | Transaction rolls back; alert; no partial eligible dataset | P1 / I,R |
| DB-003 | Disk is full after external side effect | Reconcile artifact and require recovery; do not duplicate | P0 / R |
| DB-004 | Database connection drops mid-transaction | Roll back and resume from last committed stage | P1 / I,R |
| DB-005 | Migration partially applies | Transactional migration rolls back or deployment blocks | P1 / I,R |
| DB-006 | Application version is older than schema | Startup blocks with compatibility error | P1 / U,I |
| DB-007 | Checkpoint schema and domain schema disagree | Controlled migration or block resume | P1 / R |
| DB-008 | Review foreign key points to missing record | Integrity constraint blocks write; run fails before analysis | P1 / U,I |
| DB-009 | Artifact ID is linked to wrong run | Referential/semantic validation blocks completion | P0 / U,I |
| DB-010 | Raw-import retention job runs during active import | Lease/status excludes active batch | P1 / I,R |
| DB-011 | Sanitized review expires while referenced by active run | Active-run retention hold preserves required evidence | P1 / I,R |
| DB-012 | Audit retention deletes evidence before policy allows | Retention tests and immutable policy prevent early deletion | P1 / U,O |
| DB-013 | Deletion job fails | Alert and retry; privacy retention breach is surfaced | P0 / I,O |
| DB-014 | Backup includes raw reviews beyond allowed period | Encrypt/expire backup or exclude raw data according to policy | P0 / O,R |
| DB-015 | Restore reintroduces expired raw data | Post-restore retention reconciliation deletes prohibited content | P0 / R,O |
| DB-016 | Fingerprint secret/key is unavailable | Block dedup import; do not log key or switch to plaintext hashes silently | P0 / I,O |
| DB-017 | Fingerprint key is rotated | Version and migrate/reconcile deterministically | P1 / I,O |
| DB-018 | Corrupt record contains invalid Unicode/JSON | Quarantine/repair through controlled migration; never pass to model | P1 / I |
| DB-019 | SQLite single-worker assumption no longer holds | Block unsupported concurrency or migrate to PostgreSQL/checkpointer | P1 / L,O |
| DB-020 | Backup restore loses latest artifact IDs | Reconcile external artifacts before enabling scheduler | P0 / R,O |

## 23. Logging, Metrics, Tracing, and Audit Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| OBS-001 | Parser logs raw malformed row | Logging wrapper forbids/redacts content | P0 / A,U |
| OBS-002 | Model exception includes prompt/review text | Sanitize to provider/error category and request ID | P0 / A,I |
| OBS-003 | MCP exception includes token, recipient, or body | Redact before log/audit persistence | P0 / A,C |
| OBS-004 | Debug logging is enabled in production | Startup/policy blocks content-bearing debug mode | P0 / A,O |
| OBS-005 | External LangChain trace captures prompt/output | Tracing remains disabled or sends approved sanitized metadata only | P0 / A,O |
| OBS-006 | Metrics label contains review ID/text | Use bounded, non-content labels only | P0 / A,U |
| OBS-007 | High-cardinality run IDs overwhelm metrics | Keep run ID in logs/audit, not unbounded metric labels | P2 / L,O |
| OBS-008 | Clock/timezone makes log ordering confusing | Emit ISO 8601 IST timestamps and monotonic durations | P2 / U,O |
| OBS-009 | Failure occurs before run ID exists | Create run identity before risky stages or use sanitized correlation ID | P1 / I |
| OBS-010 | Audit artifact contains raw reviews/prompts | Audit schema rejects raw content | P0 / A,U |
| OBS-011 | Audit evidence references deleted review | Retain sanitized evidence/reference for required audit period or mark controlled tombstone | P1 / I,O |
| OBS-012 | Metrics system is unavailable | Core run continues if safe; buffer/drop non-critical metrics and alert separately | P2 / I |
| OBS-013 | Logging sink is unavailable | Follow approved degraded-mode policy; do not buffer sensitive content locally | P1 / I,O |
| OBS-014 | Alert includes report/quote content | Alert template includes IDs/counts/status only | P0 / A,U |
| OBS-015 | Completion metric emitted before draft verification | Emit completion only after artifact references and validations persist | P1 / I,R |

## 24. Security and Prompt-Injection Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| SEC-001 | Review says to ignore system instructions | Treated as inert data; no behavior change | P0 / A |
| SEC-002 | Review asks model to call Gmail/Docs | Impossible because analysis chains have no tools | P0 / A |
| SEC-003 | Review includes fake tool-call syntax | Output schema/evidence validator rejects it | P0 / A |
| SEC-004 | Review asks for secrets/system prompt | No secret/context access; invalid output is rejected | P0 / A |
| SEC-005 | Review contains executable HTML/JavaScript | Escape as text; never execute | P0 / A,U |
| SEC-006 | Review contains a malicious URL | Do not fetch it; render only if content policy explicitly permits, otherwise omit candidate | P0 / A |
| SEC-007 | CSV formula injection reaches an exported artifact | Escape as plain text; do not generate spreadsheet formulas | P0 / A,U |
| SEC-008 | Path traversal appears in uploaded filename/archive | Resolve within restricted import directory or reject | P0 / A,I |
| SEC-009 | Oversized/decompression-bomb input | Enforce compressed/uncompressed size and entry limits | P0 / A,L |
| SEC-010 | Untrusted config points MCP transport to unexpected server | Server allowlist/certificate/transport policy blocks connection | P0 / A,C |
| SEC-011 | Compromised MCP server returns hostile content | Treat response as untrusted, validate schema, and never execute returned text | P0 / A,C |
| SEC-012 | Model provider attempts tool use despite tool-free chain | Reject response/call; no tools are bound | P0 / A,C |
| SEC-013 | Dependency introduces a known critical vulnerability | Dependency scan blocks release/update until fixed or formally mitigated | P0 / O |
| SEC-014 | Secrets are committed accidentally | Secret scan blocks CI; rotate exposed secret and purge through approved procedure | P0 / A,O |
| SEC-015 | Drive/Gmail permissions are broader than least privilege | Security review blocks production | P0 / C,O |
| SEC-016 | Unauthorized user triggers manual backfill | Authentication/authorization layer rejects trigger | P0 / I,O |
| SEC-017 | Unauthorized user reads audit artifacts | Filesystem/database access control denies access | P0 / A,O |
| SEC-018 | User tampers with validated artifact before delivery | Content hash/version check fails at outbound node | P0 / I,A |
| SEC-019 | Recipient is injected through review/model output | Recipient comes only from allowlisted configuration; outbound schema ignores model value | P0 / A,U |
| SEC-020 | Model output attempts to change Drive folder/tool mapping | Delivery settings are immutable config, never model-controlled | P0 / A,U |

## 25. Performance, Capacity, and Rate-Limit Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| CAP-001 | Run contains one review | Apply minimum-evidence policy; likely human review | P1 / L,I |
| CAP-002 | Run contains 10,000 reviews | Stream imports and batch analysis within agreed time/memory target | P1 / L |
| CAP-003 | Run exceeds tested capacity | Throttle/queue or stop with capacity error; do not drop records silently | P1 / L,O |
| CAP-004 | One review is extremely long | Enforce field/token policy and retain explicit rejection/truncation metadata | P1 / U,L |
| CAP-005 | Model batches are too large | Dynamic bounded batching prevents context overflow | P1 / L |
| CAP-006 | Model concurrency triggers throttling | Reduce configured concurrency and honor backoff | P1 / L,C |
| CAP-007 | MCP quota is exhausted near completion | Preserve checkpoint/artifacts and retry only pending stage | P1 / C,R |
| CAP-008 | Memory grows with raw file size | Streaming parser/repository prevents full-file retention | P1 / L |
| CAP-009 | Dedup lookup becomes slow | Indexed source keys/fingerprints keep bounded performance | P2 / L |
| CAP-010 | PII detection is the bottleneck | Batch/optimize without bypassing detector | P1 / L |
| CAP-011 | Model cost spikes due to duplicate batches/retries | Persist batch completion and token metrics; cap retries/budget | P1 / L,R |
| CAP-012 | Weekly run exceeds 15-minute target | Complete safely if within operating window; alert and profile bottleneck | P2 / L,O |
| CAP-013 | Run overlaps next scheduled run | Per-product/week lock queues or rejects overlap | P1 / L,R |
| CAP-014 | Logs/audit artifacts consume disk | Enforce rotation/retention without losing required manifests | P1 / L,O |
| CAP-015 | Provider latency is high but successful | Respect total run deadline and checkpoint between batches | P2 / L,R |

## 26. Scheduler, Manual Run, and Backfill Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| SCH-001 | Scheduler runs at wrong machine-local time | Explicit `Asia/Kolkata` configuration determines trigger | P1 / I,O |
| SCH-002 | Schedule fires twice | Stable run key and lock deduplicate trigger | P0 / I,R |
| SCH-003 | Schedule does not fire | Alert on missing expected run; operator uses explicit-date backfill | P1 / O |
| SCH-004 | Manual run omits `reporting_week_end` | Require explicit value for backfill or use documented current-week rule | P1 / U,O |
| SCH-005 | Manual run specifies a future reporting date | Reject unless an explicit test mode permits it | P1 / U |
| SCH-006 | Manual backfill overlaps an existing completed week | Return existing artifacts unless controlled regeneration is requested | P1 / I,O |
| SCH-007 | Operator backfills many weeks at once | Queue sequentially, respect rate limits, and keep distinct run keys | P1 / L,O |
| SCH-008 | Current week is incomplete | Use approved cutoff policy; never label partial coverage as a complete week | P1 / U,O |
| SCH-009 | Schedule changes from Monday to another day | New runs use new policy; historical run boundaries remain fixed | P2 / I,O |
| SCH-010 | Worker starts after long outage | Do not silently combine missed periods; require explicit backfill policy | P1 / O |
| SCH-011 | Backfill uses deleted raw source file | Reacquire approved export or stop; do not synthesize missing inputs | P1 / I,O |
| SCH-012 | Cancel request arrives during MCP side effect | Mark cancellation pending, reconcile tool result, and stop before next side effect | P0 / R,O |

## 27. Human Review and Operational Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| OPS-001 | Run needs review but no reviewer is assigned | Alert/escalate; remain unpublished | P1 / O |
| OPS-002 | Reviewer approves without inspecting evidence | UI/runbook requires evidence acknowledgement; retain audit event | P1 / O |
| OPS-003 | Reviewer edits quote wording | Final exact-match validation blocks approval | P0 / I,O |
| OPS-004 | Reviewer adds PII to content | Final PII scan blocks delivery | P0 / A,O |
| OPS-005 | Reviewer changes recipient/folder ad hoc | Require allowlisted configuration change and fresh preflight | P0 / O |
| OPS-006 | Reviewer requests automatic send | Out of scope; architecture exposes draft only | P0 / O |
| OPS-007 | Operator retries terminal schema/config error repeatedly | System refuses automatic retries until config/version changes | P1 / O,R |
| OPS-008 | Operator deletes/moves generated Doc or draft | Reconciliation/runbook handles it; no blind recreation | P1 / O |
| OPS-009 | Incident requires artifact removal | Follow explicit authorized procedure; never auto-delete material artifacts | P0 / O |
| OPS-010 | Stakeholders disagree with a theme/action | Record feedback, update taxonomy/prompt version, rerun evaluation; do not mutate past audit silently | P2 / O |
| OPS-011 | Run completes but stakeholders cannot access Doc | Fix sharing through approved MCP/admin process before marking accepted | P1 / C,O |
| OPS-012 | Alerting channel is unavailable | Escalate through documented secondary channel; run status remains durable | P2 / O |
| OPS-013 | Operations runbook is outdated after workflow change | Release gate blocks until runbook/recovery rehearsal is updated | P1 / O |
| OPS-014 | Key technical owner is unavailable | Named backup owner follows runbook; no privilege shortcuts | P1 / O |
| OPS-015 | Stakeholder asks for raw reviews in Doc/email | Decline/out of scope; published artifact remains privacy-safe summary only | P0 / O |

## 28. Dependency, Upgrade, and Compatibility Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| DEP-001 | LangChain upgrade changes structured-output behavior | Lockfile/contract tests fail before deployment | P1 / C,I |
| DEP-002 | LangGraph upgrade changes checkpoint serialization | Migration/resume tests block release | P1 / R,C |
| DEP-003 | `langchain-mcp-adapters` upgrade changes tool wrappers | MCP discovery/schema contract tests block release | P1 / C |
| DEP-004 | Pydantic major version changes validation semantics | Schema regression tests block release | P1 / U,I |
| DEP-005 | Model provider SDK conflicts with LangChain version | Dependency resolution and clean-build tests fail | P1 / C |
| DEP-006 | Dependency lockfile is missing/out of date | Build/release gate fails | P1 / O |
| DEP-007 | Provider silently changes model behavior under same alias | Evaluation drift alert; use pinned model/version when available | P1 / C,O |
| DEP-008 | MCP server changes without client dependency change | Preflight and periodic contract tests detect schema/capability drift | P1 / C |
| DEP-009 | Security patch requires urgent upgrade | Run full privacy, schema, graph-resume, and MCP contract suite before release | P0 / O |
| DEP-010 | Development and production Python versions differ | Reproducible build/runtime check blocks deployment | P1 / I,O |
| DEP-011 | Optional tracing library sends data by default after upgrade | Privacy regression test/config blocks tracing and release | P0 / A,O |
| DEP-012 | Database/checkpointer driver behavior changes | Transaction/recovery test matrix blocks deployment | P1 / R,I |

## 29. Release and Rollback Edge Cases

| ID | Scenario | Expected safe behavior | Priority / test |
| --- | --- | --- | --- |
| REL-001 | First pilot succeeds but second fails | Release gate remains closed until two consecutive successes | P1 / O |
| REL-002 | Source counts do not reconcile during pilot | Investigate adapter/window/dedup; no release | P1 / I,O |
| REL-003 | Stakeholders accept quality but privacy test fails | Privacy is blocking; no release | P0 / A,O |
| REL-004 | Privacy is clean but quote exactness fails | No release | P0 / U,O |
| REL-005 | Doc is valid but duplicate drafts appear | Disable schedule, fix idempotency, repeat pilot | P0 / R,O |
| REL-006 | Draft was accidentally sent | P0 incident: disable integration/schedule, investigate permissions, follow incident response | P0 / O |
| REL-007 | New release fails after previous version worked | Stop new schedule, preserve last safe artifact, roll back application version | P1 / O,R |
| REL-008 | Rollback application cannot read newer checkpoint/schema | Use tested backward/migration plan or stop and recover manually | P1 / R,O |
| REL-009 | Rollback would delete external Docs/drafts | Do not delete automatically; require explicit authorized remediation | P0 / O |
| REL-010 | Known P2 issue remains | Document owner, mitigation, acceptance, and follow-up date before release | P2 / O |
| REL-011 | Model/MCP dependency changes during pilot | Restart pilot evidence period after contract/evaluation tests | P1 / C,O |
| REL-012 | Production source differs from tested sample schema | Preflight/adapter contract blocks release/run | P1 / C,I |

## 30. Minimum Automated Edge-Case Suite by Phase

### Phase 0

- All `CFG-*` configuration failures
- Source/provider allowlist and provenance checks from `SRC-*`
- Secret scanning and safe synthetic fixtures
- Dependency clean-install and compatibility smoke test

### Phase 1

- All boundary cases in `PAR-*`, `TIM-*`, `TXT-*`, `PII-*`, and `DED-*`
- Data-threshold cases in `DAT-*`
- Database transaction and import replay cases in `DB-*`

### Phase 2

- Structured-output and provider failures in `LLM-*`
- Theme invariants and ranking ties in `THM-*`
- Exact, anonymous quote behavior in `QTE-*`
- Grounded action behavior in `ACT-*`
- Word-count and outbound-schema behavior in `PLS-*`
- Prompt-injection cases in `SEC-*` that target the analysis chain

### Phase 3

- All graph replay and routing cases in `GRF-*`
- All MCP discovery/allowlist cases in `MCP-*`
- Docs and Gmail contract/reconciliation cases in `DOC-*` and `GML-*`
- Concurrency and duplicate-side-effect cases in `IDE-*`

### Phase 4 and Release

- Persistence recovery and retention cases in `DB-*`
- Logging/tracing leak cases in `OBS-*`
- Capacity and throttling cases in `CAP-*`
- Scheduling/backfill cases in `SCH-*`
- Operational, upgrade, pilot, and rollback cases in `OPS-*`, `DEP-*`, and `REL-*`

## 31. Release-Blocking Edge-Case Checklist

Before production release, confirm:

- [ ] Every P0 case has an automated test where technically possible.
- [ ] Manual P0 operational cases have a rehearsed runbook step and named owner.
- [ ] No approved test can make analysis chains call an external tool.
- [ ] No Gmail send tool is discoverable through the application allowlist.
- [ ] PII tests cover titles, bodies, metadata, errors, logs, traces, Docs, drafts, and backups.
- [ ] Quotes fail on changed case, punctuation, translation, redaction, ellipsis, or unknown provenance.
- [ ] Exactly-250 and 251-word cases behave correctly.
- [ ] Eight- and twelve-week boundaries, leap dates, year changes, and IST conversion are tested.
- [ ] Duplicate triggers, lost MCP responses, process crashes, stale locks, and checkpoint replay create no duplicate artifacts.
- [ ] Docs and Gmail contract tests run against non-production connected accounts.
- [ ] Two consecutive pilot weeks pass all invariants.

## 32. Edge-Case Definition of Done

This catalog is implemented when:

- Every row is linked to a test case, operational control, or explicitly accepted residual risk.
- All P0 tests pass and no P0 risk is accepted without formal security/product approval.
- P1 failures produce one of the documented safe states with actionable diagnostics.
- P2 exceptions are documented with an owner and follow-up decision.
- Test fixtures contain no real personal data or credentials.
- Edge-case tests run in CI at the frequency defined in [implementation-plan.md](./implementation-plan.md).
- MCP contract, failure-recovery, load, and pilot tests produce retained sanitized evidence.
- The catalog is reviewed whenever source formats, privacy policy, LangChain/LangGraph packages, model provider, MCP tools, persistence, or delivery behavior changes.
