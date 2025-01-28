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

    // Initialize margin scenario results
    let marginScenario1 = { D: 0, E: 0 };
    let marginScenario2 = { aEarnings: 0, bEarnings: 0 };

    // Only calculate margin scenarios if both PS and SS values are provided
    if (values.perfectlySafeA > 0 && values.somewhatSafeB > 0) {
      // Calculate Margin Principle - Scenario 1 (B > A)
      const totalInvestments = values.somewhatSafeB + values.perfectlySafeA;
      const b1 = values.somewhatSafeB / totalInvestments;
      const a1 = values.perfectlySafeA / totalInvestments;
      marginScenario1 = {
        D: a1 * Y, // What A (Perfectly Safe) earns
        E: b1 * Y, // What B (Somewhat Safe) earns
      };

      // Calculate Margin Principle - Scenario 2 (A > B)
      // Using two-step calculation approach
      const totalInvestmentsScenario2 = values.marginA + values.marginB;
      if (totalInvestmentsScenario2 > 0) {
        // Step 1: Calculate reserved portion for PS (20% based on 200/1000 ratio)
        const reservedPortion = Y * 0.2;
        const remainingAmount = Y - reservedPortion;

        // Step 2: Distribute remaining amount based on proportions
        const aRatio = values.marginA / totalInvestmentsScenario2;
        const bRatio = values.marginB / totalInvestmentsScenario2;

        marginScenario2 = {
          aEarnings: aRatio * remainingAmount + reservedPortion, // PS gets proportional share plus reserved
          bEarnings: bRatio * remainingAmount, // SS gets proportional share of remaining
        };
      }
    }

    setResults({
      annualOutcome: Z,
      monthlyOutcome: Y,
      equityPrincipleEarnings: C,
      marginScenario1,
      marginScenario2,
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
