"use client";

import type EditorJS from "@editorjs/editorjs";
import { useRef, type FC, useState, useEffect, useCallback } from "react";

import "@/styles/editor.css";
import EditorOutput from "./EditorOutput";

import TextArea from "./editor/text-area/TextArea";
import { uploadFile } from "@/lib/file-upload";

interface EditorProps {
  content?: any;
  onChange: (content: any) => void;
  holder: string;
}

const Editor: FC<EditorProps> = ({ content, onChange, holder }) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    // const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    // const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    // const TextArea = (await import("")).default;
    const CodeBox = (await import("@bomdi/codebox")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        onReady: () => {
          ref.current = editor;
          // console.log("Editor.js is ready to work!");
          content && ref.current.render(content);
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        placeholder: "Write something awesome...",
        tools: {
          header: Header,
          list: List,
          // code: Code,
          inlineCode: InlineCode,
          // table: Table,
          embed: Embed,
          checklist: Checklist,
          textarea: TextArea,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const imageUrl = await uploadFile(file);

                  return {
                    success: 1,
                    file: {
                      url: imageUrl,
                    },
                  };
                },
              },
            },
          },
          codeBox: {
            class: CodeBox,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initEditor]);

  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg">
      {/* <TextAreaAutosize
        placeholder="Title"
        className="w-full resize-none appearance-none bg-transparent border-none focus:outline-none text-5xl font-bold overflow-hidden"
      /> */}

      <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 min-h-[300px]">
        <div id={holder} className={`prose max-w-full`} />

        {/* <button
            type="button"
            onClick={save}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save
          </button> */}

        {/* <Button onClick={save} variant={"destructive"}>
          Save
        </Button> */}

        {/* <div className="absolute top-2 right-2 z-10"></div> */}
      </div>

      <div className="bg-background rounded-lg border  p-4">
        <EditorOutput content={content} />
      </div>
      {/* <EditorOutput content={content} /> */}
    </div>
  );
};

export default Editor;
