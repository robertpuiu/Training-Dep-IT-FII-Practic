"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { ScrollArea } from "./ui/scroll-area";

type Value = {
  id: string;
  name: string;
};

interface MultiSelectProps {
  values: Value[] | undefined | null;
  onChange: (values: Value[]) => void;
  options: Value[];
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  values,
  onChange,
  options,
  placeholder,
  disabled,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (item: Value) => {
      if (!values) {
        return;
      }
      // setSelected((prev) => prev.filter((s) => s.id !== framework.id));
      onChange(values.filter((s) => s.id !== item.id));
    },
    [values, onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            if (values && values.length > 0) {
              onChange(values?.slice(0, -1));
            }
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [values, onChange]
  );

  const selectables = React.useMemo(() => {
    if (!values) {
      return options;
    }

    return options.filter((item) => !values.find((v) => v.id === item.id));
  }, [options, values]);

  return (
    <div>
      <Command onKeyDown={handleKeyDown} className="overflow-visible">
        <div className="group border bg-background border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {values?.map((item) => {
              return (
                <Badge key={item.id} variant="secondary">
                  {item.name}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        {open && selectables.length > 0 ? (
          <div className="relative top-2">
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <ScrollArea className="h-[300px]">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((item) => {
                    return (
                      <CommandItem
                        key={item.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          onChange([...(values || []), item]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {item.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </ScrollArea>
            </div>
          </div>
        ) : null}
      </Command>
    </div>
  );
}
