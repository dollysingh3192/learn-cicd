import { Card } from "@repo/ui/card";

export const OnP2PTransfer = ({
  transactions,
  label,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
  }[];
  label: string;
}) => {
  if (!transactions.length) {
    return (
      <Card
        title={
          label === "Send" ? "Recent Send History" : "Recent Receive History"
        }
      >
        <div className="text-center pb-8 pt-8">No transactions</div>
      </Card>
    );
  }
  return (
    <Card
      title={
        label === "Send" ? "Recent Send History" : "Recent Receive History"
      }
    >
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between" key={t.id}>
            <div>
              <div className="text-sm">{label} INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {label === "Send" ? "-" : "+"} Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
