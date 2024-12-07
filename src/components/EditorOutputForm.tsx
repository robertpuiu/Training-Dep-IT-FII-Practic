"use client";

import { FC, useMemo } from "react";
import dynamic from "next/dynamic";
import CustomCodeRenderer from "./renders/CustomCodeRenderer";
import TextAreaAutosize from "react-textarea-autosize";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputFormProps {
  content: any;
  id: string;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutputForm: FC<EditorOutputFormProps> = ({ content, id }) => {
  const form = useFormContext();

  const renderers = useMemo(
    () => ({
      // image: CustomImageRenderer,
      code: CustomCodeRenderer,
      checklist: ({ data }: any) => {
        // console.log(data);
        return (
          <FormField
            control={form.control}
            name={`questions.${id}.answers`}
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 gap-4 py-2">
                  {data.items.map(
                    (item: { checked: boolean; text: string }) => (
                      <FormField
                        key={item.text}
                        control={form.control}
                        name={`questions.${id}.answers`}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.text}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  className="w-6 h-6"
                                  checked={field.value?.includes(item.text)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.text,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) =>
                                              value !== item.text
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-base font-normal">
                                {item.text}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          // </div>
        );
      },
      textarea: ({ data }: any) => {
        // console.log(data);
        return (
          // <div className="border border-zinc-200">

          <FormField
            control={form.control}
            // name="bio"
            name={`questions.${id}.answers`}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Bio</FormLabel> */}
                <FormControl>
                  {/* <Textarea
                  placeholder="Tell us a little bit about yourself"
                  // className="resize-none"
                  className="border border-zinc-200 rounded-md p-4 shadow"
                  {...field}
                /> */}

                  <TextAreaAutosize
                    minRows={3}
                    // value={field.value}
                    // onChange={field.onChange}
                    // onFocus={field.onFocus}
                    placeholder="Raspunde aici..."
                    className="w-full resize-none appearance-none bg-transparent dark:border-input focus:outline-none overflow-hidden
                    border light:border-zinc-200 rounded-md p-4 shadow"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    }),
    [id]
  );

  return (
    <article className="prose dark:prose-invert max-w-none">
      <Output
        // style={style}
        renderers={renderers}
        data={content}
      />
    </article>
  );
};

export default EditorOutputForm;
