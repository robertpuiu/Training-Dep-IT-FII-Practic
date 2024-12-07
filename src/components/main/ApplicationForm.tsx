"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  BackendApplicationSchemaType,
  FrontendApplicationSchema,
  FrontendApplicationSchemaType,
} from "@/lib/validators/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { OutputData } from "@editorjs/editorjs";
import EditorOutputForm from "@/components/EditorOutputForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

interface ApplicationFormProps {
  questions: { id: string; content: OutputData; trainingId: string | null }[];
  showSubmitButton?: boolean;
  alreadyApplied?: boolean;
}

export const ApplicationForm = ({
  questions,
  showSubmitButton = true,
  alreadyApplied = false,
}: ApplicationFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: createApplication, isLoading: isCreating } = useMutation({
    mutationFn: async (values: BackendApplicationSchemaType) => {
      const { data } = await axios.post("/api/application", values);
      return data as string;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          return toast.error("Application already exists!");
        }

        if (err.response?.status === 500) {
          return toast.error("Invalid application data!");
        }
      }

      return toast.error("Something went wrong!");
    },
    onSuccess: () => {
      toast.success("Application created!");
      router.refresh();
      router.push(`${pathname}/success`);
    },
  });

  const form = useForm<FrontendApplicationSchemaType>({
    resolver: zodResolver(FrontendApplicationSchema),
    defaultValues: {
      questions: questions.reduce(
        (
          acc: {
            [key: string]: { answers: string | string[] };
          },
          question
        ) => {
          acc[question.id] = {
            // check if it has a field type with a value of checklist
            // if it does, then return an array of booleans
            // if it doesn't, then return an empty string
            answers: question.content.blocks.find(
              (block) => block.type === "checklist"
            )
              ? []
              : "",
            // ?.data?.items.map((item) => item.checked) ?? "",
          };
          return acc;
        },
        {}
      ),
    },
  });

  const onSubmit = async (values: FrontendApplicationSchemaType) => {
    // extract answers from values in a array
    const flattedValues = Object.values(values.questions).map(
      (question: { answers: string | string[] }) => question.answers
    );

    // show error if form is invalid
    questions.forEach((question) => {
      const values = flattedValues.shift();

      question.content.blocks.forEach((block) => {
        switch (block.type) {
          case "checklist":
            block.data.items = block.data.items.map(
              (item: { text: string; checked: boolean }) => {
                if (values?.includes(item.text)) {
                  return { ...item, checked: true };
                } else {
                  return { ...item, checked: false };
                }
              }
            );

            // console.log(block.data);
            // console.log(flattedValues.shift());

            break;
          case "textarea":
            // const newValue = flattedValues.shift();
            block.data.url = values;
            // console.log(block.data);
            // console.log(values);
            break;
          default:
            break;
        }
      });
    });

    // const values

    createApplication({
      questions,
      trainingId: questions[0].trainingId ?? "",
      // questions,
      // user
    });
  };

  if (alreadyApplied) {
    return (
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-2xl font-semibold">You already applied!</h1>
        <p className="text-lg">You can only apply once per training.</p>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-4 md:px-0"
        >
          <div className="grid grid-cols-1 gap-4">
            {questions.map((question, i) => (
              <Card key={question.id}>
                <CardHeader>
                  <h1 className="text-2xl font-semibold border-b-2">
                    {`Question ${i + 1}`}
                  </h1>
                </CardHeader>

                <CardContent>
                  <EditorOutputForm
                    content={question.content}
                    id={question.id}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          {showSubmitButton && (
            <div className="flex gap-4 md:flex-row-reverse flex-col-reverse items-end">
              <Button type="submit" isLoading={isCreating}>
                Submit
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};
