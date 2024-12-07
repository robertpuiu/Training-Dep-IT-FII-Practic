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

interface SearchSelectorProps extends PopoverProps {
  value: Value | undefined | null;
  onChange: (value: string) => void;
  options: Value[];
  placeholder?: string;
  disabled?: boolean;
}

const SearchSelector: FC<SearchSelectorProps> = ({
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
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-label={placeholder}
            aria-expanded={open}
            className="flex-1 justify-between max-w h-max"
          >
            {value ? value.name : placeholder}
            <Icons.arrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 md:w-max" align="start">
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search" />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[300px]">
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    // escape " in the name
                    value={option.name.replace(/"/g, "")}
                    onSelect={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                  >
                    {option.name}
                    <Icons.checkIn
                      className={cn(
                        "ml-auto h-4 w-4",
                        value?.id === option.id ? "opacity-100" : "opacity-0"
                      )}
                    />
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

export default SearchSelector;
