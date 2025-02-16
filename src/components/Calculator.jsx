import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Tooltip,
  Grid,
  GridItem,
  Button,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";

const Calculator = ({ onCalculate }) => {
  const [values, setValues] = React.useState({
    // General Parameters
    portfolioSize: 0, // M
    sumInsured: 0, // S
    poolPremium: 0, // U (1% to 5%)

    // Margin Principle - Scenario 1 (B > A)
    perfectlySafeA: 0, // A (smaller pool)
    somewhatSafeB: 0, // B (larger pool)
    b1: 0, // B/100
    a1: 0, // A/100

    // Margin Principle - Scenario 2 (A > B)
    marginA: 0, // A (larger pool)
    marginB: 0, // B (smaller pool)
  });

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCalculate(values);
      }}
    >
      <VStack spacing={6} align="stretch">
        <Heading size="md">General Parameters</Heading>
        <Grid
          templateColumns={{
            base: "1fr", // Mobile: 1 column
            md: "repeat(2, 1fr)", // Tablet: 2 columns
            lg: "repeat(3, 1fr)", // Desktop: 3 columns
          }}
          gap={6}
        >
          <GridItem>
            <Tooltip label="Total size of the investment portfolio (M)">
              <FormControl isRequired>
                <FormLabel>Portfolio Size (M)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    value={values.portfolioSize}
                    onChange={(e) => handleChange("portfolioSize", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>

          <GridItem>
            <Tooltip label="Sum insured amount (S)">
              <FormControl isRequired>
                <FormLabel>Sum Insured (S)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    value={values.sumInsured}
                    onChange={(e) => handleChange("sumInsured", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>

          <GridItem>
            <Tooltip label="Pool premium percentage (U) - between 1% and 5%">
              <FormControl isRequired>
                <FormLabel>Pool Premium % (U)</FormLabel>
                <NumberInput min={1} max={5} step={0.1}>
                  <NumberInputField
                    value={values.poolPremium}
                    onChange={(e) => handleChange("poolPremium", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>
        </Grid>

        <Divider />
        <Heading size="md">Margin Principle - Scenario 1</Heading>
        <Text color="gray.600">B has larger pool than A (B &gt; A)</Text>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
        >
          <GridItem>
            <Tooltip label="Number of perfectly safe investments - Larger Pool (A)">
              <FormControl>
                <FormLabel>Perfectly Safe - Larger Pool (A)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    value={values.perfectlySafeA}
                    onChange={(e) => handleChange("perfectlySafeA", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>

          <GridItem>
            <Tooltip label="Number of somewhat safe investments - Smaller Pool (B)">
              <FormControl>
                <FormLabel>Somewhat Safe - Smaller Pool (B)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    value={values.somewhatSafeB}
                    onChange={(e) => handleChange("somewhatSafeB", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>
        </Grid>

        <Divider />
        <Heading size="md">Margin Principle - Scenario 2</Heading>
        <Text color="gray.600">A has larger pool than B (A &gt; B)</Text>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
        >
          <GridItem>
            <Tooltip label="Number of perfectly safe investments - Larger Pool (A)">
              <FormControl>
                <FormLabel>Perfectly Safe - Larger Pool (A)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField value={values.marginA} onChange={(e) => handleChange("marginA", e.target.value)} />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>

          <GridItem>
            <Tooltip label="Number of somewhat safe investments - Smaller Pool (B)">
              <FormControl>
                <FormLabel>Somewhat Safe - Smaller Pool (B)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField value={values.marginB} onChange={(e) => handleChange("marginB", e.target.value)} />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>
        </Grid>

        <Button
          mt={4}
          colorScheme="blue"
          type="submit"
          w={{ base: "100%", md: "auto" }} // Full width on mobile, auto on larger screens
        >
          Calculate
        </Button>
      </VStack>
    </form>
  );
};

export default Calculator;
