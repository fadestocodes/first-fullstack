import { cn } from "@/lib/utils";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    ShoppingCart,
    CreditCard,
    type LucideIcon,
    Car,
} from "lucide-react";
import {Card} from './card'

interface Transaction {
    id: string;
    title: string;
    amount: string;
    type: "incoming" | "outgoing";
    category: string;
    icon: LucideIcon;
    timestamp: string;
    status: "completed" | "pending" | "failed";
}

interface List02Props {
    transactions?: Transaction[];
    className?: string;
}

const categoryStyles = {
    shopping:
        "from-violet-600/10 via-violet-600/5 to-violet-600/0 text-violet-700 dark:from-violet-500/20 dark:via-violet-500/10 dark:to-transparent dark:text-violet-400",
    food: "from-orange-600/10 via-orange-600/5 to-orange-600/0 text-orange-700 dark:from-orange-500/20 dark:via-orange-500/10 dark:to-transparent dark:text-orange-400",
    transport:
        "from-blue-600/10 via-blue-600/5 to-blue-600/0 text-blue-700 dark:from-blue-500/20 dark:via-blue-500/10 dark:to-transparent dark:text-blue-400",
    entertainment:
        "from-pink-600/10 via-pink-600/5 to-pink-600/0 text-pink-700 dark:from-pink-500/20 dark:via-pink-500/10 dark:to-transparent dark:text-pink-400",
};

const TRANSACTIONS: Transaction[] = [
    {
        id: "1",
        title: "Albuquerque, New Mexico",
        amount: "$999.00",
        type: "outgoing",
        category: "shopping",
        icon: ShoppingCart,
        timestamp: "Jan, 2025",
        status: "completed",
    },
    {
        id: "2",
        title: "Philppines - Japan",
        amount: "$4,500.00",
        type: "incoming",
        category: "transport",
        icon: Wallet,
        timestamp: "May 2025",
        status: "completed",
    },
    {
        id: "3",
        title: "Japan.. Again?",
        amount: "$15.99",
        type: "outgoing",
        category: "entertainment",
        icon: CreditCard,
        timestamp: "Fall 2025",
        status: "pending",
    },
];

export default function List02({
    transactions = TRANSACTIONS,
    className,
}: List02Props) {
    return (
        
        <Card
        >
            <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                    <h3 className="flex flex-col items-center text-xl text-center">
                        Upcoming Trips
                    </h3>
                   
                </div>

                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={cn(
                                "group relative flex flex-col items-start gap-4",
                                "p-3 -mx-3 rounded-2xl",
                                "transition-all duration-300 ease-out",
                                "border border-transparent",
                            )}
                        >
                            {/* <div
                                className={cn(
                                    "relative",
                                    "w-12 h-12 flex items-center justify-center",
                                    "rounded-2xl",
                                    "bg-gradient-to-br",
                                    categoryStyles[
                                        transaction.category as keyof typeof categoryStyles
                                    ],
                                    "transition-all duration-300",
                                    "shadow-sm"
                                )}
                            >
                                <transaction.icon className="w-5 h-5" />
                            </div> */}

                            <div className="flex items-center justify-between ">
                                <div className="space-y-1 min-w-0">
                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 ">
                                        {transaction.title}
                                    </p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {transaction.timestamp}
                                    </p>
                                <hr />
                                </div>

                                <div
                                    className={cn(
                                        "flex items-center gap-2 flex-shrink-0 pl-4",
                                        "transition-transform duration-300",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-base font-semibold",
                                            transaction.type === "incoming"
                                                ? "text-emerald-700 dark:text-emerald-400"
                                                : "text-zinc-900 dark:text-zinc-100"
                                        )}
                                    >
                                       
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>

        </Card>
    );
}
