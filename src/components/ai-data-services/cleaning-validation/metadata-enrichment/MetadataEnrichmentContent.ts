export const metadataOffers = [
  "Language and Locale Tagging",
  "Domain and Topic Classification",
  "Quality Scoring and Tiering",
  "Source Provenance Capture",
  "Data Lineage Tracking",
  "Entity Resolution and Record Linkage",
  "Taxonomy Design",
  "Taxonomy Mapping and Migration",
  "Controlled Vocabulary Management",
  "Attribute Completion",
  "Geographic and Temporal Normalisation",
] as const;

export const metadataLayers = [
  ["Language and locale", "Document- or segment-level ISO language codes, script, regional variant, code-mixed and romanised status."],
  ["Domain and topic", "Single-label, multi-label or hierarchical classification against your actual content taxonomy."],
  ["Quality and tier", "Completeness, readability, information density, source reliability and structural integrity."],
  ["Source provenance", "Origin, collection method, date, licence or consent status, supplier and contract reference."],
  ["Lineage", "Every transformation, its order, version, reason and relationship to the original item."],
  ["Technical properties", "Format, encoding, size, duration, resolution, checksum and schema version."],
  ["Entity references", "Canonical entity IDs that connect different records without deleting or merging them."],
  ["Time and geography", "Normalised values with source timezone and privacy-appropriate location granularity preserved."],
  ["Custom attributes", "Fields your pipeline needs to filter, route, weight, select or audit on."],
] as const;

export const enrichmentProcess = [
  ["01", "Current-state assessment", "Measure what exists, what is missing and what source systems can still recover."],
  ["02", "Schema design", "Design fields from the decisions you need to make later—not only what is easy to capture."],
  ["03", "Taxonomy design or mapping", "Build or reconcile the classification scheme against real content."],
  ["04", "Rules and models", "Automate reliable fields; set confidence thresholds and human-review routes."],
  ["05", "Pilot batch", "Apply the schema, inspect consistency and revise it from what the sample exposes."],
  ["06", "Production enrichment", "Process at scale with field-level confidence and exception review."],
  ["07", "Delivery", "Return enriched data, documentation, crosswalks, reports and reusable rules."],
] as const;

export const metadataFaqs = [
  ["What is metadata enrichment?", "Adding structured, machine-readable information about each item in a dataset—language, domain, quality tier, source, lineage, entity references and custom attributes—so the data can be found, filtered, weighted and audited."],
  ["What is the difference between metadata and annotation?", "Metadata describes the item; annotation labels the content for a model to learn from. Tagging a document as Hindi, legal-domain, high-quality and source-documented is metadata. Marking which words inside it are party names is annotation."],
  ["Why does metadata matter for training data?", "A dataset with no metadata has one usable configuration: all of it. Tags enable domain weighting, quality-tiered training, curriculum ordering, filtered fine-tuning, ablation studies, language-targeted runs, clean holdouts and selective source removal."],
  ["What is entity resolution and how is it different from deduplication?", "Deduplication finds copies and removes extras. Entity resolution finds legitimately different records that describe the same real-world entity and links them while keeping every record."],
  ["How do you handle uncertain entity matches?", "We combine deterministic identifiers, probabilistic field weighting, script-appropriate fuzzy and phonetic matching, and human adjudication for the uncertain middle. Confidence is reported for every link."],
  ["Can you design a taxonomy for us?", "Yes. Categories are grounded in your content, mutually exclusive where appropriate, exhaustive with a legitimate other option, tested for consistent application and sized so each category remains meaningful."],
  ["Can you map between two existing taxonomies?", "Yes. Because mapping is rarely one-to-one, the crosswalk explicitly records splits, merges, missing destinations, ambiguous cases and the rule applied to each."],
  ["What is data lineage?", "The record of what happened to each item: every transformation and its order, applied rules, removals, version history and the relationship between source and derived datasets."],
  ["Can you reconstruct provenance for an existing dataset?", "Partially and honestly. We recover what source systems, file properties, processing logs and internal records support, and clearly state where the evidence ends."],
  ["Do you report how confident the metadata is?", "Yes, per field. Inferred, deterministic and human-verified values remain distinguishable so downstream users do not assume more certainty than exists."],
  ["Do you handle non-English content?", "Yes, across 30+ global languages with native-speaker review and comprehensive Indian regional-language depth, including code-mixed, romanised and cross-script entity variants."],
  ["Can metadata create privacy risk?", "Yes. Precise location and exact timestamps can be quasi-identifiers. We generalise them to the granularity your risk posture requires and assess that interaction during scoping."],
  ["How is metadata delivered?", "Embedded in JSON, JSONL or Parquet; as sidecar files; in a keyed metadata table; loaded into a database or catalogue; in standards such as Dublin Core or schema.org where relevant; or in a custom schema."],
  ["How much does enrichment cost?", "Cost depends on field count, automation share, taxonomy complexity, entity-resolution volume, confidence threshold, language coverage, domain expertise, provenance depth, volume and turnaround."],
  ["How do we start?", "Start with a metadata assessment. We report what exists, what is missing, what source systems can still recover and what the enriched fields would make possible."],
] as const;
