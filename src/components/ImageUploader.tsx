import Image from "next/image";
import { useState, type FC, useEffect } from "react";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { uploadFile } from "@/lib/file-upload";

interface ImageUploaderProps {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const [isOpened, setIsOpened] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const deleteImage = async (url: string) => {
    try {
      const key = url.split(".com/")[1];

      const res = await fetch(`/api/s3?key=${key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Previous image deleted", {
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("There was an error deleting your image");
    }
  };

  const uploadToS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    return await uploadFile(file);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const imageUrl = await uploadToS3(e);
      setIsOpened(false);
      setIsUploading(false);
      onChange(imageUrl || "");
    } catch (error) {
      toast.error("There was an error uploading your image");
    } finally {
      setIsUploading(false);
      setIsOpened(false);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => onRemove(url)}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-contain" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsOpened(true)}
        >
          <Icons.image className="h-4 w-4 mr-2" />
          Upload an Image
        </Button>
      </div>

      <Modal
        title="Upload Image"
        description="Upload a new image"
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <div>
          {/* DROPZONE for file upload rectangle "Drop an image here" */}
          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <div className="relative flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-md">
            {isUploading && (
              <div>
                <Icons.loading className="h-8 w-8 animate-spin text-black" />
              </div>
            )}

            {!isUploading && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                  onChange={handleSubmit}
                  disabled={isUploading}
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Icons.image className="h-8 w-8" />
                  <p>Drag your file here or click in this area.</p>
                </div>
              </>
            )}
          </div>
          {/* <Button type="submit">Upload</Button> */}
          {/* </form> */}
        </div>
      </Modal>
    </>
  );
};

export default ImageUploader;
