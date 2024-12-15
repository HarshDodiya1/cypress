import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateFile, updateFolder, updateWorkspace } from "@/lib/db/queries";
import { supabase } from "@/lib/db/supabaseClient";
import { useAppState } from "@/lib/provider/state-provider";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface BannerUploadFormProps {
  dirType: "workspace" | "file" | "folder";
  id: string;
}

const BannerUploadForm: React.FC<BannerUploadFormProps> = ({ dirType, id }) => {
  const { workspaceId, folderId, dispatch } = useAppState();

  const {
    register,
    handleSubmit,
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
            cacheControl: "3600",
            upsert: true,
          });
        if (error) {
          throw new Error();
        }
        filePath = data?.path;
      };
      if (dirType === "file") {
        if (!workspaceId || !folderId) return;
        await uploadBannerImage();
        dispatch({
          type: "UPDATE_FILE",
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
          type: "UPDATE_WORKSPACE",
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
          type: "UPDATE_FOLDER",
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
