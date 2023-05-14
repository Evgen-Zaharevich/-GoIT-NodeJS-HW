const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (e) {
    console.log(e);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newUser = { id: nanoid(), name, email, phone };
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, newUser], null, 2),
      "utf-8"
    );
    return newUser;
  } catch (e) {
    console.log(e);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf-8"
    );
    return filteredContacts;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
