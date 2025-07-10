# Pencil Durability Kata Solution
This project provides a solution for the Pencil Durability programming challenge, simulating the behaviour of a pencil with limited durability writing on a paper, including Erasing and Modifying text.

## Approach
I tried to implement the solution while focusing on maintainability, scalability and quality
and the following best practices and approaches were used :
- **TDD** : The solution was developing using a TDD-like approach with clear and well documented tests writen in vitest that define the required behaviour for each feature.
- **Separation Concept** : i've tried to organize the code into distict classes, each class handles a single responsibility, using `Writer` class as a high-level orchestrator, `Pencil` manages its own state and logic, and `Paper` handle content
- **Object Oriented Design** : the use of classes allows for clear and logical structure for an easy understanding.

## Running the project
1. Clone this repository
2. Install required dependencies using NPM or YARN
     ```shell
    npm i
     ```
   or
    ```shell
    yarn
    ```
3. Run the Example file 
    ```shell
    npm run example
   ```

4. Run the Test 
    ```shell
    npm run test
   ```
