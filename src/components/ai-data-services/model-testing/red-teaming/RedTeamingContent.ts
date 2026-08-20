export const redTeamFaqs = [
  ["What is AI red teaming?", "Structured adversarial testing of an AI system by trained people who deliberately try to make it produce output it shouldn't, take actions it shouldn't, or reveal information it shouldn't. The deliverable is a set of reproducible attacks — each with exact reproduction steps, a severity rating and an impact assessment — not a score or a pass mark."],
  ["How is this different from a penetration test?", "A penetration test attacks infrastructure: networks, hosts, APIs, authentication and code execution. AI red teaming attacks model and system behaviour: guardrails, prompts, retrieval, memory and tool use. They are complementary and usually run by different teams. eQOURSE does not perform infrastructure penetration testing; where a behavioural finding opens onto an infrastructure issue, we report it and hand it over."],
  ["Can't we just use an automated red teaming tool?", "Use one — for regression coverage in your pipeline. But an automated scanner fires templates, and a template can only contain attacks somebody has already documented. It will not find a novel failure specific to your system, and it is weak at multi-turn attacks, which is where models most often break. The sensible programme runs scanners continuously and human red teams at milestones."],
  ["Which frameworks do you map findings to?", "OWASP Top 10 for LLM Applications (2025), OWASP Top 10 for Agentic Applications (2026), and the NIST AI Risk Management Framework functions. Where you are working toward ISO/IEC 42001, our method statement and evidence pack are structured to serve as measurement evidence for the management system."],
  ["Do you test agentic systems?", "Yes, and the method differs. Agentic systems add goal hijacking, tool misuse, memory and context poisoning, insecure inter-agent communication and cascading failure — none of which single-session chatbot testing reaches. We test across sessions deliberately, because a poisoned memory planted today can fire next week for a different user."],
  ["Why does language matter for red teaming?", "Safety training is not distributed evenly across languages, so an attack that fails in English can succeed in another language. Published 2026 research found that automated translated attack sets achieved a 59.8% mean jailbreak rate, rising to 75.8% when native-speaking human red teamers were involved — and concluded that translation quality is the critical determinant of success. In testing terms, that means a machine-translated attack set under-reports your risk. We author attack sets natively in every language in scope."],
  ["How long does an engagement take?", "A first engagement against a single system in two or three languages typically runs 6–7 weeks, including a week of scoping and threat modelling. Add roughly a week per additional language. Retests after remediation run 1–2 weeks."],
  ["Do you test in production?", "By default, no. We work in staging with production-like configuration. If production testing is genuinely necessary, it is scoped separately with written authorisation and explicit acceptance of the risk."],
  ["What happens if you find something critical?", "Critical findings are escalated within 24 hours of confirmation, through the escalation path agreed in the rules of engagement. They do not wait for the report."],
  ["Who owns the attack set afterwards?", "You do. It is delivered with the report so you can add it to your own regression suite and re-run it yourself. We retain nothing outside the restricted environment, and everything is destroyed on the agreed schedule."],
] as const;

export const llmRisks = [
  ["LLM01", "Prompt Injection", "Direct and indirect injection, including payloads planted in retrieved documents, uploaded files and tool responses"],
  ["LLM02", "Sensitive Information Disclosure", "Elicitation of training data, customer records and credentials through indirect questioning and multi-turn pressure"],
  ["LLM03", "Supply Chain", "Reviewed at scope stage; findings reported, remediation belongs to the platform team"],
  ["LLM04", "Data & Model Poisoning", "Probing for poisoned-behaviour signatures, paired with upstream dataset QA where needed"],
  ["LLM05", "Improper Output Handling", "Output crafted to exploit downstream renderers and interpreters — markup, script and SQL-shaped strings"],
  ["LLM06", "Excessive Agency", "Attempts to induce actions beyond the intended scope of the assistant's permissions"],
  ["LLM07", "System Prompt Leakage", "Extraction of system instructions, guardrail text and hidden context"],
  ["LLM08", "Vector & Embedding Weaknesses", "RAG attacks including retrieval manipulation, cross-tenant leakage and embedding-space probing"],
  ["LLM09", "Misinformation", "Confident-but-wrong output under adversarial framing and authority-spoofing prompts"],
  ["LLM10", "Unbounded Consumption", "Resource-exhaustion prompting and cost-amplification patterns"],
] as const;

export const agenticRisks = [
  ["ASI01", "Agent Goal Hijack", "Redirecting the agent's objective mid-task through injected content or conversational pressure"],
  ["ASI02", "Tool Misuse & Exploitation", "Inducing the agent to call tools with parameters it should refuse"],
  ["ASI03", "Identity & Privilege Abuse", "Attempting actions under borrowed or escalated identity"],
  ["ASI04", "Agentic Supply Chain", "Probing third-party tools, plugins and connectors in the agent's chain"],
  ["ASI05", "Unexpected Code Execution", "Behavioural probing only; real RCE paths are stopped, reported and escalated"],
  ["ASI06", "Memory & Context Poisoning", "Planting persistent content that changes behaviour in later, unrelated sessions"],
  ["ASI07", "Insecure Inter-Agent Communication", "Testing trust assumptions between agents in a multi-agent system"],
  ["ASI08", "Cascading Failures", "Tracing how one bad output propagates through dependent steps"],
  ["ASI09", "Human-Agent Trust Exploitation", "Testing whether the agent can manipulate the human in the loop"],
  ["ASI10", "Rogue Agents", "Persistence, self-modification and out-of-scope operation testing"],
] as const;

export const attackCategories = [
  ["Jailbreaks & guardrail bypass", "Role-play framing, hypothetical nesting, encoding tricks, incremental escalation and persona persistence."],
  ["Direct & indirect prompt injection", "Payloads planted in documents, web pages, uploads, email bodies and tool responses."],
  ["Multi-turn drift & pressure", "Sustained conversations that expose turn-eleven compliance missed by single-shot tests."],
  ["Data & memory exfiltration", "Training-data extraction, system-prompt leakage and cross-session or cross-tenant bleed."],
  ["RAG & retrieval attacks", "Corpus poisoning, retrieval manipulation and access to documents the user should not reach."],
  ["Agentic tool misuse", "Real tool calls with harmful parameters and attempts to talk around confirmation controls."],
  ["Harmful content elicitation", "Sustained pressure across every relevant policy category and every language served."],
  ["Overreliance & misinformation", "Confident false output, fabricated citations and spoofed authority with downstream impact."],
  ["Availability & cost attacks", "Prompts engineered to maximise token consumption, latency or tool-call volume."],
] as const;

export const engagementSteps = [
  ["01", "Scope & authorisation", "Week 1", "Name systems, environment, harm categories, frameworks, exclusions and escalation paths in signed rules of engagement."],
  ["02", "Threat modelling", "Week 1–2", "Study prompts, policy, tools and retrieval, then prioritise hypotheses about where the complete system is likely to break."],
  ["03", "Attack-set construction", "Week 2–3", "Adapt known families and author novel constructions natively in every in-scope language."],
  ["04", "Adversarial sessions", "Week 3–5", "Run logged, multi-turn sessions and immediately repeat successful attacks for reproducibility."],
  ["05", "Triage & write-up", "Week 5–6", "Assign severity, reproduction confidence, framework mapping and impact; escalate critical findings immediately."],
  ["06", "Report & retest", "Week 6–7", "Deliver the evidence pack and walkthrough; retest the same finding set after remediation when commissioned."],
] as const;

export const severityRows = [
  ["Critical", "Reproducible data exposure, unauthorised action or highest-severity harm with low attacker effort", "Escalated within 24 hours"],
  ["High", "Reproducible significant policy violation or meaningful disclosure with moderate effort", "Escalated within reporting week"],
  ["Medium", "Reproducible but sustained effort or unusual conditions; bounded impact", "Ranked in report"],
  ["Low", "Inconsistent, high-effort or minimal real impact", "Grouped in report"],
  ["Informational", "A guardrail inconsistency or unclear refusal that is worth recording but is not a failure", "Appendix"],
] as const;

export const deliverables = [
  ["Findings report", "Confirmed attacks with exact reproduction steps, severity, confidence and impact."],
  ["Coverage matrix", "OWASP LLM, OWASP Agentic and NIST AI RMF coverage—including what was not tested and why."],
  ["Full transcripts", "Complete adversarial session logs, not selective excerpts."],
  ["Attack set", "Delivered to you for regression testing in your own pipeline."],
  ["Remediation priorities", "What to fix first and which findings share a root cause."],
  ["Executive summary", "A one-page decision view that does not overstate safety."],
  ["Live walkthrough", "ML and security teams in the same evidence session."],
  ["Optional retest", "The same finding set rerun after remediation, scoped separately."],
] as const;

export const redTeamFailures = [
  ["Single-turn only", "Turn-eleven compliance is never found", "Multi-turn is the default method"],
  ["Translated attack sets", "Bad phrasing under-reports risk", "Native authoring in each language"],
  ["No reproduction check", "Engineering discounts one-off findings", "Re-run every finding; report n/N"],
  ["Model-only scope", "RAG, tools and memory failures stay hidden", "Test the deployed system surface"],
  ["English-only", "Other-language guardrail gaps remain invisible", "Agree language scope up front"],
  ["No severity", "A long list gives engineering no priority", "Rate impact × effort and rank"],
  ["Scanner relabelled as a red team", "Known templates are presented as novel discovery", "Attribute each finding to its method"],
  ["No wellbeing controls", "Exposure harms people and quality collapses", "Exposure limits and rotation"],
  ["No negative space", "Untested areas look safe", "State gaps and unsuccessful probes"],
] as const;

export const boundaries = [
  ["No infrastructure penetration testing", "We attack model and system behaviour—not networks, hosts, authentication or code execution. Infrastructure findings are stopped and handed to your security team or pentest vendor."],
  ["Written authorisation is mandatory", "No engagement begins without signed rules naming the systems, environment, harm categories and exclusions."],
  ["Production is not the default", "We prefer staging with production-like configuration. Production testing requires a separate scope and written risk acceptance."],
  ["No CSAM generation or seeking", "Child-safety guardrail testing is routed only through legally authorised specialist channels; we refer rather than take it."],
  ["No safety certification", "We report what we found and what we tested. Absence of a finding within scope is not evidence of safety."],
  ["No publication or indefinite retention", "Findings remain restricted, are delivered to you and are destroyed on the agreed schedule. No case study without written consent."],
] as const;

export const engagementModels = [
  ["Pre-launch assurance", "6–7 weeks", "A full human-led engagement before a model or capability ships."],
  ["Capability-change engagement", "3–4 weeks", "Targeted testing when tools, memory, retrieval or a new language changes the surface."],
  ["Continuous programme", "Quarterly", "Human engagements against an evolving system; each attack set expands your regression suite."],
] as const;
