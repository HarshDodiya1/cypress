import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import db from "@/lib/db/db";
import { getUserSubscriptionStatus } from "@/lib/db/queries";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session: any = await getServerSession(authOptions);
  if (!session) return;
  const user = session.user;
  const workspace = await db.workspace.findFirst({
    where: {
      workspaceOwner: user.id!,
    },
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(session?.user?.id);

  if (subscriptionError) return;

  if (!workspace)
    return (
      <div
        className="bg-background
      h-screen
      w-screen
      flex
      justify-center
      items-center
"
      >
        <DashboardSetup user={session.user} subscription={subscription} />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;
