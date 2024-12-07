import { useState, type FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Icons } from "./Icons";
import { PopoverProps } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

type Value = {
  id: string;
  name: string;
};

interface MultiSearchSelectorProps extends PopoverProps {
  value: Value[] | undefined | null;
  onChange: (value: string) => void;
  options: Value[];
  placeholder?: string;
  disabled?: boolean;
}

const MultiSearchSelector: FC<MultiSearchSelectorProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger
          asChild
          disabled={disabled}
          className="overflow-visible bg-transparent"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-label={placeholder}
            aria-expanded={open}
            className="flex gap-1 flex-wrap"
          >
            <Icons.arrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search" />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px]">
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                  >
                    {option.name}
                    {value?.find((v) => v.id === option.id) && (
                      <Icons.checkIn
                        className={cn(
                          "ml-auto h-4 w-4"
                          // value?.id === option.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Component to render multiple selected items
const SelectedItems = ({
  items,
  onRemove,
}: {
  items: Value[];
  onRemove: (item: Value) => void;
}) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-gray-100 rounded-full px-3 py-1 m-1"
        >
          <span className="text-xs font-semibold text-gray-600 uppercase">
            {item.name}
          </span>
          <button
            type="button"
            className="text-xs w-4 h-4 ml-2 rounded-full bg-red-600 text-white flex items-center justify-center"
            onClick={() => onRemove(item)}
          >
            <span className="sr-only">Remove</span>
            {/* <Icons.close className="w-3 h-3" /> */}
          </button>
        </div>
      ))}
    </>
  );
};

export default MultiSearchSelector;
