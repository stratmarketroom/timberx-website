import {
  buildSolutionSegmentMetadata,
  SolutionSegmentPage,
  type SolutionSegmentPageCopy,
} from "../dlya-gromad/page";

const pageCopy: SolutionSegmentPageCopy = {
  breadcrumbLabel: "Для забудовників",
  heroEyebrow: "Модульні будинки для забудовників",
  heroTitle: "Модульні будинки для забудовників",
  metadataTitle: "Модульні будинки для забудовників | TimberX",
  metadataDescription:
    "Сторінка рішення TimberX для забудовників на базі модульних будинків.",
  canonical: "/modulni-budynky/dlya-zhk/",
};

export const metadata = buildSolutionSegmentMetadata(pageCopy);

export default function ModularHomesForBuildersPage() {
  return <SolutionSegmentPage copy={pageCopy} />;
}
