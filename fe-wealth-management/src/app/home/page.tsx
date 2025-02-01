"use client";
import "../../../styles/global.css";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  DollarSign,
  LineChart,
  PiggyBank,
  Plus,
  Wallet,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useRef, useState } from "react";

export default function WealthDashboard() {
  const [data, setData] = useState();
  const [addGoal, setAddGoal] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [goalData, setGoalData] = useState();
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const colors = ["blue", "green", "yellow", "purple", "pink", "cyan"];

  const fetchData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      emailAddress: "user@example.com",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/email", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let map = {};
        let totalSpend = 0;
        result.transactions.map((transaction) => {
          totalSpend += transaction.amount;
          if (map[transaction.category]) {
            map[transaction.category] += transaction.amount;
          } else {
            map[transaction.category] = transaction.amount;
          }
        });
        let data: { label: string; value: number }[] = [];
        for (let key in map) {
          data.push({
            label: key,
            value: Math.round((map[key] * 10000) / totalSpend) / 100,
          });
        }
        setGraphData(data);
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    console.log("Manveer 2", data);
  }, []);

  useEffect(() => {
    console.log("Manveer 2", data?.balance);
  }, [data]);

  const valueFormatter = (item) => `${item.value}%`;

  const goalInputRef = useRef(null);
  const onGoal = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      goal: goalInputRef?.current?.value,
      data: data,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/goals", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddGoal(false);
        setGoalData(result);
      })
      .catch((error) => console.error(error));
  };

  const currentMonth = monthNames[new Date().getMonth()];
  return (
    <div className="flex min-h-screen flex-col gap-4 p-4 md:p-8 bg-slate-50">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-zinc-500">{`Here's your financial overview ${
          currentMonth ? `for ${currentMonth}` : ""
        } ${currentYear ? ` ${currentYear}` : ""}`}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Balance</h3>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold">$ {data?.balance}</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="h-4 w-4" />
            4.3% from last month
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
          <div className="h-full flex flex-col mx-auto">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Spending Breakdown</h2>
              <p className="text-sm text-zinc-500">Your recent spends</p>
            </div>
            <div className="h-full w-full items-center">
              <PieChart
                leftAxis={{ position: "right" }}
                series={[
                  {
                    data: graphData,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    valueFormatter,
                  },
                ]}
                height={200}
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Portfolio Breakdown</h2>
            <p className="text-sm text-zinc-500">Your asset allocation</p>
          </div>
          <div className="space-y-4">
            {data?.investments?.list.map((investment, index) => {
              const investmentPercentage =
                Math.round(
                  (investment?.amount * 10000) /
                    data?.investments?.totalInvestments
                ) / 100;
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full bg-${colors[index]}-500`}
                      />
                      {investment?.name}({investmentPercentage}%)
                    </div>
                    <span>${investment?.amount}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full bg-${colors[index]}-500`}
                      style={{ width: `${investmentPercentage}vw` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-sm text-zinc-500">
              Your latest financial activities
            </p>
          </div>
          <div className="space-y-4">
            {data?.transactions?.slice(0, 5)?.map((transaction) => {
              return (
                <div className="flex items-center gap-4">
                  {transaction?.type === "Credit" ? (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                      <ArrowDown className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                      <ArrowUp className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {transaction?.type === "Credit"
                        ? `Received from ${transaction?.from}`
                        : `Sent to ${transaction?.from}`}
                    </p>
                    <p className="text-xs text-zinc-500">Oct 24, 2023</p>
                  </div>
                  <div className="text-right">
                    {transaction?.type === "Credit" ? (
                      <p className="text-sm font-medium text-green-600">
                        +${transaction?.amount}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-red-600">
                        -${transaction?.amount}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {addGoal ? (
        <div>
          <h1 className="text-lg font-semibold">Goals</h1>
          <p className="text-sm text-zinc-500">Your financial aspirations</p>
          <textarea
            ref={goalInputRef}
            className="border rounded-md my-2 px-2 py-1 w-[400px] h-[100px]"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Ideal Portfolio</h2>
              <p className="text-sm text-zinc-500">How your asset allocation should be</p>
            </div>
          <div className="space-y-4">
            {/* update from here */}
            {goalData?.investments?.list.map((investment, index) => {
              const investmentPercentage =
                Math.round(
                  (investment?.amount * 10000) /
                    data?.investments?.totalInvestments
                ) / 100;
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full bg-${colors[index]}-500`}
                      />
                      {investment?.name}({investmentPercentage}%)
                    </div>
                    <span>${investment?.amount}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full bg-${colors[index]}-500`}
                      style={{ width: `${investmentPercentage}vw` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Strategy Overview</h2>
              {/* <p className="text-sm text-zinc-500">we can only advice you</p> */}
            </div>
            <div className="space-y-4">hey you</div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {addGoal ? (
          <button
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            onSubmit={() => {
              onGoal();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            {"Add Goals"}
          </button>
        ) : (
          <button
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            onSubmit={() => {
              setAddGoal(true);
            }}
          >
            {"Done"}
          </button>
        )}
        {/* <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black">
          <Clock className="mr-2 h-4 w-4" />
          Transaction History
        </button> */}
      </div>
    </div>
  );
}
