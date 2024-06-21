import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

const uploadPreset = "ce5bccsg";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = (result: any) => {
    const uploadedUrls = result.info.secure_url;
    onChange([...value, uploadedUrls]);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        multiple: true,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="
            relative
            cursor-pointer
            transition
            border-dashed 
            border-gray-300
            p-10
            rounded-lg
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-gray-600
            mt-[-2rem]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-7 12V10m0 12v-5m0 5H9m3 0h3"
            />
          </svg>
          <div className="font-semibold text-lg">Click to upload</div>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
