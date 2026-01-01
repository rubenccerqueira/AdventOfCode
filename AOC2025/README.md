# Advent of Code 2025 TypeScript Solutions
This repository contains TypeScript solutions for the Advent of Code 2025 challenge. Each day's solution is organized in its own directory and includes the corresponding input data and TypeScript code.

## Prerequisites
To run the solutions, you'll need:

- Node.js
- npm

## Setup

### Clone the repository:

```bash
git clone https://github.com/Elstryker/AdventOfCode.git
```

### Install Dependencies:

```bash
npm install
```

## Running Solutions

To run the solutions for each day, use the following command:

```bash
npm start
```

This will execute the solutions for the days and parts indicated on the index.ts file.

## Adding a New Day Template

To add a new day's template quickly, use the following command:

```bash
npm run newDay
```

This will create a new directory for the specified day and generate a template file for the TypeScript solution and text files to put the day's inputs. You can then populate this template with your actual solution code.

## Directory Structure

The repository is organized as follows:

```
.
├── Day-1
│   ├── input.txt // Hidden as it differs between users
│   ├── shortInput.txt
│   └── main.ts
├── Day-2
│   ├── input.txt // Hidden as it differs between users
|   |-- shortInput.txt
│   └── main.ts
└── ...
```

Each Day-N directory contains a shortInput.txt file with the input data given on the page for that day's challenge, a hidden input.txt file that differs from each user and a main.ts file where you can implement your TypeScript solution.

## Disclaimer
The solutions provided in this repository are for educational and personal use. While effort has been made to provide correct and efficient solutions, there might be better approaches. Additionally, these solutions are based on the author's understanding of the challenge requirements and constraints.

## License
This project is licensed under the MIT License.

---

Happy coding and have fun solving Advent of Code 2025 challenges using TypeScript! If you have any questions or suggestions, feel free to open an issue or reach out to me.