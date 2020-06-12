/** 题4 */
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
    {
        type: 'admin',
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        type: 'user',
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        type: 'admin',
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    },
    {
        type: 'user',
        name: 'Wilson',
        age: 23,
        occupation: 'Ball'
    },
    {
        type: 'admin',
        name: 'Agent Smith',
        age: 23,
        role: 'Administrator'
    }
];

const isAdmin = (person: Person): person is Admin => person.type === 'admin';

const isUser = (person: Person): person is User => person.type === 'user';

function logPerson(person: Person) {
    let additionalInformation: string = '';
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    if (isUser(person)) {
        additionalInformation = person.occupation;
    }
}

function filterUsers(persons: Person[], criteria: User): User[] {
    return persons.filter(isUser).filter((user) => {
        let criteriaKeys = Object.keys(criteria) as (keyof User)[]
        return criteriaKeys.every((fieldName) => {
            return user[fieldName] === criteria[fieldName];
        });
    });
}

filterUsers(persons, { age: 23 }).forEach(logPerson);

// Criteria 利用了映射类型，把 User 的 key 值遍历了一遍，并且加上了 ? 标志代表字段都是可选的，即可完成任务。
type Criteria = {
    [K in keyof User]?: User[K]
}

function filterUsers_2(persons: Person[], criteria: Criteria): User[] {
    return persons.filter(isUser).filter((user) => {
        let criteriaKeys = Object.keys(criteria) as (keyof User)[]
        return criteriaKeys.every((fieldName) => {
            return user[fieldName] === criteria[fieldName];
        });
    });
}

filterUsers_2(persons, { age: 23 }).forEach(logPerson);



