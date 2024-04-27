import React, { useState } from "react";
import { Box, Input, VStack, Text, useToast, ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            background: "black",
            color: "white",
            borderColor: "gray.600",
            _placeholder: {
              color: "gray.500",
            },
          },
        },
      },
    },
  },
});

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const toast = useToast();

  const handleCommand = (command) => {
    switch (command.trim()) {
      case "help":
        return "Available commands: help, clear";
      case "clear":
        setOutput([]);
        return "";
      default:
        return `Command not found: ${command}`;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    const newOutput = handleCommand(input);
    setOutput([...output, `$ ${input}`, newOutput]);
    setInput("");
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.800" minH="100vh" p={5}>
        <VStack spacing={4}>
          {output.map((line, index) => (
            <Text key={index} color="white" fontFamily="monospace">
              {line}
            </Text>
          ))}
          <form onSubmit={handleSubmit}>
            <Input variant="outline" placeholder="Enter command" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
          </form>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Terminal;
