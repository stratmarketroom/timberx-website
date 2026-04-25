import {
  buildSolutionSegmentMetadata,
  SolutionSegmentPage,
  type SolutionSegmentPageCopy,
} from "../dlya-gromad/page";

const pageCopy: SolutionSegmentPageCopy = {
  breadcrumbLabel: "Для девелоперів",
  heroEyebrow: "Модульні будинки для девелоперів",
  heroTitle: "Модульні будинки для девелоперів",
  metadataTitle: "Модульні будинки для девелоперів | TimberX",
  metadataDescription:
    "Сторінка рішення TimberX для девелоперів на базі модульних будинків.",
  canonical: "/modulni-budynky/dlya-developeriv/",
};

export const metadata = buildSolutionSegmentMetadata(pageCopy);

export default function ModularHomesForDevelopersPage() {
  return <SolutionSegmentPage copy={pageCopy} />;
}
