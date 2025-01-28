import React from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import Calculator from "./components/Calculator.jsx";
import ResultsDisplay from "./components/ResultsDisplay.jsx";
import theme from "./theme";
import "./utils/chartSetup";

function App() {
  const [results, setResults] = React.useState({
    annualOutcome: 0,
    monthlyOutcome: 0,
    equityPrincipleEarnings: 0,
    marginScenario1: {
      D: 0,
      E: 0,
    },
    marginScenario2: {
      b: 0,
      c: 0,
      aEarnings: 0,
      bEarnings: 0,
    },
  });

  const handleCalculations = (values) => {
    // Calculate Annual Outcome (Z)
    const P = 0.05 * values.sumInsured;
    const Z = values.portfolioSize * P * (values.poolPremium / 100);

    // Calculate Monthly Outcome (Y)
    const Y = Z / 12;

    // Calculate Equity Principle Earnings (C)
    const K = values.portfolioSize * 0.02; // top 2% of portfolio
    const C = Y / K;

    // Calculate Margin Principle - Scenario 1 (B > A)
    // In this scenario, B (Somewhat Safe) has 600 and A (Perfectly Safe) has 400
    const totalInvestments = values.somewhatSafeB + values.perfectlySafeA;
    const b1 = totalInvestments > 0 ? values.somewhatSafeB / totalInvestments : 0; // B proportion (e.g., 600/1000 = 0.6)
    const a1 = totalInvestments > 0 ? values.perfectlySafeA / totalInvestments : 0; // A proportion (e.g., 400/1000 = 0.4)
    const scenarioOneE = b1 * Y; // What B (Somewhat Safe) earns (60% of Y)
    const scenarioOneD = a1 * Y; // What A (Perfectly Safe) earns (40% of Y)

    // Calculate Margin Principle - Scenario 2 (A > B)
    // In this scenario, A (Perfectly Safe) has 600 and B (Somewhat Safe) has 400
    const reservedRatio = 0.2; // 20% reserved for Perfectly Safe
    const reservedAmount = Y * reservedRatio; // Reserved amount (e.g., 1,660,000)
    const remainingAmount = Y - reservedAmount; // Remaining amount (e.g., 6,640,000)

    // Calculate shares from the remaining amount
    const totalPercentage = values.aPercentage + values.bPercentage;
    const adjustedAPercentage = totalPercentage > 0 ? values.aPercentage / totalPercentage : 0.6;
    const adjustedBPercentage = 1 - adjustedAPercentage;

    // Final earnings calculations
    const aEarnings = reservedAmount + adjustedAPercentage * remainingAmount; // Perfectly Safe gets reserved amount plus share of remaining
    const bEarnings = adjustedBPercentage * remainingAmount; // Somewhat Safe gets their share of remaining

    setResults({
      annualOutcome: Z,
      monthlyOutcome: Y,
      equityPrincipleEarnings: C,
      marginScenario1: {
        D: scenarioOneD,
        E: scenarioOneE,
      },
      marginScenario2: {
        aEarnings: aEarnings,
        bEarnings: bEarnings,
      },
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={8}>
        <VStack spacing={8} align="stretch">
          <Calculator onCalculate={handleCalculations} />
          <ResultsDisplay results={results} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
