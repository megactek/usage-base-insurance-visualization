import React from "react";
import { Box, VStack, Heading, Text, Grid, GridItem, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

const ResultsDisplay = ({ results }) => {
  const chartData = {
    labels: ["Annual Outcome", "Monthly Outcome", "Equity Earnings"],
    datasets: [
      {
        label: "Financial Outcomes",
        data: [results.annualOutcome, results.monthlyOutcome, results.equityPrincipleEarnings],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"],
      },
    ],
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Results</Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <Stat>
            <StatLabel>Annual Outcome (Z)</StatLabel>
            <StatNumber>{results.annualOutcome.toFixed(2)}</StatNumber>
          </Stat>
        </GridItem>

        <GridItem>
          <Stat>
            <StatLabel>Monthly Outcome (Y)</StatLabel>
            <StatNumber>{results.monthlyOutcome.toFixed(2)}</StatNumber>
          </Stat>
        </GridItem>

        <GridItem>
          <Stat>
            <StatLabel>Equity Principle Earnings (C)</StatLabel>
            <StatNumber>{results.equityPrincipleEarnings.toFixed(2)}</StatNumber>
          </Stat>
        </GridItem>
      </Grid>

      <Box h="400px">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </VStack>
  );
};

export default ResultsDisplay;
