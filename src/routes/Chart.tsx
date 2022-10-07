import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import React from "react";
import { mapQueryStatusFilter } from "react-query/types/core/utils";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
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
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: new Date(Number(price.time_close) * 1000),
                  y: [price.open, price.high, price.low, price.close],
                };
              }) as unknown as number[],
            },
          ]}
          options={{
            xaxis: {
              labels: {
                datetimeFormatter: { month: "mmm 'yy" },
              },
              type: "datetime",
            },
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
              mode: false ? "dark" : "light",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
