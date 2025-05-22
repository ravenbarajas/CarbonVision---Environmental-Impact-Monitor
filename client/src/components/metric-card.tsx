import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  changeValue: string;
  changeDirection: "up" | "down" | "none";
  className?: string;
}

const MetricCard = ({
  title,
  value,
  icon,
  changeValue,
  changeDirection,
  className,
}: MetricCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6 dark:bg-card", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</h3>
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{value}</p>
        </div>
        {icon}
      </div>
      <div className="flex items-center">
        <span
          className={cn(
            "inline-flex items-center text-sm",
            changeDirection === "up" && "text-red-600 dark:text-red-400",
            changeDirection === "down" && "text-green-600 dark:text-green-400"
          )}
        >
          {changeDirection !== "none" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "w-4 h-4 mr-1",
                changeDirection === "up" && "rotate-0",
                changeDirection === "down" && "rotate-180"
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7"></path>
              <path d="M12 19V5"></path>
            </svg>
          )}
          <span>{changeValue}</span>
        </span>
        <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-2">
          vs previous period
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
