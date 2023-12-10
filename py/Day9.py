data = open("./src/resources/9.txt", "r").read().split("\n")

def getDifferences(l):
    r = []
    for i in range(0, len(l)-1):
        r.append(l[i+1] - l[i])
    return r


result = 0
for line in data:
    numbers = list(map(lambda x: int(x), line.split(" ")))
    differences = [numbers]
    numbersToAdd = [0] 
    for i in range(1, len(numbers)):
        print(differences)
        if all(x == 0 for x in numbers):
            break
        else:
            differences.append(getDifferences(differences[-1]))


    for i in range(len(differences)-1, -1, -1):
        numbersToAdd.append(differences[i][0] - numbersToAdd[-1])
    
    print(numbersToAdd)
    print(sum(numbersToAdd))
    result += numbersToAdd[-1]

print(result)

