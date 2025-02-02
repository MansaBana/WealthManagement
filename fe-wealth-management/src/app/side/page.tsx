"use client"

import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, Typography } from "@mui/material"
import DynamicSpendingChart from "../../components/chart"

const data = {
  balance: 0,
  transactions: [
    {
      type: "Debit",
      amount: 3799,
      category: "Miscellaneous",
      date: "2023-10-15",
      from: "AMAZON.IN",
    },
    {
      type: "Debit",
      amount: 15000,
      category: "bills",
      date: "2023-10-14",
      from: "Credit Card Company",
    },
    {
        type: "Debit",
        amount: 1500,
        category: "bills",
        date: "2023-10-24",
        from: "Credit Card Company",
    },
    {
      type: "Debit",
      amount: 649,
      category: "entertainment",
      date: "2023-10-13",
      from: "Netflix",
    },
    {
      type: "Credit",
      amount: 125000,
      category: "earnings",
      date: "2023-10-10",
      from: "HR Department",
    },
    {
      type: "Debit",
      amount: 950,
      category: "food and drinks",
      date: "2023-10-09",
      from: "Starbucks",
    },
  ],
  investments: {
    totalInvestments: 100000,
    list: [
      {
        type: "Stocks",
        amount: 50000,
        name: "TechCorp Inc.",
      },
      {
        type: "Mutual Funds",
        amount: 30000,
        name: "Growth Fund A",
      },
      {
        type: "Other",
        amount: 20000,
        name: "Real Estate Investment",
      },
    ],
  },
}

// Create a theme instance
const theme = createTheme()

export default function SpendingChartPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Spending Analysis
        </Typography>
        <DynamicSpendingChart data={data} />
      </Container>
    </ThemeProvider>
  )
}

