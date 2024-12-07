"use client";

import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import { PatchApplicationSchemaType } from "@/lib/validators/application";
import { ApplicationStatus, Application } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import toast from "react-hot-toast";

interface AcceptParticipantButtonProps {
  application: Pick<Application, "id" | "status">;
}

const AcceptParticipantButton: FC<AcceptParticipantButtonProps> = ({
  application,
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: changeStatus, isLoading } = useMutation({
    mutationFn: async (values: PatchApplicationSchemaType) => {
      await axios.patch(`/api/application/${application.id}`, values);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          return toast.error("Could not change status");
        }

        if (err.response?.status === 403) {
          return toast.error("You are not allowed to do that");
        }

        return toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Status changed");
      setIsOpen(false);
      router.refresh();
      router.push("/applications");
    },
  });

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        isLoading={isLoading}
        disabled={application.status !== ApplicationStatus.PENDING}
      >
        {application.status === ApplicationStatus.PENDING
          ? "Accept participant"
          : "Participant already accepted"}
      </Button>

      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => changeStatus({ status: ApplicationStatus.ACCEPTED })}
        loading={isLoading}
      />
    </>
  );
};

export default AcceptParticipantButton;
