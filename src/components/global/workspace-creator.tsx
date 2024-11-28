"use client";

import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/db/supabase.types";
import { useSupabaseUser } from "@/lib/provider/supabase-user-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const { toast } = useToast();
  const router = useRouter();
  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborator = (user: User) => {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  };
  return <div>WorkspaceCreator</div>;
};

export default WorkspaceCreator;
