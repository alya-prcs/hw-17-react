import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];
  });

  const [filter, setFilter] = useState("");

  const addContact = (name, number) => {
    const normalized = name.toLowerCase();

    const exists = contacts.some(
      (c) => c.name.toLowerCase() === normalized
    );

    if (exists) {
      alert("Contact already exists!");
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={setFilter} />

      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}