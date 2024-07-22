"use client";

import clsx from "clsx";
import { FC } from "react";
import { Area, AreaChart, Tooltip } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

type IProps = {
  data: {
    id: number;
    probabilities: {
      probability: number;
      date: Date;
    }[];
  }[];
};

const BinocularAreaChart: FC<IProps> = ({ data }) => {
  const flattenedData = data.flatMap((d) =>
    d.probabilities.map((p) => ({
      id: d.id,
      date: new Date(p.date).toLocaleDateString(),
      probability: p.probability,
    })),
  );

  const chartConfig = data.reduce((acc, { id }) => {
    acc[id] = {
      label: `Face ${id + 1}`,
      color: `hsl(var(--chart-${id + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer className={clsx("h-1/5 w-full")} config={chartConfig}>
      <AreaChart
        data={flattenedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {Object.keys(chartConfig).map((key, idx) => (
            <linearGradient
              id={`color${key}`}
              key={key}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset={idx === 0 ? "5%" : "0%"}
                stopColor={chartConfig[key].color}
                stopOpacity={0.8}
              />
              <stop
                offset={idx === 0 ? "95%" : "100%"}
                stopColor={chartConfig[key].color}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <Tooltip content={<ChartTooltipContent />} />
        {data.map((d) => (
          <Area
            className="h-full w-full"
            dataKey="probability"
            fill={`url(#color${d.id})`}
            fillOpacity={1}
            key={d.id}
            name={`Face ${d.id + 1}`}
            stroke={chartConfig[d.id].color}
            type="monotone"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};

export default BinocularAreaChart;
