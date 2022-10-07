import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import React from "react";
import { mapQueryStatusFilter } from "react-query/types/core/utils";

interface ChartProps {
  coinId: string;
}
interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "candle",

              data: [
                {
                  x: data?.map((v) => new Date(v.time_open)),
                  y: [
                    // data?.map((v) => v.open) as number[],
                    // data?.map((v) => v.high) as number[],
                    // data?.map((v) => v.low) as number[],
                    // data?.map((v) => v.close) as number[],
                    6608.91, 6618.99, 6608.01, 6612,
                  ],
                },
              ],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              type: "candlestick",
            },
            title: {
              text: "CandleStick Chart - Category X-axis",
              align: "left",
            },

            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
