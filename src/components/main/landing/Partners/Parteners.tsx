import type { FC } from "react";
// import Section from "../Section";

import { db } from "@/lib/db";
import PartenersClient from "./PartnersClient";

interface PartenersProps {}

const Parteners: FC<PartenersProps> = async ({}) => {
  const partners = await db.partner.findMany();

  if (!partners.length) {
    return null;
  }

  const partnersList = partners.map((partner) => ({
    name: partner.name,
    logo: partner.imageUrl,
    tier: partner.tier,
    url: partner.url,
  }));

  return <PartenersClient partners={partnersList} />;
};

export default Parteners;
