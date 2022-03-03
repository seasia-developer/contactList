export const contactsData = [
  {
    id: 1,
    firstName: "Arthur",
    middleName: "J.",
    lastName: "Witt",
    email: "arthurg@yopmail.com",
    group: "school",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 2,
    firstName: "Antonio",
    middleName: "B.",
    lastName: "Elam",
    email: "antonio@yopmail.com",
    group: "work",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 3,
    firstName: "Brenda",
    middleName: "A.",
    lastName: "Wallace",
    email: "brenda@yopmail.com",
    group: "family",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 4,
    firstName: "Catherine",
    middleName: "A.",
    lastName: "Todd",
    email: "catherine@yopmail.com",
    group: "school",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 5,
    firstName: "Don",
    middleName: "K.",
    lastName: "Wagner",
    email: "don@yopmail.com",
    group: "friends",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 6,
    firstName: "Lucile",
    middleName: "",
    lastName: "Goldberg",
    email: "goldberg@yopmail.com",
    group: "work",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 7,
    firstName: "Camelia",
    middleName: "D.",
    lastName: "Garett",
    email: "camelia@yopmail.com",
    group: "school",
    hideNotifications: false,
    isActive: true,
  },
  {
    id: 8,
    firstName: "Christopher",
    middleName: "L.",
    lastName: "Gant",
    email: "christopher@yopmail.com",
    group: "school",
    hideNotifications: false,
    isActive: true,
  },
];


window.localStorage.setItem('keyName', JSON.stringify(contactsData));
export const groupData = ["Family", "Friends", "School", "Work"];