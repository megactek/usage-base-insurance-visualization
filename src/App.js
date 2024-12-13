import React from "react";
import { ChakraProvider, Box, VStack } from "@chakra-ui/react";
import Calculator from "./components/Calculator";
import ResultsDisplay from "./components/ResultsDisplay";
import theme from "./theme";
import "./utils/chartSetup";

function App() {
  const [results, setResults] = React.useState({
    annualOutcome: 0,
    monthlyOutcome: 0,
    equityPrincipleEarnings: 0,
    marginScenario1: { D: 0, E: 0 },
    marginScenario2: { B: 0, C: 0 },
  });

  const handleCalculations = (values) => {
    // Calculate Annual Outcome (Z)
    const P = 0.05 * values.sumInsured;
    const Z = values.portfolioSize * P * values.poolPremium;

    // Calculate Monthly Outcome (Y)
    const Y = Z / 12;

    // Calculate Equity Principle Earnings (C)
    const K = values.portfolioSize * 0.02; // top 2% of portfolio
    const C = Y / K;

    // Update results
    setResults({
      annualOutcome: Z,
      monthlyOutcome: Y,
      equityPrincipleEarnings: C,
      marginScenario1: {
        D: values.b1 * Y,
        E: values.a1 * Y,
      },
      marginScenario2: {
        B: values.b * Y,
        C: values.c * Y,
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
