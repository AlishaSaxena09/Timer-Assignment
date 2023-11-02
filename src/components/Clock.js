import "../App.css";
import React from "react";
import { RadialBarChart, RadialBar } from "recharts";

const getMinutesSinceMidnight = (timeString) => {
  const [hour, minutes] = timeString.split(":");
  return Number(hour) * 60 + Number(minutes || 0);
};
const timeSlots = [
  {
    startTime: "07:00",
    endTime: "09:00",
  },
  {
    startTime: "15:00",
    endTime: "21:00",
  },
];

function calculateDataForChart(timeSlots) {
  return timeSlots.map((timeSlot) => ({
    startTime: getMinutesSinceMidnight(timeSlot.startTime),
    endTime: getMinutesSinceMidnight(timeSlot.endTime),
    value:
      getMinutesSinceMidnight(timeSlot.endTime) -
      getMinutesSinceMidnight(timeSlot.startTime),
    startAngle: 450 - getMinutesSinceMidnight(timeSlot.startTime) / 4,
    endAngle: 450 - getMinutesSinceMidnight(timeSlot.endTime) / 4,
    fill: "#9F95ED",
  }));
}

const chartData = calculateDataForChart(timeSlots);

export default function Clock() {
  return (
    // Responsive container doesn't support rendering list
    // <ResponsiveContainer width="100%" height="100%">
    <div className="clock-container">
      {chartData.map((record) => {
        return (
          <RadialBarChart
            height={200}
            width={200}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={200}
            barSize={10}
            data={[record]}
            startAngle={record.startAngle}
            endAngle={record.endAngle}
          >
            <RadialBar
              cornerRadius={"50%"}
              background
              clockWise
              dataKey="value"
            />
          </RadialBarChart>
        );
      })}
      <div className="divider first" />
      <div className="divider second" />
      <div className="clock-border" />

      <div className="test1">Night</div>
      <div className="test3">Morning</div>
      <div className="test2">Afternoon</div>
      <div className="test4">Evening</div>
      {new Array(48).fill(null).map((_, i) => {
        if (i % 4 === 0) {
          return (
            <div
              className={`labelled-hour-marker ${
                i % 12 === 0 ? "bold-label" : ""
              }`}
              style={{ "--deg": `${i * 7.5}deg` }}
            >
              <span>{i / 2}</span>
            </div>
          );
        }
        return (
          <div
            className="half-hour-marker"
            style={{ "--deg": `${i * 7.5}deg` }}
          />
        );
      })}
    </div>
  );
}
