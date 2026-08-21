export const reproducibilityRows = [
  ["Wrong proprioceptive state source", "97.8% → 42% — a 55-point swing from one parameter"],
  ["Absolute vs delta action representation confused", "0% — positions accumulate and the policy fails outright"],
  ["Quaternion antipodal handling not documented", "97% → 83% on one suite"],
  ["Preprocessing centre crop omitted", "~3 percentage points"],
  ["Simulator missing required proprioceptive fields", "30–55% → 0%"],
] as const;

export const rolloutRows = [
  ["Current common practice", "≤ 25 per condition"],
  ["±5 percentage-point Wilson confidence interval on one success rate", "~380 rollouts"],
  ["Detect a 5pp difference between two policies (McNemar, 80% power)", "600–1,500 paired rollouts per cell"],
  ["Distributional time-to-success protocol for close comparisons", "Around 30 per cell in published methodology work"],
] as const;

export const policyRows = [
  ["pi-0.5", "56.25%", "30.77%"],
  ["Wall-X", "—", "20.51%"],
  ["ACT (baseline)", "33.75%", "6.45%"],
  ["SmolVLA", "32.5%", "3.23%"],
] as const;

export const failureTaxonomyRows = [
  ["Grasp instability", "Failed grasp, slip or object lost", "91–100%"],
  ["Repetition loop", "Oscillatory action sequence; the policy gets stuck", "91–100%"],
  ["State mismatch", "Internal belief diverges from the actual environment", "45–98%, architecture-dependent"],
  ["Precision misalignment", "Spatial constraint not met", "0–15%"],
] as const;

export const generalisationRows = [
  ["Novel object instance", "Different mug, same category", "Tests whether the policy learned this object"],
  ["Novel object category", "An unseen category", "Tests whether affordance understanding transfers"],
  ["Novel scene", "New background, surface, layout and clutter", "Separates scene understanding from scene overfit"],
  ["Novel lighting", "Different intensity, direction and colour temperature", "Cheap to vary and frequently decisive"],
  ["Novel instruction phrasing", "Same task in different words or another language", "Tests grounding rather than prompt memorisation"],
  ["Novel initial conditions", "Start pose, object placement and distractors", "Finds failure at the edge of the training distribution"],
  ["Perturbation mid-task", "Object moved or obstacle introduced", "Makes recovery behaviour visible"],
  ["Novel embodiment", "Different robot or gripper", "Required only when a cross-embodiment claim is made"],
] as const;

export const simulationRows = [
  ["Scale", "Thousands of parallel episodes", "Hundreds of human-paced trials"],
  ["Reproducibility", "Exact with a documented configuration", "Approximate; reset tolerance must be measured"],
  ["Best for", "Regression, broad coverage and ablations", "Claims about behaviour on real hardware"],
  ["Weak point", "Contact, friction, deformables, sensor noise and lighting", "Cost narrows coverage"],
  ["Our role", "Run suites and document every configuration assumption", "Core managed evaluation bench"],
] as const;

export const protocolItems = [
  ["Task definitions", "Observable success criteria, including edge cases."],
  ["Initial condition protocol", "Reset method and measured tolerance."],
  ["Trial count per cell", "Tied to the claim it can support."],
  ["Summary statistic", "Chosen and justified before results exist."],
  ["Failure taxonomy", "Categories with worked examples."],
  ["Recovery definition", "What is recovery versus a lucky retry."],
  ["Termination criteria", "Timeout, max steps and unsafe-state abort."],
  ["Full configuration", "Action frame, state definition, preprocessing, rate and seeds."],
  ["Generalisation conditions", "Axes, cells and trials per cell."],
  ["Human baseline scope", "Same-fixture teleoperation where included."],
] as const;

export const programmeSteps = [
  ["01", "Protocol design", "Week 1–2", "The complete evaluation question, success criteria, statistic, taxonomy and configuration are written and agreed."],
  ["02", "Fixture & reset calibration", "Week 2", "Build the fixture, define reset procedure and measure whether reset variance is smaller than the effect of interest."],
  ["03", "Operator calibration", "Week 2–3", "Train operators on scoring and taxonomy, then measure agreement against a reference set."],
  ["04", "Pilot cell", "Week 3", "Run one condition end to end and re-derive trial counts from observed variance."],
  ["05", "Trial execution", "Week 3+", "Log outcome, time-to-success, failure class and recovery status at agreed counts."],
  ["06", "Human baseline", "Parallel", "Run trained teleoperators on the same fixture and protocol where scoped."],
  ["07", "Analysis & report", "Final week", "Report per task, condition and generalisation axis with intervals, alternatives and per-trial evidence."],
] as const;

export const wrongRows = [
  ["25 rollouts and a percentage", "Sampling noise reads as a difference", "Derive counts from pilot variance and name the supported claim"],
  ["No confidence intervals", "Sampling noise reads as a result", "Intervals on every reported figure"],
  ["Undocumented configuration", "One parameter can swing the score", "Full configuration is part of the deliverable"],
  ["Binary success only", "Recovery and failure structure disappear", "Taxonomy and recovery reported as standard"],
  ["Blended generalisation score", "Object collapse hides behind scene strength", "Report every axis separately"],
  ["Statistic chosen after results", "The flattering ranking wins", "Agree it at scoping and report alternatives"],
  ["Reset variance uncontrolled", "Fixture noise exceeds the measured effect", "Measure reset tolerance before trials"],
  ["Failure classification drifts", "Operators diverge over time", "Calibrate, measure agreement and re-check"],
  ["Simulation quoted as hardware", "Contact-heavy tasks look better than reality", "Separate sim and hardware and report the gap"],
  ["No human baseline", "The fixture constraint is blamed on the policy", "Use same-fixture teleoperation where scoped"],
  ["Success criteria unstated", "Operators adjudicate outcomes differently", "Write observable criteria with examples"],
] as const;

export const deliverables = [
  "Evaluation report by task, condition and generalisation axis with confidence intervals",
  "Full protocol specification reproducible by a third party",
  "Complete action, state, preprocessing, control-rate and seed record",
  "Failure taxonomy distribution and recovery rates",
  "Time-to-success distributions where the distributional protocol is used",
  "Ranking under the agreed statistic plus reasonable alternatives",
  "Human baseline and sim-to-real comparison where scoped",
  "Per-trial log for independent re-analysis",
  "Live walkthrough with the ML team",
] as const;

export const faqs = [
  { question: "What is VLA evaluation?", answer: "Measuring how a vision-language-action policy performs—how capable it is on trained tasks, how it fails and whether it recovers, and how far it generalises to novel objects, scenes, instructions and initial conditions. A defensible evaluation is a documented protocol plus a trial count that can support the claim, not a success rate from a handful of rollouts." },
  { question: "How many rollouts do we need?", answer: "More than most evaluations run. Common practice is 25 or fewer per condition. A ±5 percentage-point Wilson confidence interval on one success rate needs roughly 380 rollouts, and detecting a 5pp paired difference between two policies at 80% power needs 600–1,500 paired rollouts per cell. A distributional time-to-success protocol can be more efficient; published methodology work reports around 30 per cell for close comparisons. We derive the count from pilot variance and state what claim it supports." },
  { question: "Why do different labs report different numbers for the same model?", answer: "Configuration assumptions go undocumented and matter enormously. Published work on a unified evaluation harness documented a score dropping from 97.8% to 42% from the wrong proprioceptive state source, and to 0% when absolute and delta action representations were confused. A number without its full configuration is not a result, so configuration is part of our deliverable." },
  { question: "Why does recovery rate matter alongside success rate?", answer: "It distinguishes policies that success rate cannot. Published real-hardware benchmarking over 320 episodes found ACT at 33.75% success with 6.45% recovery and SmolVLA at 32.5% success with 3.23% recovery. The success figures are close, but the systems behave differently after failure. We report recovery beside success." },
  { question: "What failure modes do you classify?", answer: "We begin with grasp instability, repetition loops, state mismatch and precision misalignment from current real-hardware benchmarking, calibrate operators against worked examples with measured agreement, and extend the taxonomy where your tasks need additional categories." },
  { question: "Can we just use benchmark leaderboard results?", answer: "Use them to track the field, not to decide what runs on your robot. Public leaderboards use shared simulation suites with assumptions that are often undocumented. Published harness work found results fragmented across 17 benchmarks and more than 509 configurations. Leaderboards are context; your fixture is evidence." },
  { question: "Should we evaluate in simulation or on real hardware?", answer: "Both, for different jobs. Simulation is right for regression, coverage and ablations. Hardware is required for claims used to choose an architecture or quote performance because simulators are weakest around contact, friction, deformables and sensor noise. Where both run, we report the sim-to-real gap by task class." },
  { question: "What is a human baseline and why would we want one?", answer: "It measures trained human teleoperators on the identical task and fixture, so policy performance can be expressed relative to human throughput. It also reveals when the fixture rather than the policy is the constraint. Our human demonstration bench can produce this baseline using the same rigs and protocol." },
  { question: "Why does the choice of summary statistic matter?", answer: "When performance distributions cross, different reasonable statistics can produce opposite rankings. Published distributional work showed the same policy ranking third under one summary and first under another. Single scalars are methodological commitments, not objective summaries, so we agree the statistic before the run and report alternatives." },
  { question: "How is this different from deployment validation?", answer: "VLA evaluation asks how capable a policy is and how it fails under controlled comparative conditions before deployment. Deployment validation asks whether a specific system works safely in a specific place under operational conditions and acceptance criteria. Evaluation chooses what to take forward; validation precedes go-live." },
] as const;
