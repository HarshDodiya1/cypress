import { File, Folder, Workspace } from "@/lib/db/supabase.types";
import {
  appFoldersType,
  appWorkspacesType,
} from "@/lib/provider/state-provider";
import React from "react";
import CustomDialogTrigger from "../global/custom-dialog-trigger";
import BannerUploadForm from "./banner-upload-form";

interface BannerUploadProps {
  children: React.ReactNode;
  className?: string;
  dirType: "workspace" | "folder" | "file";
  id: string;
  details: appWorkspacesType | appFoldersType | File | Workspace | Folder;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  children,
  className,
  dirType,
  id,
  details,
}) => {
  return (
    <CustomDialogTrigger
      header="Upload Banner"
      content={<BannerUploadForm dirType={dirType} id={id} details={details} />}
      className={className}
    >
      {children}
    </CustomDialogTrigger>  
  );
};

export default BannerUpload;
