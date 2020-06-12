interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

function filterPersons(persons: Person[], personType: string, criteria: unknown): unknown[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

// let usersOfAge23: User[] = filterPersons(persons, 'user', { age: 23 });
// let adminsOfAge23: Admin[] = filterPersons(persons, 'admin', { age: 23 });

// 本题返回值类型即可以是 User,也可以是Admin，并且很明显这个结果是由第二个参数是 'user' 还是 'admin' 所决定。
// 利用函数重载的功能，可以轻松实现，针对每种不同的 personType 参数类型，我们给出不同的返回值类型
function filterPersons_1(
    persons: Person[],
    personType: "admin",
    criteria: Partial<Person>,
): Admin[]

function filterPersons_1(
    persons: Person[],
    personType: "user",
    criteria: Partial<Person>,
): User[]

function filterPersons_1(
    persons: Person[],
    personType: string,
    criteria: Partial<Person>,
) {}

let usersOfAge23: User[] = filterPersons(persons, "user", { age: 23 })
let adminsOfAge23: Admin[] = filterPersons(persons, "admin", { age: 23 })