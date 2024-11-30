"use client";
import { toast } from "@/hooks/use-toast";
import { createFolder } from "@/lib/db/queries";
import { Folder } from "@/lib/db/supabase.types";
import { useAppState } from "@/lib/provider/state-provider";
import React, { useState, useEffect } from "react";
import TooltipComponent from "../global/tooltip-component";
import { PlusIcon } from "lucide-react";
import { Accordion } from "../ui/accordion";
import Dropdown from "./Dropdown";
import { v4 } from "uuid";
import { useSupabaseUser } from "@/lib/provider/supabase-user-provider";
import { useSubscriptionModal } from "@/lib/provider/subscription-modal-provider";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}
const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();
//   const { open, setOpen } = useSubscriptionModal();
  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state]);

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
    //   setOpen(true);
      return;
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date(),
      title: "Untitled",
      iconId: "📄",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create the folder",
      });
    } else {
      toast({
        title: "Success",
        description: "Created folder.",
      });
    }
  };
  return (
    <>
      <div
        className="flex
        sticky 
        z-20 
        top-0 
        bg-background 
        w-full  
        h-10 
        group/title 
        justify-between 
        items-center 
        pr-4 
        text-Neutrals/neutrals-8
  "
      >
        <span
          className="text-Neutrals-8 
        font-bold 
        text-xs"
        >
          FOLDERS
        </span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="group-hover/title:inline-block
            hidden 
            cursor-pointer
            hover:dark:text-white
          "
          />
        </TooltipComponent>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || ""]}
        className="pb-20"
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
