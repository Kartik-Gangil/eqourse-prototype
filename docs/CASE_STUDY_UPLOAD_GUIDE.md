# eQOURSE Case Study Upload Guide — Admin Panel Reference

> Upload all 14 case studies at: localhost:8080/admin/case-studies/new
> Once published, backend data replaces the static fallback.
> Upload all 14 in one session to avoid gaps in the listing.

---

## CODE FIX APPLIED (read first)

Bug fixed in CaseStudyPage.tsx: the Client field now also provides the Region chip on every card.

Use this format in the Client field:

    Region | Client description

Examples:
- India | Pan-India Schools
- Global | Confidential AI Lab
- UAE | Educational Institution

Text before pipe = Region chip on card.
Text after pipe = Internal reference only.

---

## Admin Panel Fields

| Field | Notes |
|---|---|
| Title | Headline on card and modal |
| Slug | Auto-generated from title. URL: /case-studies/your-slug |
| Client | Use format: Region | Client description |
| Industry | Second chip on card (text before slash) |
| Summary | 1-2 sentences. Card body text (3-line clamp) |
| Challenge | Problem Statement in modal (Markdown OK) |
| Solution | Solution section in modal (Markdown OK) |
| Results | Impact box in modal (Markdown OK) |
| Hero Image | REQUIRED. Card header + modal background. 1200x675px PNG/JPG/WEBP max 5MB |
| Key Metrics | Label + Value pairs. First metric = highlighted card stat |
| Tags | Comma-separated. "AI Data Services" = navy theme + AI filter tab |
| Services Used | Checkboxes for internal SEO service page links |
| Custom Links | Any link not in the predefined list |
| Meta title | Target: 50-60 characters |
| Meta description | Target: 140-160 characters |
| Status | Must be Published to appear publicly |

---

## CATEGORY LOGIC

Tags includes "AI Data Services" --> Navy/Cyan card --> AI Data Services filter tab
Tags does NOT include "AI Data Services" --> Teal/Green card --> Content Service filter tab

---

## HOW FIELDS MAP TO WHAT YOU SEE

Admin Field --> Frontend Location
- Title --> Card headline and Modal title
- Client (before |) --> Region chip on card
- Industry (before /) --> Industry chip on card
- Summary --> Card body text
- Hero Image --> Card header image and modal background
- Metrics[0].value --> Highlighted stat on card
- Metrics[0].label --> Label under stat
- All Metrics --> Key Results grid in modal
- Challenge --> Problem Statement in modal
- Solution --> Solution section in modal
- Results --> Impact box in modal
- Services Used / Links --> Services Used sidebar in modal
- Tags --> Colour theme and filter category
- Meta title/description --> HTML head SEO tags

---

# CONTENT SERVICE CASE STUDIES (8 studies)

---

## CS-1: K-12 Worksheets and PPT Solutions for 2,000+ Schools

| Field | Value |
|---|---|
| Title | K-12 Worksheets and PPT Solutions for 2,000+ Schools |
| Slug | k-12-worksheets-ppt-solutions-for-2000-schools |
| Client | India | Pan-India Multi-State Board Partner |
| Industry | K-12 Education |
| Summary | High-level worksheets and PPT solutions for 2,000+ schools across multiple state boards, classes 1-10. |
| Hero Image | Classroom with students and teacher. Warm educational feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A company associated with 2,000+ schools across India approached us to develop high-level Worksheets and PPT-Based Solutions for classes 1 to 10. Challenges: Maintaining consistency across CBSE, ICSE, and State Board syllabi. Ensuring content exceeded NCERT+ level while remaining age-appropriate. Delivering at volume without compromising pedagogical quality.

Solution:
We created multiple high-level worksheets each containing 30 questions exceeding NCERT+ level, challenging problem-solving ability and encouraging critical thinking. We also created detailed solutions for complete textbook exercises in PPT format for different state boards - structured to be crisp, visual, and teacher-friendly. Our curriculum specialists and SMEs quality-reviewed every worksheet before delivery.

Results:
Key outcomes: Students showed measurable improvement in academic performance. We became a trusted long-term partner for supplying quality worksheets at scale. PPT-based solutions significantly reduced teacher lesson preparation time. The crisp PPT format helped students cope with online classes efficiently. Engagement led to an ongoing supply relationship covering new academic years.

Key Metrics:
- Schools Served | 2,000+
- Classes Covered | 1-10
- State Boards | Multiple
- Content Level | NCERT+

Tags: content-services, k12, worksheets, curriculum, india
Services Used (check): Custom E-Learning Content, Content Services Overview
Meta title: K-12 Worksheets and PPT Solutions for 2,000+ Schools | eQOURSE
Meta description: How eQOURSE delivered NCERT+ level worksheets and PPT solutions for 2,000+ schools across multiple Indian state boards, classes 1-10.

---

## CS-2: Multilingual Pen-Tab Videos and Worksheets in 6 Languages

| Field | Value |
|---|---|
| Title | Multilingual Pen-Tab Videos and Worksheets in 6 Languages |
| Slug | multilingual-pen-tab-videos-worksheets-6-languages |
| Client | India | NGO-Backed Content Services Startup |
| Industry | NGO / Content Services |
| Summary | Pen-tab videos and worksheets in 6 Indian languages for an NGO-backed content services startup, delivered before deadline. |
| Hero Image | Team collaborating, hands on table. Diverse educational feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
An NGO-based content services startup wanted engaging Pen-Tab Videos and Worksheets for classes 5th to 9th in 6 languages: Kannada, Telugu, Tamil, Marathi, Hindi, and English. The challenge was not just translation but culturally appropriate content delivered by native-language SMEs within a tight timeline.

Solution:
We created engaging curriculum-aligned videos in all 6 languages by assembling 30+ subject matter experts from across India. SME Collaboration: Experts from each language region brainstormed together. Content Design: Each video scripted to be simple, engaging, designed for retention. Production: Pen-tab recording with professional narration in each language. Worksheet Alignment: Worksheets paired with each video for reinforcement.

Results:
We delivered all content before the agreed deadline. Key outcomes: 6 languages delivered with native-speaker quality. Content reached students across multiple Indian states simultaneously. Early delivery gave client extra time to onboard schools and prepare teachers. Delivered within NGO budget constraints. Client cited content quality and SME depth as key differentiators vs other vendors.

Key Metrics:
- Languages Delivered | 6
- SMEs Deployed | 30+
- Classes Covered | 5-9
- Delivery | Before Deadline

Tags: content-services, localization, multilingual, video, pen-tab, india
Services Used (check): E-Learning Video Solutions, Localization Services
Meta title: Multilingual Pen-Tab Videos and Worksheets in 6 Indian Languages | eQOURSE
Meta description: How eQOURSE produced pen-tab videos and worksheets in Kannada, Telugu, Tamil, Marathi, Hindi, and English for an NGO-backed startup - delivered early.

---

## CS-3: Full Curriculum Content for African Content Services Startup

| Field | Value |
|---|---|
| Title | Full Curriculum Content for African Content Services Startup |
| Slug | full-curriculum-content-african-content-services-startup |
| Client | Africa | Content Services Startup (Confidential) |
| Industry | Content Services |
| Summary | Complete middle and high school curriculum content for an African content services startup, delivered 2 months ahead of the 8-month deadline. |
| Hero Image | University/school setting, classroom, teacher at board. 1200x675px. |
| Status | PUBLISH |

Challenge:
In 2020, an African Content Services Startup needed full curriculum content for Middle School (JSS1-JSS3) and High School (SSS1-SSS3), aligned to their curriculum and uploaded via their CMS, within 8 months. The scale required significant SME coordination across multiple disciplines.

Solution:
We assembled 40+ subject matter experts and academic content creators. Process: Curriculum Mapping. Theory Development for every chapter across 6 grade levels. SME Brainstorming Sessions for accuracy and quality. Practice Question Creation. CMS Integration. Multi-tier QA Review by senior academic editors.

Results:
Delivered in 6 months - 2 months ahead of the 8-month deadline. Key outcomes: Simple theory and challenging questions were extremely well received. The startup customer base grew. Early delivery gave client critical time to plan dissemination. Established eQOURSE as trusted partner for large-scale curriculum development in emerging markets.

Key Metrics:
- SMEs Deployed | 40+
- Grade Levels | 6
- Early Delivery | 2 months
- Curriculum | Full Suite

Tags: content-services, curriculum, k12, africa, sme
Services Used (check): Custom E-Learning Content, Content Services Overview, Subject Matter Experts
Meta title: Full Curriculum Content for African Content Services Startup | eQOURSE
Meta description: How eQOURSE delivered complete JSS and SSS curriculum for an African startup - 40+ SMEs, 6 grade levels, delivered 2 months ahead of schedule.

---

## CS-4: AI + Human QA: 10,000+ Fact-Checked Solutions Daily

| Field | Value |
|---|---|
| Title | AI + Human QA: 10,000+ Fact-Checked Solutions Daily |
| Slug | ai-human-qa-10000-fact-checked-solutions-daily |
| Client | Global | AI-Powered Education Platform |
| Industry | Content Services / AI |
| Summary | AI + human QA pipeline delivering 10,000+ fact-checked educational solutions daily for a global AI-powered education platform, serving 10+ institutions. |
| Hero Image | People collaborating at computers. Modern tech office. AI/education feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
AI-generated educational responses created a credibility problem. Issues: accuracy (hallucinations), plagiarism risks, authenticity concerns, and scale (10,000+ solutions per day needed). The client needed AI speed combined with human expert credibility.

Solution:
We developed an AI + Human QA hybrid pipeline: AI Response Generation at scale. Expert Assignment routing to 200+ SMEs. Human Review and Infusion adding expert nuance. Plagiarism and Fact-Check Layer for validation. Quality Metrics Tracking with regular reports. Delivered 10,000+ reviewed solutions daily across 10+ institutions.

Results:
Key outcomes: 10,000+ fact-checked solutions delivered daily without compromising quality. Students received credible expert-validated answers improving platform trust. Plagiarism and factual error rates dropped to near-zero. Platform scaled its global reach significantly. Solution became a core differentiator in the competitive AI education market.

Key Metrics:
- Solutions/Day | 10,000+
- SMEs Involved | 200+
- Institutions Served | 10+
- Global Reach | Worldwide

Tags: content-services, ai, quality-assurance, sme, education
Services Used (check): Subject Matter Experts, Content Services Overview
Meta title: AI + Human QA: 10,000+ Fact-Checked Educational Solutions Daily | eQOURSE
Meta description: How eQOURSE built an AI + human QA pipeline delivering 10,000+ fact-checked solutions daily for a global EdTech platform - 200+ SMEs, 10+ institutions.

---

## CS-5: On-Demand Video Solutions for US Content Services Company

| Field | Value |
|---|---|
| Title | On-Demand Video Solutions for US Content Services Company |
| Slug | on-demand-video-solutions-us-content-services-company |
| Client | USA | Leading US Educational Technology Company |
| Industry | Higher Education / Content Services |
| Summary | On-demand video solutions across 15+ subjects with 2-hour turnaround for a leading US content services company, serving undergraduate and postgraduate students. |
| Hero Image | Student watching video on laptop. Modern US campus-style setting. 1200x675px. |
| Status | PUBLISH |

Challenge:
Undergraduate and postgraduate students struggled with complex topics due to limitations of traditional teaching, access barriers outside classroom hours, and speed requirements during exam periods. The client envisioned a platform where students submit questions and receive comprehensive video explanations within hours across 15+ academic subjects.

Solution:
We onboarded 150+ subject matter experts across 15+ disciplines. Workflow: SME Network Setup across Maths, Physics, Chemistry, Biology, CS, Economics, and more. Question Routing to the most relevant available SME. Video Production of clear step-by-step solutions. 2-Hour SLA maintained consistently. Quality Control QA before release.

Results:
Key outcomes: Enhanced accessibility - Students could access expert video solutions regardless of location or schedule. Higher academic performance with improved grades. Platform scaled to 15+ disciplines. 150+ SMEs consistently maintained the 2-hour SLA - a critical differentiator in the US market.

Key Metrics:
- SMEs Deployed | 150+
- Subjects Covered | 15+
- Turnaround Time | 2 Hours
- Education Level | UG / PG

Tags: content-services, video, sme, higher-education, usa
Services Used (check): E-Learning Video Solutions, Subject Matter Experts
Meta title: On-Demand Video Solutions for US EdTech - 2-Hour Turnaround | eQOURSE
Meta description: How eQOURSE deployed 150+ SMEs to deliver on-demand video solutions across 15+ subjects with 2-hour turnaround for a leading US educational technology company.

---

## CS-6: Math Solutions QA: 10,000+ Monthly Reviews at 90%+ Accuracy

| Field | Value |
|---|---|
| Title | Math Solutions QA: 10,000+ Monthly Reviews at 90%+ Accuracy |
| Slug | math-solutions-qa-10000-monthly-reviews-90-accuracy |
| Client | Global | Leading Mathematics Education Platform |
| Industry | Content Services |
| Summary | Quality assurance of 10,000+ monthly math solutions at 90%+ accuracy for a global education platform, covering primary to undergraduate level. |
| Hero Image | Mathematics equations on a board. Clean academic feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A leading mathematics education platform with 10,000+ monthly solutions from worldwide contributors faced a critical quality challenge. No systematic QA process, accuracy rates were inconsistent, no feedback mechanism to help contributors improve, and platform credibility was at risk.

Solution:
We curated a dedicated team of 25 mathematics experts. QA Process: Multi-Expert Review for every solution before approval. Minimum 90% accuracy rate standard. Consistency Checks for step-by-step working. Feedback Mechanism with constructive feedback for every rejected solution. Monthly quality reports with accuracy metrics and trend analysis.

Results:
Key outcomes: 10,000+ solutions quality-checked every month consistently. Accuracy rates consistently exceeded 90%, surpassing client expectations. Enhanced user satisfaction with significantly higher trust. Increased engagement and retention from improved content quality. Feedback mechanism led to measurable improvement in contributor quality over time.

Key Metrics:
- Reviews per Month | 10,000+
- Accuracy Rate | greater than 90%
- Math Experts | 25
- Difficulty Range | Primary to UG

Tags: content-services, quality-assurance, mathematics, education, sme
Services Used (check): Subject Matter Experts, Content Services Overview
Meta title: Math Solutions QA: 10,000+ Monthly Reviews at 90%+ Accuracy | eQOURSE
Meta description: How eQOURSE built a 25-expert math QA team to review 10,000+ solutions monthly at 90%+ accuracy for a global mathematics education platform.

---

## CS-7: 400,000+ Bilingual Workbooks for Rural Chhattisgarh Students

| Field | Value |
|---|---|
| Title | 400,000+ Bilingual Workbooks for Rural Chhattisgarh Students |
| Slug | 400000-bilingual-workbooks-rural-chhattisgarh-students |
| Client | India | Government / NGO Education Partner, Chhattisgarh |
| Industry | Government / NGO / Education |
| Summary | 400,000+ bilingual workbooks printed and distributed across rural Chhattisgarh for grades 6-10, with teacher training included. |
| Hero Image | Rural school children with books. Warm grassroots India education feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
In September 2022, a client needed to address educational challenges in rural Chhattisgarh for grades 6-10 across Mathematics, Science, English, and Social Studies, in both English and Hindi, for hundreds of thousands of students. The scale, bilingual requirement, and logistical complexity of reaching remote schools made this one of our most demanding projects.

Solution:
We deployed a cross-functional team including SMEs, curriculum specialists, bilingual writers, proofreaders, designers, and logistics professionals. Process: Needs Assessment. Curriculum Development for all 4 subjects grades 6-10. Bilingual Adaptation with full localisation into English and Hindi. Visual Design for print-ready layouts. Print Production of 400,000+ copies per subject per language. Distribution coordination to rural schools. Teacher Training sessions.

Results:
Key outcomes: 400,000+ students and teachers gained access to high-quality bilingual materials. Teachers reported enhanced teaching methodologies and improved student engagement. Student academic performance improved across participating schools. Solidified eQOURSE as trusted partner for government and NGO education programmes in India. Teacher training ensured lasting impact.

Key Metrics:
- Copies Printed | 400,000+
- Grades Covered | 6-10
- Subjects Bilingual | 4
- Extra Services | Teacher Training

Tags: content-services, localization, workbooks, government, india, chhattisgarh
Services Used (check): Localization Services, Custom E-Learning Content
Meta title: 400,000+ Bilingual Workbooks for Rural Chhattisgarh | eQOURSE Case Study
Meta description: How eQOURSE printed and distributed 400,000+ bilingual English-Hindi workbooks for grades 6-10 across rural Chhattisgarh, including teacher training.

---

## CS-8: EmSAT and TOEIC Test Prep Content for UAE Institution

| Field | Value |
|---|---|
| Title | EmSAT and TOEIC Test Prep Content for UAE Institution |
| Slug | emsat-toeic-test-prep-content-uae-institution |
| Client | UAE | UAE-Based Educational Institution |
| Industry | Higher Education / Testing |
| Summary | EmSAT and TOEIC exam preparation content for a UAE educational institution - modular, CBT-ready, aligned to Emirates standards and ETS frameworks. |
| Hero Image | Student at computer, exam setting. Clean UAE/modern academic feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A UAE-based educational institution needed high-quality exam preparation content for EmSAT (Emirates Standardised Test for university admissions) and TOEIC (ETS global English proficiency certification). Requirements included precise alignment to official specifications, modular CBT format, comprehensive coverage of study guides and practice tests, and high quality to improve pass rates.

Solution:
For EmSAT: Full curriculum content aligned to UAE Ministry of Education EmSAT specifications. Structured study guides. Assessment modules with practice tests mirroring the real EmSAT format. Modular LMS-ready design.
For TOEIC: Practice materials for Listening and Reading and Speaking and Writing components. Content aligned with ETS TOEIC specifications. Scored practice tests with model answers. Tips and strategies for each question type.
All content formatted for CBT delivery and reviewed by exam preparation specialists.

Results:
Key outcomes: The institution could offer structured credible test preparation previously unavailable in-house. Student pass rates and confidence in EmSAT and TOEIC examinations improved. Modular format allowed flexible deployment and updates by section. Students gave positive feedback on quality and relevance. eQOURSE established a strong relationship with UAE higher education sector.

Key Metrics:
- Test Coverage | EmSAT + TOEIC
- Format | Modular CBT
- Curriculum Alignment | UAE / ETS Standards
- Outcome | Higher Pass Rates

Tags: content-services, exam-preparation, uae, emsat, toeic, assessment
Services Used (check): Exam Preparation Content
Meta title: EmSAT and TOEIC Test Prep Content for UAE Institution | eQOURSE
Meta description: How eQOURSE developed modular EmSAT and TOEIC exam preparation content for a UAE educational institution - standards-aligned, CBT-ready, improving pass rates.

---

# AI DATA SERVICES CASE STUDIES (6 studies)

CRITICAL: All 6 studies below MUST include "AI Data Services" in the Tags field.
This controls the navy colour theme and the AI Data Services filter tab.

---

## CS-9: Multilingual ASR Training Data for Voice AI Startup

| Field | Value |
|---|---|
| Title | Multilingual ASR Training Data for Voice AI Startup |
| Slug | multilingual-asr-training-data-voice-ai-startup |
| Client | India | Series B Voice AI Startup (Confidential) |
| Industry | Voice AI / ASR |
| Summary | 50,000+ hours of multilingual speech data collected, annotated, and tested for a voice AI startup. 34% Word Error Rate reduction achieved. Client secured Series C funding. |
| Hero Image | Sound waveform / audio visualisation. Dark tech feel, navy/cyan tones. 1200x675px. |
| Status | PUBLISH |

Challenge:
A Series B voice AI startup building an ASR engine for South Asian markets faced a data quality crisis. Their training data was studio-recorded standard Hindi and English - missing regional dialects (Bhojpuri, Awadhi, Kongu Tamil, Telangana Telugu) and samples with ambient noise, code-switching, and overlapping speech. Word Error Rates across regional dialects were catastrophically high in production despite satisfactory benchmark scores. They needed field-realistic multilingual speech data collection at scale, high-IAA annotation, and real-world model testing.

Solution:
Phase 1 Data Collection: Field-recorded and crowdsourced 50,000+ hours across 12 Indian languages from our contributor network. Recording conditions varied: indoor, outdoor, mobile phone, landline, noisy environments.
Phase 2 Audio Annotation: Verbatim transcription with disfluency markers. Speaker diarisation for multi-speaker recordings. Phoneme labeling for acoustic model training. IAA maintained at 0.82 or higher (Cohen Kappa) throughout.
Phase 3 Data Cleaning and Validation: SNR-based audio quality filtering. Deduplication. PII redaction. Gold-standard validation against expert-transcribed reference corpus.
Phase 4 Real-World Model Testing via TuTrain: Client retrained ASR model deployed to real users from 8 dialect groups. Failure modes identified fed back into targeted data collection (active learning loop).

Results:
Key outcomes: 34% reduction in Word Error Rate across regional dialects. Tamil and Telugu dialect accuracy improved from 62% to 89%. TuTrain testing identified 3 critical failure modes that benchmark tests never revealed. Active learning loop targeted those failure modes in next collection cycle. Client secured Series C funding with improved model performance cited as key factor by investors.

Key Metrics:
- Speech Data Collected | 50,000+ Hours
- Languages Covered | 12
- WER Reduction | 34%
- Tamil and Telugu Accuracy | 62% to 89%
- Annotator IAA | 0.82 or higher
- Client Outcome | Series C Funded

Tags: AI Data Services, asr, speech, multilingual, annotation, model-testing, india
Services Used (check): AI Data Collection, Data Annotation and Labeling, AI Model Testing
Meta title: Multilingual ASR Training Data - 34% WER Reduction for Voice AI Startup | eQOURSE
Meta description: How eQOURSE collected 50,000+ hours of multilingual speech data across 12 Indian languages and used real-world testing to reduce WER by 34% for a Series B voice AI startup.

---

## CS-10: Computer Vision Annotation for Autonomous Vehicle Company

| Field | Value |
|---|---|
| Title | Computer Vision Annotation for Autonomous Vehicle Company |
| Slug | computer-vision-annotation-autonomous-vehicle-company |
| Client | India | AV Technology Company (APAC Expansion) |
| Industry | Autonomous Vehicles / Computer Vision |
| Summary | 200,000+ frames of Indian driving data annotated for an autonomous vehicle company. Model accuracy on Indian road scenarios improved from 54% to 91% mAP. |
| Hero Image | Car dashboard / Indian traffic / driving footage. Tech-forward dark/navy feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
An AV technology company expanding into APAC had a critical problem: perception models trained on Western datasets (Waymo, nuScenes) failed catastrophically on Indian road scenarios. Dataset gaps included missing vehicle classes (auto-rickshaws, cycle-rickshaws, hand-pulled carts, overloaded two-wheelers), different road structure (unmarked roads, construction zones, severe potholes), unusual traffic behaviour (mixed flows, animals on roads, pedestrians crossing mid-highway), and weather (monsoon rain, dust haze, night driving). The model mAP on Indian road scenarios was 54% - below any acceptable threshold.

Solution:
Phase 1 Data Collection: Dashcam and LiDAR-synced video collection across 15 Indian cities. Diverse conditions: urban/rural, day/night, monsoon/clear, highway/city. 200,000+ frames captured.
Phase 2 Multi-Modal Annotation: Bounding box annotation across a 45-class vehicle taxonomy including all India-specific classes. Semantic segmentation for road surface, lane markings, and drivable area. 3D cuboid annotation for LiDAR point cloud data. Keypoint annotation for pedestrian pose estimation. Full metadata tagging for scene conditions.
Phase 3 Quality Assurance: Removal of blurred, overexposed, and corrupt frames. Label consistency cross-checks. Gold-standard validation with 20% honeypot images. Final annotation accuracy: 98.2%.

Results:
Key outcomes: Model accuracy improved from 54% to 91% mAP - a 37-point improvement. The annotated dataset became the client primary training asset for APAC expansion. The India-specific 45-class vehicle taxonomy filled a gap that no public dataset had addressed. The annotation schema became a new internal standard for the client globally. The client accelerated their India market launch timeline.

Key Metrics:
- Frames Annotated | 200,000+
- Cities Covered | 15
- Vehicle Classes | 45
- mAP Improvement | 54% to 91%
- Honeypot Validation | 20%
- Annotation Accuracy | 98.2%

Tags: AI Data Services, computer-vision, annotation, autonomous-vehicles, india, bounding-box
Services Used (check): AI Data Collection, Data Annotation and Labeling, Data Cleaning and Validation
Meta title: Computer Vision Annotation for AV Company - 54% to 91% mAP | eQOURSE
Meta description: How eQOURSE annotated 200,000+ Indian driving frames across 45 vehicle classes for an AV company - improving mAP from 54% to 91% for APAC deployment.

---

## CS-11: RLHF Annotation for LLM Fine-Tuning - Global AI Lab

| Field | Value |
|---|---|
| Title | RLHF Annotation for LLM Fine-Tuning - Global AI Lab |
| Slug | rlhf-annotation-llm-fine-tuning-global-ai-lab |
| Client | Global | Well-Funded AI Research Lab (Confidential) |
| Industry | Large Language Models / Generative AI |
| Summary | RLHF annotation in 6 languages for LLM fine-tuning. 28% preference score improvement, safety violations cut from 4.2% to 0.6%, enabling successful India product launch. |
| Hero Image | AI / neural network visualisation. Dark abstract high-tech feel, navy/cyan. 1200x675px. |
| Status | PUBLISH |

Challenge:
A well-funded AI research lab building a multilingual LLM had a fundamental alignment gap. Their RLHF data was English-only with US-centric cultural assumptions, missing 5 major Indic languages: Hindi, Bengali, Tamil, Telugu, Marathi. Production consequences: culturally inappropriate responses in Indic languages (wrong honorifics, insensitive phrasing, wrong idioms). Factually incorrect responses on Indian topics. Safety violations at 4.2% rate above acceptable thresholds for product launch. They needed a RLHF partner with genuine native-language expertise - cultural insiders, not just translators.

Solution:
Component 1 RLHF Preference Ranking: 200+ trained annotators ranked model output pairs for helpfulness, harmlessness, and cultural appropriateness. Annotators were native speakers with domain expertise. All trained on the client content policy before annotation.
Component 2 Safety Labeling and Red-Teaming: Systematic red-teaming to surface harmful, biased, or policy-violating outputs. Safety annotation across 8 harm categories. Culturally-specific harm categories added for Indic language contexts.
Component 3 Instruction-Following Evaluation: Evaluation of model compliance with explicit user instructions. Cultural appropriateness of response tone and register.
Component 4 Data Cleaning: Deduplication. PII redaction. Format standardisation to JSONL. Krippendorff Alpha maintained at 0.83 or higher throughout.

Results:
Key outcomes: 28% improvement in human preference scores on Indic language responses after RLHF fine-tuning. Safety violation rate dropped from 4.2% to 0.6% across all languages. Cultural appropriateness ratings improved significantly - responses feel naturally native, not translated. The improved model enabled a successful product launch in India. eQOURSE RLHF annotation established a new internal quality benchmark for the client globally.

Key Metrics:
- RLHF Annotators | 200+
- Languages Covered | 6
- Preference Score Improvement | 28%
- Safety Violations | 4.2% to 0.6%
- Krippendorff Alpha | 0.83 or higher
- Outcome | Successful Product Launch

Tags: AI Data Services, rlhf, llm, annotation, multilingual, safety, indic-languages
Services Used (check): Data Annotation and Labeling, Data Cleaning and Validation
Meta title: RLHF Annotation for Multilingual LLM - 28% Preference Improvement | eQOURSE
Meta description: How eQOURSE delivered RLHF annotation in 6 languages for LLM fine-tuning - 28% preference score improvement, safety violations cut to 0.6%, enabling India launch.

---

## CS-12: Medical Image Annotation for Healthcare AI Startup

| Field | Value |
|---|---|
| Title | Medical Image Annotation for Healthcare AI Startup |
| Slug | medical-image-annotation-healthcare-ai-startup |
| Client | Global | Healthcare AI Startup (Confidential) |
| Industry | Healthcare AI / Medical Imaging |
| Summary | 25,000 chest X-rays annotated by radiology-trained specialists. Client diagnostic model achieved 94.7% sensitivity and 96.1% specificity - exceeding FDA submission thresholds. |
| Hero Image | Medical imaging / radiology / X-ray on lightbox. Dark clinical precise feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A healthcare AI startup developing a diagnostic support tool for chest X-ray analysis (pneumonia, tuberculosis, pleural effusion, cardiomegaly) faced a critical annotation quality problem. Public datasets had two fatal flaws: annotation inconsistency creating noisy labels, and population gap lacking South Asian pathology variants most common in their target Indian hospitals. Without accurate annotation the model would have unacceptably high false negative rates - a life-or-death quality requirement. HIPAA-compliant PII redaction from DICOM metadata was required before annotation could begin.

Solution:
eQOURSE assembled a specialist medical annotation team with 15 medical annotators with radiology or clinical backgrounds and 3 consulting radiologists providing senior supervision. Annotation Methodology: Semantic segmentation of lung fields, cardiac silhouette, and pathological regions on 25,000 chest X-rays. Instance segmentation for multi-lesion cases. HIPAA-aware PII redaction from all DICOM metadata before annotation. Gold-standard validation with every 5th image double-annotated independently. Annotation protocol fully documented for FDA submission purposes. All annotation performed using medical-grade tooling with full audit trail.

Results:
Key outcomes: The diagnostic model achieved 94.7% sensitivity and 96.1% specificity - exceeding FDA submission thresholds. South Asian pathology variants improved model generalisation to Indian hospital deployments. The fully documented annotation protocol gave the client evidentiary records for regulatory submissions. The client is pursuing FDA 510(k) clearance. eQOURSE demonstrated that radiologist-supervised annotation produces measurably superior model outcomes.

Key Metrics:
- X-Rays Annotated | 25,000
- Medical Annotators | 15
- Radiologist Supervisors | 3
- Model Sensitivity | 94.7%
- Model Specificity | 96.1%
- Compliance | HIPAA PII Redacted

Tags: AI Data Services, medical-imaging, annotation, healthcare, hipaa, fda, computer-vision
Services Used (check): Data Annotation and Labeling, Data Cleaning and Validation
Meta title: Medical Image Annotation - 25,000 X-Rays, FDA-Grade Accuracy | eQOURSE
Meta description: How eQOURSE radiology-supervised team annotated 25,000 chest X-rays for a healthcare AI startup - enabling 94.7% sensitivity and 96.1% specificity, exceeding FDA thresholds.

---

## CS-13: Conversational AI Dataset for FinTech Chatbot

| Field | Value |
|---|---|
| Title | Conversational AI Dataset for FinTech Chatbot |
| Slug | conversational-ai-dataset-fintech-chatbot |
| Client | India | FinTech Company (Banking and Insurance) |
| Industry | FinTech / Conversational AI |
| Summary | 150,000 multilingual banking utterances collected and annotated for a FinTech chatbot. Intent error reduced from 22% to 4.8%. Agent escalation cut by 40%. |
| Hero Image | Mobile banking / chatbot conversation / financial app UI. Dark FinTech feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A FinTech company building a multilingual customer service chatbot for banking and insurance was caught in a dangerous gap: strong benchmark scores (91% intent accuracy) masking poor real-world performance (22% misclassification in production). The gap came from how customers phrase queries: code-switching mixing Hindi and English freely, typos and informal language, domain jargon customers use incorrectly or colloquially, and Tamil and Telugu segments barely represented in training data. Every misclassified intent meant either a wrong automated response or a costly agent escalation.

Solution:
Phase 1 Realistic Data Collection: Crowdsourced 150,000 banking query utterances across 5 languages: Hindi, Hinglish, English, Tamil, and Telugu. Contributors instructed to phrase queries naturally. Topic coverage: account management, fund transfers, loans, insurance, card services, and more.
Phase 2 Multi-Layer Annotation: Intent classification across 85 intent categories. Named Entity Recognition for financial entities: account numbers, amounts, dates, bank names. Sentiment labeling for escalation trigger identification. All annotation by domain-familiar native speakers.
Phase 3 Real-World Model Testing via TuTrain: After client retrained NLU model, chatbot deployed to real users via TuTrain. Measured intent accuracy, entity F1, and user satisfaction in real banking interactions. Results fed back into second targeted collection cycle for highest-error intent pairs.

Results:
Key outcomes: Intent misclassification dropped from 22% to 4.8% - 78% error reduction. Hindi and Hinglish entity extraction F1 improved from 0.71 to 0.93. 40% reduction in chatbot-to-human-agent escalation rate with direct operational cost savings. TuTrain real-world testing revealed specific failure patterns the internal test set had completely missed.

Key Metrics:
- Utterances Collected | 150,000
- Intent Categories | 85
- Languages Covered | 5
- Intent Error Rate | 22% to 4.8%
- Entity F1 Score | 0.71 to 0.93
- Agent Escalation | minus 40%

Tags: AI Data Services, nlp, chatbot, annotation, fintech, multilingual, model-testing, india
Services Used (check): AI Data Collection, Data Annotation and Labeling, AI Model Testing
Meta title: Conversational AI Dataset for FinTech Chatbot - Intent Error 22% to 4.8% | eQOURSE
Meta description: How eQOURSE collected 150,000 multilingual banking utterances and annotated 85 intents, cutting a FinTech chatbot intent error from 22% to 4.8% and escalations by 40%.

---

## CS-14: OCR Training Data for Document AI - Handwritten Indic Scripts

| Field | Value |
|---|---|
| Title | OCR Training Data for Document AI - Handwritten Indic Scripts |
| Slug | ocr-training-data-document-ai-handwritten-indic-scripts |
| Client | India | Document AI Company (Global Clients) |
| Industry | Document AI / OCR |
| Summary | 100,000+ handwritten Indic script images collected and annotated for OCR training. Devanagari accuracy improved from 68% to 94%, Tamil to 91%, Telugu to 89%. |
| Hero Image | Handwritten text / Devanagari script / document scanning. Dark precise data-tech feel. 1200x675px. |
| Status | PUBLISH |

Challenge:
A Document AI company building an OCR engine for Indian government forms, bank cheques, and handwritten applications faced a stark accuracy gap. Printed text: 97% accuracy. Handwritten Indic scripts (Devanagari, Tamil, Telugu): all below 70%. Root cause: no large-scale labelled dataset existed for handwritten Indic scripts in real-world document contexts. Further challenges: extreme handwriting style variation, script complexity with more character variants and diacritics than Latin scripts, and no standardised annotation format (client needed COCO JSON with custom schema).

Solution:
Phase 1 Handwriting Sample Collection: Collected 100,000+ images of handwritten documents from our contributor network across India. Contributors represented maximum style diversity across urban/rural, students/professionals/elderly, and multiple pen types. Each sample metadata-tagged with contributor demographics.
Phase 2 Multi-Level Annotation: Character-level bounding box annotation with UTF-8 text labels. Word-level segmentation for word spotting tasks. Line-level segmentation for sequence model approaches. Document layout annotation for form structure understanding. Validated against Indic script specialist reviewers.
Phase 3 Data Cleaning and Delivery: Removal of illegible samples using clear illegibility protocols. Annotation consistency cross-checks. Format standardisation to COCO JSON with client-specified custom schema. Delivered in train/validation/test splits.

Results:
Key outcomes: Devanagari OCR accuracy: 68% to 94% character accuracy. Tamil OCR accuracy: reached 91%. Telugu OCR accuracy: reached 89%. The dataset became the largest proprietary handwritten Indic script OCR training corpus giving the client a defensible competitive moat. The client is now deploying their OCR engine for Indian government document digitisation programmes. eQOURSE methodology has since been adopted as the client standard for future language expansion.

Key Metrics:
- Document Images | 100,000+
- Indic Scripts Covered | 3
- Devanagari OCR Accuracy | 68% to 94%
- Tamil OCR Accuracy | 91%
- Telugu OCR Accuracy | 89%
- Delivery Format | COCO JSON

Tags: AI Data Services, ocr, document-ai, annotation, indic-scripts, devanagari, india
Services Used (check): AI Data Collection, Data Annotation and Labeling, Data Cleaning and Validation
Meta title: OCR Training Data for Handwritten Indic Scripts - Devanagari 68% to 94% | eQOURSE
Meta description: How eQOURSE collected 100,000+ handwritten Indic script images for OCR training - improving Devanagari accuracy from 68% to 94%, Tamil to 91%, Telugu to 89%.

---

# HERO IMAGE SPECIFICATIONS

Dimensions: 1200 x 675 px (16:9 ratio, or larger)
Formats: PNG, JPG, or WEBP
Max file size: 5 MB per image
File naming: use the slug as the filename

Image Search Terms (unsplash.com or pexels.com):
CS-1:  classroom india students teacher worksheet
CS-2:  team collaboration india education multilingual
CS-3:  school africa classroom teacher curriculum
CS-4:  team computers office technology education
CS-5:  student laptop video studying university
CS-6:  mathematics equations blackboard numbers
CS-7:  rural india school children books village
CS-8:  student exam computer test preparation
CS-9:  sound wave audio waveform voice technology
CS-10: india traffic city driving dashboard camera
CS-11: artificial intelligence neural network abstract dark
CS-12: xray radiology medical imaging clinical
CS-13: mobile banking fintech app phone chat
CS-14: handwriting devanagari script document pen

---

# UPLOAD CHECKLIST

[ ] CS-1  K-12 Worksheets and PPT Solutions - Published
[ ] CS-2  Multilingual Pen-Tab Videos - Published
[ ] CS-3  African Curriculum Content - Published
[ ] CS-4  AI + Human QA Solutions - Published
[ ] CS-5  On-Demand Video for US - Published
[ ] CS-6  Math Solutions QA - Published
[ ] CS-7  Chhattisgarh Bilingual Workbooks - Published
[ ] CS-8  EmSAT and TOEIC UAE - Published
[ ] CS-9  ASR Voice AI (AI Data Services) - Published
[ ] CS-10 Computer Vision AV (AI Data Services) - Published
[ ] CS-11 RLHF LLM (AI Data Services) - Published
[ ] CS-12 Medical Imaging (AI Data Services) - Published
[ ] CS-13 FinTech Chatbot (AI Data Services) - Published
[ ] CS-14 OCR Indic Scripts (AI Data Services) - Published

Verify on /casestudy after upload:
[ ] All 14 appear in the listing
[ ] Content Service filter shows 8 studies (teal cards)
[ ] AI Data Services filter shows 6 studies (navy cards)
[ ] Region chip shows correctly from Client field (India, Global, UAE, Africa, USA)
[ ] Industry chip shows correctly
[ ] Hero images load on all cards
[ ] Clicking a card opens modal with correct Problem, Solution, Impact, and Metrics
[ ] Related service links in modal navigate correctly
[ ] SEO title and description visible in browser tab

---

# SEO BEST PRACTICES SUMMARY

- Meta title: 50-60 characters including the | eQOURSE suffix
- Meta description: 140-160 characters
- Include primary metric (numbers like 68% to 94%, 34% WER reduction) in both title and description - numbers increase click-through rates significantly
- Tags field is for category logic ONLY, not SEO keyword stuffing
- Slugs in this guide are already SEO-optimised - use them exactly as given
- The hero image serves as the OG social share image as well
