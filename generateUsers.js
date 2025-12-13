import fs from 'fs';

const interests = ["music", "react", "hiking", "cooking", "travel", "sports", "art", "technology", "books", "gaming"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomName() {
  const firstNames = ["John", "Jane", "Alex", "Maria", "David", "Anna", "Michael", "Sophia", "James", "Emma"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  return firstNames[getRandomInt(0, firstNames.length - 1)] + " " + lastNames[getRandomInt(0, lastNames.length - 1)];
}

function getRandomInterests() {
  const num = getRandomInt(1, 5);
  const selected = [];
  for (let i = 0; i < num; i++) {
    selected.push(interests[getRandomInt(0, interests.length - 1)]);
  }
  return [...new Set(selected)]; // unique
}

const users = [];
for (let i = 0; i < 10000; i++) {
  users.push({
    id: i + 1,
    name: getRandomName(),
    lat: getRandomFloat(-90, 90),
    lon: getRandomFloat(-180, 180),
    interests: getRandomInterests()
  });
}

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated 10000 users');