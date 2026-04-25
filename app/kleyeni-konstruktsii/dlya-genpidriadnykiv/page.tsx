import {
  buildSolutionSegmentMetadata,
  SolutionSegmentPage,
  type SolutionSegmentPageCopy,
} from "../../modulni-budynky/dlya-gromad/page";

const pageCopy: SolutionSegmentPageCopy = {
  breadcrumbLabel: "Для генпідрядників",
  heroEyebrow: "Клеєні конструкції для генпідрядників",
  heroTitle: "Клеєні конструкції для генпідрядників",
  metadataTitle: "Клеєні конструкції для генпідрядників | TimberX",
  metadataDescription:
    "Сторінка рішення TimberX для генпідрядників на базі клеєних конструкцій.",
  canonical: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/",
};

export const metadata = buildSolutionSegmentMetadata(pageCopy);

export default function GlulamForGeneralContractorsPage() {
  return <SolutionSegmentPage copy={pageCopy} />;
}
