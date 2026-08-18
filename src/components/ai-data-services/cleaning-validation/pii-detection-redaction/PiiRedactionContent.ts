export const piiOffers = [
  "PII Discovery and Classification", "Text Redaction", "Face and Licence Plate Blurring", "Video Redaction with Frame Persistence", "Audio Identifier Redaction", "Document Redaction and Text Layer Removal", "Metadata Stripping", "Quasi-Identifier and Re-identification Risk Assessment", "Pseudonymisation", "Tokenisation", "Redaction Verification and Recall Measurement",
] as const;

export const piiFaqs = [
  ["What is PII detection and redaction?", "Finding personal data in a dataset and removing, masking or replacing it so the data can be used, shared or trained on without exposing the individuals in it. Detection is the hard half—redacting a value already found is straightforward; finding every value worth redacting in unstructured data is the actual work."],
  ["Can you remove 100% of personal data?", "No, and neither can anyone else. No detection process finds every identifier in unstructured content. We measure recall against a human-verified reference set, tune toward catching everything, verify independently, attempt re-identification adversarially and state the residual risk honestly."],
  ["What are quasi-identifiers?", "Values that identify nobody alone and can identify people in combination—postcode, date of birth, gender, job title, employer, admission date, rare medical condition or precise location. Removing direct identifiers alone is not anonymisation."],
  ["How do you handle quasi-identifiers?", "We assess combination uniqueness, rare values, free-text leakage and cross-record linkage. Mitigations can include generalisation, suppression, aggregation and noise addition. Each can reduce analytical utility, so we report the trade-off rather than choosing it for you."],
  ["Why does redacted PDF text sometimes still appear?", "Drawing a filled rectangle over text may hide it visually while leaving the text selectable and extractable underneath. True redaction removes the content, and we run a text-layer extraction test on redacted documents."],
  ["Do you handle image and file metadata?", "Yes. EXIF may carry GPS coordinates, device identifiers and timestamps after visible content is blurred. Document properties may carry author, organisation and revision history. Both are checked and stripped under the agreed policy."],
  ["Can you redact faces in video?", "Yes, tracked across frames so a face redacted while visible stays redacted after occlusion and re-entry. Verification samples the sequence rather than checking only the frames where redaction was applied."],
  ["Is redacting spoken names enough for audio?", "No. Voice is biometric data in its own right, so removing spoken identifiers can leave the voiceprint intact. Voice transformation, synthetic replacement or restricted use may be required depending on the use case."],
  ["What is the difference between masking, pseudonymisation and anonymisation?", "Masking replaces a value with a placeholder. Pseudonymisation replaces it with a consistent surrogate and may be reversible with a mapping. Under most regimes pseudonymised data remains personal data. Anonymisation is a higher bar and also depends on quasi-identifiers and re-identification risk."],
  ["Do you handle Indian names and identifiers?", "Yes. We account for Indian name distributions, script and transliteration variation, name-word ambiguity, Indian address formats and identifier patterns such as Aadhaar, PAN, voter ID and GSTIN, with native-speaker review across Indian regional languages."],
  ["How do you verify that redaction worked?", "We use recall measured against a human-verified reference set, independent second-pass review, an adversarial re-identification attempt, metadata sweeps, text-layer extraction tests, video frame sampling and an explicit residual risk statement."],
  ["Will this make us GDPR or DPDP compliant?", "No single processing step makes an organisation compliant. Compliance depends on lawful basis, notices, contracts, retention, access control and downstream use. We provide controlled processing, documented methodology and evidence; the legal determination remains your counsel's."],
  ["Can you work inside our environment?", "Yes. For regulated or highly sensitive data, processing can run inside your controlled environment or over client VPN, with nothing leaving your perimeter."],
  ["Who has access to our data during the engagement?", "Named, vetted reviewers under NDA with role-based access limited to their task and a full audit trail. A Data Processing Agreement is put in place before data transfer where required by the engagement."],
  ["How much does PII redaction cost?", "Cost depends on modality, volume, PII density, quasi-identifier analysis, verification intensity, language and script coverage, redaction method, security tier and turnaround. A discovery assessment establishes what is present before full processing is scoped."],
] as const;

export const piiModalities = [
  ["Text", "Names, contacts, identifiers, addresses, account numbers and quasi-identifiers inside narrative text"],
  ["Images", "Faces, plates, ID regions, badges, screens, house numbers and distinctive marks—plus EXIF metadata"],
  ["Video", "Visual identifiers tracked across frames, occlusion and re-entry"],
  ["Audio", "Spoken identifiers and the voice itself as biometric data"],
  ["Documents", "Visible content, embedded text layers, signatures, annotations, headers, footers and properties"],
  ["Structured data", "Direct identifier fields, free-text leakage and identifying combinations across columns"],
  ["Code and logs", "Credentials, keys, tokens, internal identifiers and personal information captured in output"],
] as const;

export const redactionMethods = [
  ["Removal", "Delete the value entirely", "No", "The field has no analytical value and removal is acceptable"],
  ["Masking", "Replace it with a typed placeholder", "No", "The dataset must retain that a value existed, but not the value"],
  ["Pseudonymisation", "Use a consistent surrogate across records", "With the mapping", "Relationships must remain available across records or batches"],
  ["Tokenisation", "Store the original separately and replace it with a token", "With authorised access", "Controlled production retrieval of the original is required"],
] as const;

export const piiProcess = [
  ["01", "Scope & definition", "Agree what counts as personal data and the intended use."],
  ["02", "Discovery scan", "Measure what is present across fields and modalities."],
  ["03", "Quasi-ID assessment", "Test combination uniqueness and re-identification risk."],
  ["04", "Method selection", "Choose removal, masking, pseudonymisation or tokenisation."],
  ["05", "Pilot batch", "Review what was caught and missed; tune toward recall."],
  ["06", "Full processing", "Process at scale with category counts and audit trails."],
  ["07", "Verify & report", "Independently test output and state residual risk."],
] as const;
