import React from "react";
import { Box, VStack, Heading, Text, Grid, GridItem, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

const ResultsDisplay = ({ results }) => {
  const chartData = {
    labels: [
      "Annual (Z)",
      "Monthly (Y)",
      "Equity Earnings (C)",
      "S1: A Earnings (Small Pool)",
      "S1: B Earnings (Large Pool)",
      "S2: A Earnings (Large Pool)",
      "S2: B Earnings (Small Pool)",
    ],
    datasets: [
      {
        label: "Financial Outcomes",
        data: [
          results.annualOutcome,
          results.monthlyOutcome,
          results.equityPrincipleEarnings,
          results.marginScenario1.D,
          results.marginScenario1.E,
          results.marginScenario2.aEarnings,
          results.marginScenario2.bEarnings,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Results</Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
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

        <GridItem>
          <Stat>
            <StatLabel>Scenario 1 (B &gt; A)</StatLabel>
            <Text fontSize="sm" color="gray.600">
              B has larger pool
            </Text>
            <StatNumber>A: {results.marginScenario1.D.toFixed(2)}</StatNumber>
            <Text fontSize="xs" color="gray.500">
              (Small Pool, Higher Return)
            </Text>
            <StatNumber>B: {results.marginScenario1.E.toFixed(2)}</StatNumber>
            <Text fontSize="xs" color="gray.500">
              (Large Pool, Lower Return)
            </Text>
          </Stat>
        </GridItem>

        <GridItem>
          <Stat>
            <StatLabel>Scenario 2 (A &gt; B)</StatLabel>
            <Text fontSize="sm" color="gray.600">
              A has larger pool
            </Text>
            <StatNumber>A: {results.marginScenario2.aEarnings.toFixed(2)}</StatNumber>
            <Text fontSize="xs" color="gray.500">
              (Large Pool, Higher Return)
            </Text>
            <StatNumber>B: {results.marginScenario2.bEarnings.toFixed(2)}</StatNumber>
            <Text fontSize="xs" color="gray.500">
              (Small Pool, Lower Return)
            </Text>
          </Stat>
        </GridItem>
      </Grid>

      <Box h={{ base: "300px", md: "400px" }} w="100%" overflowX={{ base: "auto", lg: "hidden" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 12,
                  padding: 15,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            },
          }}
        />
      </Box>
    </VStack>
  );
};

export default ResultsDisplay;
