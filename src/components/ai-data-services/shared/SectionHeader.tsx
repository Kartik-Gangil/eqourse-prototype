import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  gradientText?: string;
  subtitle?: ReactNode;
  centered?: boolean;
  light?: boolean;
  dark?: boolean;
}

const SectionHeader = ({ label, title, gradientText, subtitle, centered = true, light = false, dark = false }: SectionHeaderProps) => {
  const onDark = light || dark;
  return (
  <div className={`${centered ? "text-center" : ""} max-w-3xl ${centered ? "mx-auto" : ""} mb-14`}>
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${onDark ? "border-[#35dfbb]/35 bg-[#35dfbb]/10" : "border-primary/20 bg-primary/5"}`}>
      <span className={`w-2 h-2 rounded-full ${onDark ? "bg-[#35dfbb]" : "bg-primary"} animate-pulse`} />
      <span className={`text-xs font-semibold tracking-wider uppercase ${onDark ? "text-[#59e8c9]" : "text-primary"}`}>{label}</span>
    </div>

    <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold ${onDark ? "text-white" : "text-foreground"} mt-1 mb-4 leading-tight`}>
      {title}{" "}
      {gradientText && <span className={onDark ? "text-[#35dfbb]" : "text-gradient"}>{gradientText}</span>}
    </h2>

    {subtitle && (
      <p className={`text-base md:text-lg leading-relaxed ${onDark ? "text-white/75" : "text-muted-foreground"}`}>{subtitle}</p>
    )}
  </div>
  );
};

export default SectionHeader;
