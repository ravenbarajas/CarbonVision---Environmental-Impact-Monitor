import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  chart: ReactNode;
  footer?: ReactNode;
}

const ChartCard = ({ title, chart, footer }: ChartCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container h-[300px]">
          {chart}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
