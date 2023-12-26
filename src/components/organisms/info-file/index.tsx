import DossierInfo from "@/components/molecules/dossier-info";
import { ProfileImageColumn } from "@/components/molecules";
import { cn } from "@/lib/cn";

import type { InfoFileComponentType, InfoFileType } from "./types";

const translatePrefix = (type: InfoFileType) => {
  switch (type) {
    case "instructor":
      return "Instructor";
    case "student":
      return "Student";
    case "licenseFile":
      return "LicenseFile";
    case "vehicle":
      return "Vehicle";
    default:
      return "";
  }
};

const InfoFile: InfoFileComponentType = ({ data, type }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 gap-8",
        type !== "licenseFile" ? "md:grid-cols-[200px_1fr]" : "md:grid-cols-1",
      )}
    >
      {type !== "licenseFile" && (
        <ProfileImageColumn
          profilePictureUrl={data.profilePictureUrl}
          fullName={data.info.fullName}
          type={type}
        />
      )}
      <div
        className={cn(
          "grid w-full grid-cols-1 gap-6",
          type === "licenseFile" ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
        style={{
          gridTemplateRows: "auto 1fr",
        }}
      >
        {Object.keys(data.info).map((key) => (
          <DossierInfo
            key={key}
            labelId={key}
            translatePrefix={translatePrefix(type)}
            value={data.info[key as keyof typeof data.info]}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoFile;
