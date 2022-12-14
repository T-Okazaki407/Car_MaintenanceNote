import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time: string, gasoline?: number) {
  return { time, gasoline };
}

const data = [
  createData("", 12.5),
  createData("", 13.2),
  createData("", 12.8),
  createData("", 15.1),
  createData("", 14.3),
  createData("", 11.8),
  createData("", 13.5),
  createData("前々回", 14.0),
  createData("前回", 12.5),
];

export default function ConsumptionChart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>燃費推移</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              燃費(km/L)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="gasoline"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
