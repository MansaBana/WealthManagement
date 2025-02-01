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
  const [goalData, setGoalData] = useState([]);
  const [investments, setInvestments] = useState();
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

        if (result.investments && result.investments?.list.length > 0) {
          const sortedInvestments = result.investments?.list.sort(
            (a, b) => b.amount - a.amount
          );
          result.investments.list = sortedInvestments;
        }
        setInvestments(result.investments);
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
        setGoalData([...goalData, result]);
        console.log("goal", result);
        setAddGoal(false);
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
            {investments?.list?.length > 0 && (
              <div className="space-y-4">
                {investments.list
                  .sort((a, b) => b.amount - a.amount) // Sort investments by amount in descending order
                  .slice(0, 5) // Take the top 4 investments
                  .map((investment, index) => {
                    const investmentPercentage =
                      Math.round(
                        (investment?.amount * 10000) /
                          investments?.totalInvestments
                      ) / 100;
                    return (
                      <div className="space-y-2" key={index}>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full bg-${
                                colors[index % 4]
                              }-500`}
                            />
                            {investment?.name}({investmentPercentage}%)
                          </div>
                          <span>${investment?.amount}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className={`h-full rounded-full bg-${
                              colors[index % 4]
                            }-500`}
                            style={{
                              width: `${Math.min(
                                Math.max(investmentPercentage, 0),
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
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

      {goalData &&
        goalData.map((goal) => {
          console.log("goal", goal);
          return (
            <>
              <div className="text-lg font-bold flex items-center gap-3">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    viewBox="0 0 512 512"
                  >
                    <path d="M464 6.1c9.5-8.5 24-8.1 33 .9l8 8c9 9 9.4 23.5 .9 33l-85.8 95.9c-2.6 2.9-4.1 6.7-4.1 10.7l0 21.4c0 8.8-7.2 16-16 16l-15.8 0c-4.6 0-8.9 1.9-11.9 5.3L100.7 500.9C94.3 508 85.3 512 75.8 512c-8.8 0-17.3-3.5-23.5-9.8L9.7 459.7C3.5 453.4 0 445 0 436.2c0-9.5 4-18.5 11.1-24.8l111.6-99.8c3.4-3 5.3-7.4 5.3-11.9l0-27.6c0-8.8 7.2-16 16-16l34.6 0c3.9 0 7.7-1.5 10.7-4.1L464 6.1zM432 288c3.6 0 6.7 2.4 7.7 5.8l14.8 51.7 51.7 14.8c3.4 1 5.8 4.1 5.8 7.7s-2.4 6.7-5.8 7.7l-51.7 14.8-14.8 51.7c-1 3.4-4.1 5.8-7.7 5.8s-6.7-2.4-7.7-5.8l-14.8-51.7-51.7-14.8c-3.4-1-5.8-4.1-5.8-7.7s2.4-6.7 5.8-7.7l51.7-14.8 14.8-51.7c1-3.4 4.1-5.8 7.7-5.8zM87.7 69.8l14.8 51.7 51.7 14.8c3.4 1 5.8 4.1 5.8 7.7s-2.4 6.7-5.8 7.7l-51.7 14.8L87.7 218.2c-1 3.4-4.1 5.8-7.7 5.8s-6.7-2.4-7.7-5.8L57.5 166.5 5.8 151.7c-3.4-1-5.8-4.1-5.8-7.7s2.4-6.7 5.8-7.7l51.7-14.8L72.3 69.8c1-3.4 4.1-5.8 7.7-5.8s6.7 2.4 7.7 5.8zM208 0c3.7 0 6.9 2.5 7.8 6.1l6.8 27.3 27.3 6.8c3.6 .9 6.1 4.1 6.1 7.8s-2.5 6.9-6.1 7.8l-27.3 6.8-6.8 27.3c-.9 3.6-4.1 6.1-7.8 6.1s-6.9-2.5-7.8-6.1l-6.8-27.3-27.3-6.8c-3.6-.9-6.1-4.1-6.1-7.8s2.5-6.9 6.1-7.8l27.3-6.8 6.8-27.3c.9-3.6 4.1-6.1 7.8-6.1z" />
                  </svg>
                </span>
                <span>{goal?.goals?.[0]?.goalDescription}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-9 ">
                {goal.goals.map((entry) => {
                  console.log("entry", entry);
                  return (
                    <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3 ">
                      <div className="text-lg font-semibold mb-5">
                        {entry?.name}
                      </div>
                      <div className="mb-3">{entry?.description}</div>
                      {entry.investments.map((investment, index) => {
                        console.log("investment", investment);
                        return (
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm mt-4">
                                  <div className="flex items-center gap-4">
                                    <div
                                      className={`h-3 w-3 rounded-full bg-${colors[index]}-500`}
                                    />
                                    {investment?.name}({investment.percentage}%)
                                  </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                                  <div
                                    className={`h-full rounded-full bg-${colors[index]}-500`}
                                    style={{
                                      width: `${investment.percentage}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="mt-3">{entry?.customMessage}</div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      {addGoal ? (
        <div>
          <h1 className="text-lg font-semibold">Goals</h1>
          <p className="text-sm text-zinc-500">Your financial aspirations</p>
          <textarea
            placeholder="add your goals here"
            ref={goalInputRef}
            className="border rounded-md my-2 px-2 py-1 w-full"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
          <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Ideal Portfolio</h2>
              <p className="text-sm text-zinc-500">
                How your asset allocation should be
              </p>
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
        {!addGoal ? (
          <button
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            onClick={() => {
              setAddGoal(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            {"Add Goals"}
          </button>
        ) : (
          <button
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            onClick={async () => {
              onGoal();
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
