import type { GemType } from "@/lib/gem-data";

export type GitReportType = "precious-full" | "semi-precious-full";

export const GIT_CERTIFICATION_FEE = 750;
export const GIT_CERTIFICATION_VAT_RATE = 0.07;

const preciousGemTypes = new Set<GemType>(["ruby", "sapphire", "emerald", "yellow-sapphire"]);

export function isPreciousGemForGit(gemType: GemType | null | undefined) {
  if (!gemType) return false;
  return preciousGemTypes.has(gemType);
}

export function getGitReportTypeForGem(gemType: GemType | null | undefined): GitReportType {
  return isPreciousGemForGit(gemType) ? "precious-full" : "semi-precious-full";
}

export function getGitReportTitle(reportType: GitReportType) {
  return reportType === "precious-full"
    ? "Precious Stone Full Report"
    : "Semi-Precious Full Report";
}

export function getGitReportDescription(reportType: GitReportType) {
  return reportType === "precious-full"
    ? "Gem identification + treatment check"
    : "Gem identification + treatment check";
}

export function isGitEnabledParam(value: string | null) {
  return value === "1" || value === "true" || value === "yes";
}

export function calculateGitVat(certificationFee: number) {
  return Math.round(certificationFee * GIT_CERTIFICATION_VAT_RATE);
}
