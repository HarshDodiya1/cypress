export const dynamic = "force-dynamic";
import QuillEditor from "@/components/quill-editor/quill-editor";
import { getWorkspaceDetails } from "@/lib/db/queries";
import { redirect } from "next/navigation";

const WorkspacePage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const { data, error }: { data: any; error: any } = await getWorkspaceDetails(
    params.workspaceId
  );
  if (error || !data.length) redirect("/dashboard");
  return (
    <div className="relative">
      <QuillEditor
        dirType="workspace"
        fileId={params.workspaceId}
        dirDetails={data[0] || {}}
      />
    </div>
  );
};
export default WorkspacePage;
