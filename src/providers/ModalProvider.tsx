"use client";

import CompanyModal from "@/components/modals/CompanyModal";
import { useState, type FC, useEffect } from "react";

const ModalProvider: FC = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CompanyModal />
    </>
  );
};

export default ModalProvider;
