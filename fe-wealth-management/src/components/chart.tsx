"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material"

interface Transaction {
  type: string
  amount: number
  category: string
  date: string
  from: string
}

interface ChartData {
  balance: number
  transactions: Transaction[]
  investments: {
    totalInvestments: number
    list: Array<{ type: string; amount: number; name: string }>
  }
}

const DynamicSpendingChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [spendingLimit, setSpendingLimit] = useState<number | "">("")
  const [limits, setLimits] = useState<Record<string, number>>({})

  const months = useMemo(() => {
    const uniqueMonths = new Set(data?.transactions.map((t) => t.date.substring(0, 7)))
    return Array.from(uniqueMonths).sort()
  }, [data?.transactions])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(data?.transactions.map((t) => t?.category))
    return Array.from(uniqueCategories).sort()
  }, [data?.transactions])

  const filteredData = useMemo(() => {
    return data?.transactions
      .filter(
        (t) =>
          (!selectedMonth || t?.date.startsWith(selectedMonth)) &&
          (!selectedCategory || t?.category === selectedCategory),
      )
      .map((t) => ({
        date: t?.date,
        amount: t?.amount,
        category: t?.category,
      }))
  }, [data?.transactions, selectedMonth, selectedCategory])

  const totalSpending = useMemo(() => {
    return filteredData?.reduce((sum, transaction) => sum + transaction.amount, 0)
  }, [filteredData])

  const handleSetLimit = () => {
    if (selectedCategory && spendingLimit !== "") {
      setLimits((prev) => ({ ...prev, [selectedCategory]: Number(spendingLimit) }))
      setSpendingLimit("")
    }
  }

  const currentLimit = selectedCategory ? limits[selectedCategory] : undefined

  return (
    <Card sx={{ margin: "auto" }}>
        <div className="m-4">
              <h2 className="text-lg font-semibold">Spending Chart</h2>
              <p className="text-sm text-zinc-500">Your recent spends</p>
        </div>
      <CardContent>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value as string)}
            >
              <MenuItem value="">All Months</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value as string)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "flex-end" }}>
          <TextField
            label="Spending Limit"
            type="number"
            value={spendingLimit}
            onChange={(e) => setSpendingLimit(e.target.value === "" ? "" : Number(e.target.value))}
            disabled={!selectedCategory}
            fullWidth
          />
          <Button variant="contained" onClick={handleSetLimit} disabled={!selectedCategory || spendingLimit === ""}>
            Set Limit
          </Button>
        </Box> */}
        {selectedCategory && currentLimit && totalSpending > currentLimit && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Warning: Spending in {selectedCategory} (₹{totalSpending}) exceeds the set limit of ₹{currentLimit}
          </Alert>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
            {currentLimit && <ReferenceLine y={currentLimit} label="Limit" stroke="red" strokeDasharray="3 3" />}
          </BarChart>
        </ResponsiveContainer>
        {/* <Typography variant="body1" sx={{ mt: 2 }}>
          Total Spending: ₹{totalSpending}
        </Typography> */}
      </CardContent>
    </Card>
  )
}

export default DynamicSpendingChart

