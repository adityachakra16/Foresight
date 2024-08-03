import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type props = {
  title: string;
  description: string;
  image: string;
  noIndex?: boolean;
  noFollow?: boolean;
};
export default function MetaHead({
  title,
  description,
  image,
  noIndex = false,
  noFollow = false,
}: props): JSX.Element {
  const siteURL = "foreseer.finance";
  const pathName = useRouter().pathname;
  const pageURL = pathName === "/" ? siteURL : siteURL + pathName;
  const twitterHandle = "@adityach4u";
  const siteName = "Foreseer Finance";
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={pageURL}
      openGraph={{
        type: "website",
        locale: "en_US", //  Default is en_US
        url: pageURL,
        title,
        description: description,
        images: [
          {
            url: image,
            alt: "Dappy Finance",
          },
        ],
        site_name: siteName,
      }}
      twitter={{
        handle: twitterHandle,
        site: twitterHandle,
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          property: "author",
          content: title,
        },
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: `/logoBlackBg.svg`,
        },
      ]}
      noindex={noIndex}
      nofollow={noFollow}
    />
  );
}
