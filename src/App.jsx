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
    const b1 = values.somewhatSafeB / 100; // B/100
    const a1 = values.perfectlySafeA / 100; // A/100
    const aMultiplier = 1.5; // A earns 50% more than B per unit
    const scenarioOneD = a1 * Y * aMultiplier; // What A earns (higher per unit)
    const scenarioOneE = b1 * Y; // What B earns (base rate)

    // Calculate Margin Principle - Scenario 2 (A > B)
    const b = (values.aeDifference / 100) * Y; // æ% of Y
    const c = Y - b; // Remaining after b
    const totalPercentage = values.aPercentage + values.bPercentage;
    const adjustedAPercentage =
      totalPercentage > 0
        ? Math.max(0.6, values.aPercentage / totalPercentage) // A gets at least 60% of the total
        : 0.6;
    const adjustedBPercentage = 1 - adjustedAPercentage;

    const aEarnings = adjustedAPercentage * c + b; // A gets æ% of Y plus their share of c
    const bEarnings = adjustedBPercentage * c; // B gets their share of remaining c

    setResults({
      annualOutcome: Z,
      monthlyOutcome: Y,
      equityPrincipleEarnings: C,
      marginScenario1: {
        D: scenarioOneD,
        E: scenarioOneE,
      },
      marginScenario2: {
        b: b,
        c: c,
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
