// "use client";

import type { FC } from "react";
// import { motion } from "framer-motion";
import Image from "next/image";
import { PartnerTier } from "@prisma/client";
import { Marquee } from "@/components/Marquee";

interface PartenersClientProps {
  partners: {
    name: string;
    logo: string;
    tier: PartnerTier;
    url: string;
  }[];
}

function Logo({ src, url }: { src: string; url: string }) {
  return (
    <div className="flex justify-center items-center h-[100px]">
      <a target="_blank" rel="noopener noreferrer" href={url}>
        <Image
          alt="logo"
          width={150}
          height={150}
          src={src}
          quality={100}
          className="object-contain h-[150px] w-[150px]"
        />
      </a>
    </div>
  );
}

const PartenersClient: FC<PartenersClientProps> = ({ partners }) => {
  const numOnRow = 15;
  const padd = (num: number) =>
    isFinite(numOnRow / num + 1) ? Math.round(numOnRow / num + 1) : 0;

  // a dictioary with all the tiers with the respective x
  const tiersCount: { [key in PartnerTier]: number } = {
    [PartnerTier.DIAMOND]: padd(
      partners.filter((p) => p.tier === PartnerTier.DIAMOND).length
    ),
    [PartnerTier.PLATINUM]: padd(
      partners.filter((p) => p.tier === PartnerTier.PLATINUM).length
    ),
    [PartnerTier.GOLD]: padd(
      partners.filter((p) => p.tier === PartnerTier.GOLD).length
    ),
    [PartnerTier.COMMUNITY]: padd(
      partners.filter((p) => p.tier === PartnerTier.COMMUNITY).length
    ),
    [PartnerTier.MEDIA]: 7,
    [PartnerTier.INDIVIDUAL]: 0,
  };

  return (
    <section className="container" id="parteneri">
      <p className="text-4xl md:text-5xl text-center pb-10 font-bold">
        Parteneri
      </p>

      <div className="space-y-4 ">
        {partners.filter((p) => p.tier === PartnerTier.DIAMOND).length > 0 && (
          <div>
            <p className=" text-center font-bold text-2xl p-2">Diamond</p>
            <Marquee
              className="dark:bg-popover-foreground transition-colors rounded-xl border-2 bg-popover"
              pauseOnHover={true}
              numberOfCopies={
                partners.filter((p) => p.tier === PartnerTier.DIAMOND).length *
                8
              }
            >
              {partners
                .filter((p) => p.tier === PartnerTier.DIAMOND)
                .map((partner) => (
                  <Logo
                    key={partner.name}
                    src={partner.logo}
                    url={partner.url}
                  />
                ))}
            </Marquee>
          </div>
        )}

        {partners.filter((p) => p.tier === PartnerTier.PLATINUM).length > 0 && (
          <div>
            <p className=" text-center font-bold text-2xl p-2">Platinum</p>
            <Marquee
              className="dark:bg-popover-foreground transition-colors rounded-xl border-2 bg-popover"
              pauseOnHover={true}
              numberOfCopies={
                partners.filter((p) => p.tier === PartnerTier.PLATINUM).length *
                8
              }
              reverse
            >
              {partners
                .filter((p) => p.tier === PartnerTier.PLATINUM)
                .map((partner) => (
                  <Logo
                    key={partner.name}
                    src={partner.logo}
                    url={partner.url}
                  />
                ))}
            </Marquee>
          </div>
        )}

        {partners.filter((p) => p.tier === PartnerTier.GOLD).length > 0 && (
          <div>
            <p className=" text-center font-bold text-2xl p-2">Gold</p>
            <Marquee
              className="dark:bg-popover-foreground transition-colors rounded-xl border-2 bg-popover"
              pauseOnHover={true}
              numberOfCopies={
                partners.filter((p) => p.tier === PartnerTier.GOLD).length * 8
              }
            >
              {partners
                .filter((p) => p.tier === PartnerTier.GOLD)
                .map((partner) => (
                  <Logo
                    key={partner.name}
                    src={partner.logo}
                    url={partner.url}
                  />
                ))}
            </Marquee>
          </div>
        )}

        {partners.filter((p) => p.tier === PartnerTier.COMMUNITY).length >
          0 && (
          <div>
            <p className=" text-center font-bold text-2xl p-2">Community</p>
            <Marquee
              className="dark:bg-popover-foreground transition-colors rounded-xl border-2 bg-popover"
              pauseOnHover={true}
              numberOfCopies={
                partners.filter((p) => p.tier === PartnerTier.COMMUNITY)
                  .length * 8
              }
            >
              {partners
                .filter((p) => p.tier === PartnerTier.COMMUNITY)
                .map((partner) => (
                  <Logo
                    key={partner.name}
                    src={partner.logo}
                    url={partner.url}
                  />
                ))}
            </Marquee>
          </div>
        )}

        {/* {!!tiersCount.DIAMOND && (
          <div className="flex  overflow-hidden">
            {[...Array(tiersCount.DIAMOND)].map((index) => (
              <TranslateWrapper key={index + "a"} duration={50}>
                <LogoItemsTop
                  partners={partners.filter(
                    (p) => p.tier === PartnerTier.DIAMOND
                  )}
                  size={130}
                />
              </TranslateWrapper>
            ))}
          </div>
        )}
        {!!tiersCount.PLATINUM && (
          <div className="flex overflow-hidden mt-4">
            {[...Array(tiersCount.PLATINUM)].map((index) => (
              <TranslateWrapper key={index + "b"} reverse>
                <LogoItemsTop
                  partners={partners.filter(
                    (p) => p.tier === PartnerTier.PLATINUM
                  )}
                  size={110}
                />
              </TranslateWrapper>
            ))}
          </div>
        )}
        {!!tiersCount.GOLD && (
          <div className="flex overflow-hidden mt-4">
            {[...Array(tiersCount.GOLD)].map((index) => (
              <TranslateWrapper key={index + "c"} duration={25}>
                <LogoItemsTop
                  partners={partners.filter((p) => p.tier === PartnerTier.GOLD)}
                  size={90}
                />
              </TranslateWrapper>
            ))}
          </div>
        )}
        {!!tiersCount.COMMUNITY && (
          <div className="flex overflow-hidden mt-4">
            {[...Array(tiersCount.COMMUNITY)].map((index) => (
              <TranslateWrapper key={index + "d"} reverse duration={25}>
                <LogoItemsTop
                  partners={partners.filter(
                    (p) => p.tier === PartnerTier.COMMUNITY
                  )}
                  size={70}
                />
              </TranslateWrapper>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};

// const TranslateWrapper = ({
//   children,
//   reverse,
//   duration = 50,
// }: {
//   children: JSX.Element;
//   reverse?: boolean;
//   duration?: number;
// }) => {
//   return (
//     <motion.div
//       initial={{ translateX: reverse ? "-100%" : "0%" }}
//       animate={{ translateX: reverse ? "0%" : "-100%" }}
//       transition={{ duration, repeat: Infinity, ease: "linear" }}
//       className="flex gap-4 px-2"
//     >
//       {children}
//     </motion.div>
//   );
// };

// const LogoItemsTop = ({ partners, size }: { partners: any; size?: number }) => (
//   <>
//     {partners.map(
//       (partner: { name: string; logo: string; tier: PartnerTier }) => (
//         <LogoItem key={partner.name} partener={partner} size={size} />
//       )
//     )}
//   </>
// );

const LogoItem = ({
  partener: partner,
  size = 64,
}: {
  partener: any;
  size?: number;
}) => {
  return (
    <a
      href={partner.url}
      className="flex justify-center items-center dark:bg-popover-foreground transition-colors rounded-xl border-2 "
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <Image src={partner.logo} alt={partner.name} width={200} height={200} />
      </div>
    </a>
  );
};

export default PartenersClient;
