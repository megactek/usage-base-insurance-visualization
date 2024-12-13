import React from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Tooltip,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Calculator = ({ onCalculate }) => {
  const [values, setValues] = React.useState({
    portfolioSize: 0,
    sumInsured: 0,
    poolPremium: 0,
    b1: 0,
    a1: 0,
    b: 0,
    c: 0,
  });

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
            <Tooltip label="Pool premium percentage (U)">
              <FormControl isRequired>
                <FormLabel>Pool Premium % (U)</FormLabel>
                <NumberInput min={0} max={1} step={0.01}>
                  <NumberInputField
                    value={values.poolPremium}
                    onChange={(e) => handleChange("poolPremium", e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </Tooltip>
          </GridItem>

          {/* Add other input fields for b1, a1, b, c */}
        </Grid>

        <Button mt={4} colorScheme="blue" type="submit">
          Calculate
        </Button>
      </VStack>
    </form>
  );
};

export default Calculator;
