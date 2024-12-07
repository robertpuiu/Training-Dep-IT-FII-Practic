"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import CustomCodeRenderer from "./renders/CustomCodeRenderer";
import TextAreaAutosize from "react-textarea-autosize";
import { Checkbox } from "./ui/checkbox";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  // image: CustomImageRenderer,
  code: CustomCodeRenderer,
  checklist: ({ data }: any) => {
    return (
      <div className="grid grid-cols-1 gap-2 py-2">
        {data.items.map((item: { checked: boolean; text: string }) => {
          return (
            <div
              className="flex flex-row items-start space-x-3 space-y-0"
              key={item.text}
            >
              {/* <input type="checkbox" className="form-checkbox" />
          <p>{item.text}</p> */}
              <Checkbox
                className="w-6 h-6"
                id={item.text}
                checked={item.checked}
              />
              <label
                htmlFor={item.text}
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.text}
              </label>
            </div>
          );
        })}
      </div>
    );
  },
  textarea: ({ data }: any) => {
    return (
      <div className="border border-zinc-200">
        <TextAreaAutosize
          value={data.url}
          placeholder="Write something..."
          className="w-full resize-none appearance-none bg-transparent border-none focus:outline-none
          border border-zinc-200 rounded-md p-4"
        />
      </div>
    );
  },
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <article className="prose max-w-none dark:prose-invert">
      <Output renderers={renderers} data={content} />
    </article>
  );
};

export default EditorOutput;
