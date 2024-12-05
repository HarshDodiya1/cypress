import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateFile, updateFolder, updateWorkspace } from "@/lib/db/queries";
import { File, Folder, Workspace } from "@/lib/db/supabase.types";
import { supabase } from "@/lib/db/supabaseClient";
import {
  appFoldersType,
  appWorkspacesType,
  useAppState,
} from "@/lib/provider/state-provider";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface BannerUploadFormProps {
  dirType: "workspace" | "file" | "folder";
  id: string;
  details: appWorkspacesType | appFoldersType | File | Workspace | Folder;
}

const BannerUploadForm: React.FC<BannerUploadFormProps> = ({
  dirType,
  id,
  details,
}) => {
  const { state, workspaceId, folderId, dispatch } = useAppState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isUploading, errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
    defaultValues: { banner: "" },
  });
  const onSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    const file = values.banner?.[0];
    if (!file || !id) return;
    try {
      let filePath = "";
      const uploadBannerImage = async () => {
        const { data, error } = await supabase.storage
          .from("file-banners")
          .upload(`banner-${id}`, file, {
            cacheControl: "5",
            upsert: true,
          });
        if (error) throw new Error();
        filePath = data.path;
      };
      if (dirType === "file") {
        if (!workspaceId || !folderId) return;
        await uploadBannerImage();
        dispatch({
          type: "UPDATE_FILE_DATA",
          payload: {
            file: { bannerUrl: filePath },
            fileId: id,
            folderId,
            workspaceId,
          },
        });
        await updateFile({ bannerUrl: filePath }, id);
      } else if (dirType === "workspace") {
        if (!workspaceId) return;
        await uploadBannerImage();
        dispatch({
          type: "UPDATE_WORKSPACE_DATA",
          payload: {
            workspace: { bannerUrl: filePath },
            workspaceId,
          },
        });
        await updateWorkspace({ bannerUrl: filePath }, id);
      } else if (dirType === "folder") {
        if (!workspaceId || !folderId) return;
        await uploadBannerImage();
        dispatch({
          type: "UPDATE_FOLDER_DATA",
          payload: {
            folderId: id,
            folder: { bannerUrl: filePath },
            workspaceId,
          },
        });
        await updateFolder({ bannerUrl: filePath }, id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-2"
    >
      <Label className="text-sm text-muted-foreground" htmlFor="bannerImage">
        Banner Image
      </Label>
      <Input
        id="bannerImage"
        type="file"
        accept="image/*"
        disabled={isUploading}
        className="bg-background"
        {...register("banner", { required: "Banner Image is required" })}
      />
      <small className="text-red-600">
        {errors?.banner?.message?.toString()}
      </small>
      <Button disabled={isUploading} type="submit">
        {!isUploading ? "Upload Banner" : <Loader />}
      </Button>
    </form>
  );
};

export default BannerUploadForm;
