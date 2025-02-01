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
import { useEffect } from "react";

export default function WealthDashboard() {
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

  const data = () => {
    fetch("http://localhost:3001/api/email",{method: "POST", body: JSON.stringify({emailAddress: sessionStorage.getItem('Email')})})
    .then((response)=>{
      console.log(response);
    })
  }

  useEffect(() => {
    data();
  },[]);

  const valueFormatter = (value) => `${value}%`;

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
          <div className="text-2xl font-bold">$82,451.00</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="h-4 w-4" />
            4.3% from last month
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-2">

          <div className="h-full flex flex-col mx-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Spending Breakdown</h2>
            <p className="text-sm text-zinc-500">Your recent spends</p>
          </div>
          <div className="h-full w-full items-center">

          <PieChart
          leftAxis={{position:"right"}}
      series={[
        {
          data: [
            { name: 'Windows', value: 75 },
            { name: 'macOS', value: 15 },
            { name: 'Linux', value: 8 },
            { name: 'Others', value: 2 },
          ], // generate Dynamic
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={200}
    />
          </div>
        

          </div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Portfolio Breakdown</h2>
            <p className="text-sm text-zinc-500">Your asset allocation</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  Stocks (60%)
                </div>
                <span>$34,981.65</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[60%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  Bonds (25%)
                </div>
                <span>$14,575.69</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[25%] rounded-full bg-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  Real Estate (10%)
                </div>
                <span>$5,830.27</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[10%] rounded-full bg-yellow-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  Crypto (5%)
                </div>
                <span>$2,915.14</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[5%] rounded-full bg-purple-500" />
              </div>
            </div>
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
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <ArrowDown className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Received from John Doe</p>
                <p className="text-xs text-zinc-500">Oct 24, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+$250.00</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                <ArrowUp className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Stock Purchase - AAPL</p>
                <p className="text-xs text-zinc-500">Oct 23, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">-$1,500.00</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <ArrowDown className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Dividend Payment</p>
                <p className="text-xs text-zinc-500">Oct 22, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+$75.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-2">
        <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black">
          <Clock className="mr-2 h-4 w-4" />
          Transaction History
        </button>
      </div> */}
    </div>
  );
}
