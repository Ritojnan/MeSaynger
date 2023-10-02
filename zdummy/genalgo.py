import random

# Constants
TARGET_STRING = "Hiiiii!"
POPULATION_SIZE = 100
MUTATION_RATE = 0.01

# Function to generate a random binary string
def generate_random_string(length):
    return ''.join(random.choice("01") for _ in range(length))

# Function to calculate the fitness of a string
def calculate_fitness(string):
    return sum(1 for a, b in zip(string, TARGET_STRING) if a == b)

# Function to select parents for reproduction (roulette wheel selection)
def select_parents(population, fitness_scores):
    total_fitness = sum(fitness_scores)
    if total_fitness == 0:
        return random.choices(population, k=2)
    
    selection_probs = [fitness / total_fitness for fitness in fitness_scores]
    return random.choices(population, weights=selection_probs, k=2)

# Function to perform single-point crossover
def crossover(parent1, parent2):
    crossover_point = random.randint(1, len(parent1) - 1)
    child1 = parent1[:crossover_point] + parent2[crossover_point:]
    child2 = parent2[:crossover_point] + parent1[crossover_point:]
    return child1, child2

# Function to perform mutation
def mutate(string):
    mutated_string = ""
    for char in string:
        if random.random() < MUTATION_RATE:
            mutated_string += "0" if char == "1" else "1"
        else:
            mutated_string += char
    return mutated_string

# Main genetic algorithm loop
population = [generate_random_string(len(TARGET_STRING)) for _ in range(POPULATION_SIZE)]

for generation in range(1000):
    fitness_scores = [calculate_fitness(string) for string in population]
    best_fitness = max(fitness_scores)
    best_string = population[fitness_scores.index(best_fitness)]

    if best_string == TARGET_STRING:
        print(f"Generation {generation}: {best_string}")
        break

    new_population = [best_string]

    while len(new_population) < POPULATION_SIZE:
        parent1, parent2 = select_parents(population, fitness_scores)
        child1, child2 = crossover(parent1, parent2)
        child1 = mutate(child1)
        child2 = mutate(child2)
        new_population.extend([child1, child2])

    population = new_population

    if generation % 10 == 0:
        print(f"Generation {generation}: {best_string} (Fitness: {best_fitness})")

if best_string != TARGET_STRING:
    print(best_string)
    print(TARGET_STRING)
    print("Genetic algorithm did not converge to the target string.")
