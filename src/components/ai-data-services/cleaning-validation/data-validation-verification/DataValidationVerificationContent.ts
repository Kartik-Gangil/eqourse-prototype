export const verificationOffers = [
  "Record Verification",
  "Attribute and Field Verification",
  "Business and Organisation Verification",
  "Contact and Address Verification",
  "Document-Backed Verification",
  "Claim and Fact Verification",
  "Cross-Reference and Multi-Source Matching",
  "Plausibility and Consistency Review",
  "Domain-Expert Verification",
  "Scheduled Re-Verification",
] as const;

export const verificationTypes = [
  ["Record verification", "Whole records checked for existence, currency and correctness against an agreed system of record."],
  ["Attribute and field verification", "Each field is checked against the source appropriate to that attribute and its consequence."],
  ["Business and organisation", "Legal entity, registration, address, operating status, sector and trading names."],
  ["Contact and address", "Postal currency, deliverability and permitted association checks for phone or email."],
  ["Document-backed verification", "Claims checked against current certificates, licences, registrations and statements."],
  ["Claim and fact verification", "Specifications, regulatory status, figures, qualifications and technical claims."],
  ["Multi-source matching", "Independent sources compared with agreement, dependence and conflict all reported."],
  ["Plausibility review", "Contextual review where no source of truth exists—clearly labelled as review, not verification."],
] as const;

export const verificationProcess = [
  ["01", "Consequence scoping", "Decide what happens if each field is wrong; sort into verify, sample or leave."],
  ["02", "Source of truth", "Agree the authoritative source per field, its limits, currency and permitted access."],
  ["03", "Conflict hierarchy", "Define which source takes precedence before reviewers encounter disagreement."],
  ["04", "Pilot batch", "Measure verification, conflict and unverifiable rates; revise sources and rules."],
  ["05", "Production", "Verify at scale while tracking status and confidence at field level."],
  ["06", "Adjudication", "Senior reviewers resolve cases the hierarchy cannot settle and update the protocol."],
  ["07", "Delivery", "Return verified data, evidence, conflicts, unresolved items and refresh guidance."],
] as const;

export const verificationFaqs = [
  ["What is data verification?", "Data verification checks whether data is actually true by comparing it with an authoritative external source. It differs from cleaning, which makes data well-formed, and validation, which checks internal plausibility and rules."],
  ["What is the difference between data validation and verification?", "Validation asks whether a value is plausible and conforms to a schema. Verification asks whether it is actually correct by checking an external source. A well-formatted email can pass validation and still fail verification."],
  ["What is a source of truth and why does it matter?", "It is the agreed authoritative reference for a field. Different fields often need different sources, and where no authoritative source exists we report plausibility review rather than pretending verification was possible."],
  ["What happens when two sources disagree?", "The disagreement is recorded. A field-level source hierarchy is agreed before production, senior reviewers adjudicate unresolved cases, legitimate multiple values may be retained and conflict rate is reported by field."],
  ["Do you verify every record?", "Usually not. We triage by consequence: high-impact values may be verified thoroughly, analytical fields may be sampled, and low-consequence structural fields can remain within cleaning and validation."],
  ["What does unverifiable mean?", "No available source could confirm or contradict the value. It is not the same as wrong, and it is delivered as its own status rather than hidden inside a generic failure state."],
  ["How long does verification last?", "Not indefinitely. Contact details and roles change faster than registration details, while licences can change at expiry. We measure decay on your data and recommend a cadence per field type."],
  ["Can you verify specialist or technical claims?", "Yes, where the capability and sources are agreed. Qualified reviewers can support medical and life sciences, legal and regulatory, finance, technical and engineering, education and scientific claims."],
  ["Do you handle non-English and regional sources?", "Yes. Programmes support 30+ global languages with comprehensive Indian regional-language depth, plus native-language source review, transliteration matching and jurisdiction-aware identifier formats."],
  ["What status values do you deliver?", "Six: verified, verified with conflict, contradicted, unverifiable, not attempted and plausibility-reviewed only. Verified values carry their source and verification date."],
  ["Do you correct data or just report it?", "Either, as agreed at scoping. When corrections are in scope, the original value and the evidence behind the change remain in the audit log."],
  ["Is this the same as fact-checking a model output?", "No. This service verifies input records and claims against external reality. Evaluating the factuality of generated model output is a separate LLM evaluation workflow."],
  ["How much does verification cost?", "Pricing depends on fields per record, source accessibility, cross-reference depth, conflict rate, expert review, languages, jurisdictions, sample versus census, correction scope, security and turnaround."],
  ["How do we start?", "Start with a representative verification sample. It reveals the real accuracy, conflict and unverifiable rates before production scope is fixed."],
] as const;
