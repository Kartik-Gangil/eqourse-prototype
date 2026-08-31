import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Building2, FileSignature, Globe2, MapPin, Network, ShieldCheck, UsersRound } from "lucide-react";

const proofPoints = [
  { value: "500+", label: "Subject matter experts & data specialists", icon: UsersRound },
  { value: "30+", label: "Global and Indian regional languages", icon: Globe2 },
  { value: "24/7", label: "India-led delivery capability", icon: Network },
  { value: "ISO", label: "9001:2015 & 27001:2022 processes", icon: ShieldCheck },
];

const AboutCorporateStructure = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="corporate-structure"
      aria-labelledby="corporate-structure-title"
      className="scroll-mt-28 overflow-hidden bg-[#0d1628] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
            One global operating model
          </p>
          <h2 id="corporate-structure-title" className="mt-5 font-heading text-3xl font-bold leading-tight md:text-5xl">
            Commercially led from Singapore. <span className="text-primary">Delivered from India.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-white/70 md:text-lg">
            eQOURSE is a global learning content and AI data solutions provider. International client engagements and master service agreements run through eQOURSE PTE. LTD., while our operational headquarters and primary delivery centre in Kota power execution at scale.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-6xl border-y border-white/15">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(20,184,166,0.12),transparent_30%),radial-gradient(circle_at_82%_65%,rgba(20,184,166,0.08),transparent_28%)]" />

          <div className="relative grid lg:grid-cols-[1fr_8rem_1fr] lg:items-stretch">
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              className="px-2 py-10 sm:px-8 lg:py-14"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="font-mono text-xs text-primary">01 / COMMERCIAL</span>
                <Globe2 className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Singapore · Commercial headquarters</p>
              <h3 className="mt-3 font-heading text-2xl font-bold md:text-3xl">eQOURSE PTE. LTD.</h3>
              <p className="mt-5 max-w-xl leading-7 text-white/70">
                The commercial centre for international business engagements, client accounts, partnerships, proposals, contracting and master service agreements.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-white/75">
                <li className="flex items-center gap-3"><FileSignature className="h-4 w-4 text-primary" /> International MSAs &amp; client accounts</li>
                <li className="flex items-center gap-3"><Building2 className="h-4 w-4 text-primary" /> Global business development &amp; partnerships</li>
              </ul>
              <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-white/50">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>760 Bedok Reservoir Road, #04-13, Waterfront Waves, Singapore 479245</span>
              </div>
            </motion.article>

            <div className="relative flex min-h-24 items-center justify-center border-y border-white/10 lg:min-h-0 lg:border-x lg:border-y-0">
              <div aria-hidden="true" className="absolute left-8 right-8 h-px bg-primary/60 lg:bottom-12 lg:left-1/2 lg:right-auto lg:top-12 lg:h-auto lg:w-px" />
              <motion.span
                animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 0 rgba(45,212,191,.35)", "0 0 0 14px rgba(45,212,191,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-primary/50 bg-[#0d1628] text-primary"
              >
                <ArrowRight className="hidden h-5 w-5 lg:block" />
                <ArrowDown className="h-5 w-5 lg:hidden" />
              </motion.span>
              <span className="absolute bottom-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 lg:bottom-6 lg:left-1/2 lg:w-28 lg:-translate-x-1/2 lg:text-center">
                Scope to delivery
              </span>
            </div>

            <motion.article
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: reduceMotion ? 0 : 0.1 }}
              className="px-2 py-10 sm:px-8 lg:py-14"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="font-mono text-xs text-primary">02 / DELIVERY</span>
                <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-primary">Kota, India · Operational headquarters</p>
              <h3 className="mt-3 font-heading text-2xl font-bold md:text-3xl">EQOURSE ONLINE EDUCATIONERS LLP</h3>
              <p className="mt-5 max-w-xl leading-7 text-white/70">
                The primary delivery centre for AI data operations, digital curriculum development, pedagogical localization, specialist teams and project quality management.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-white/75">
                <li className="flex items-center gap-3"><UsersRound className="h-4 w-4 text-primary" /> 500+ specialists across content and AI data</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> ISO-certified delivery processes</li>
              </ul>
              <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-white/50">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>C-29, Indra Vihar, Shiv Jyoti School Road, Kota, Rajasthan 324005, India</span>
              </div>
            </motion.article>
          </div>

          <div className="relative grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(({ value, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.08 }}
                className="flex items-start gap-4 border-white/10 px-5 py-6 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l"
              >
                <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div><strong className="font-heading text-xl text-white">{value}</strong><p className="mt-1 text-xs leading-5 text-white/50">{label}</p></div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-5 text-white/40">
          The applicable legal entity and delivery scope are identified in each proposal, agreement and invoice.
        </p>
      </div>
    </section>
  );
};

export default AboutCorporateStructure;
