import { motion } from "framer-motion";
import { Building2, Globe2, MapPin } from "lucide-react";

const entityDetails = [
  {
    region: "India · Primary Operations & Delivery",
    legalName: "EQOURSE ONLINE EDUCATIONERS LLP",
    summary:
      "The operating centre for AI data delivery, learning-content production, specialist teams and project quality management.",
    address: "C-29, Indra Vihar, Shiv Jyoti School Road, Kota, Rajasthan 324005, India",
    icon: Building2,
  },
  {
    region: "Singapore · Registered International Entity",
    legalName: "EQOURSE PTE. LTD.",
    summary:
      "Established in Singapore to support international business development, client engagement, partnerships and contracting where applicable.",
    address: "760 Bedok Reservoir Road, #04-13, Waterfront Waves, Singapore 479245",
    icon: Globe2,
  },
];

const AboutCorporateStructure = () => (
  <section
    id="corporate-structure"
    aria-labelledby="corporate-structure-title"
    className="scroll-mt-28 overflow-hidden bg-[#11182d] py-20 text-white md:py-28"
  >
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Corporate structure
        </p>
        <h2 id="corporate-structure-title" className="mt-5 font-heading text-3xl font-bold md:text-5xl">
          One eQOURSE brand. <span className="text-primary">Two registered entities.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/68 md:text-lg">
          Clients work with one integrated eQOURSE team. Our engagement documents clearly identify the legal entity responsible for each contract and delivery scope.
        </p>
      </motion.div>

      <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.035]">
        <div className="flex items-center justify-center gap-3 border-b border-white/12 px-6 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">eQ</span>
          <div>
            <p className="font-heading text-lg font-bold">eQOURSE</p>
            <p className="text-xs text-white/55">One customer-facing brand and delivery experience</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {entityDetails.map((entity, index) => {
            const Icon = entity.icon;
            return (
              <motion.article
                key={entity.legalName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-7 md:p-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-white/12 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/12 md:[&:not(:first-child)]:border-t-0"
              >
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-primary">{entity.region}</p>
                <h3 className="mt-3 font-heading text-2xl font-bold leading-tight">{entity.legalName}</h3>
                <p className="mt-5 leading-7 text-white/68">{entity.summary}</p>
                <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-white/58">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{entity.address}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-5 text-white/45">
        The entities are separately registered and operate under the eQOURSE brand. The applicable contracting entity is stated in each proposal, agreement and invoice.
      </p>
    </div>
  </section>
);

export default AboutCorporateStructure;
