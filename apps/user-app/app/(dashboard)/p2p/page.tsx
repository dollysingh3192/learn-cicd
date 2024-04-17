import { getServerSession } from "next-auth";
import { OnP2PTransfer } from "../../../components/OnP2PTransfer";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnP2PTransfers() {
  const session = await getServerSession(authOptions);
  const txns1 = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  console.log("🚀 ~ getOnP2PTransfers ~ txns1:", txns1);
  const txns2 = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });
  console.log("🚀 ~ getOnP2PTransfers ~ txns2:", txns2);

  const send = txns1.map((t) => ({
    id: t.id,
    time: t.timestamp,
    amount: t.amount,
  }));

  const receive = txns2.map((t) => ({
    id: t.id,
    time: t.timestamp,
    amount: t.amount,
  }));

  return { send, receive };
}

export default async function () {
  const transactions = await getOnP2PTransfers();

  return (
    <div className="w-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <SendCard />
        <div>
          <OnP2PTransfer transactions={transactions.send} label={"Send"} />
          <OnP2PTransfer
            transactions={transactions.receive}
            label={"Receive"}
          />
        </div>
      </div>
    </div>
  );
}
