import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [filter, setFilter] = useState('All');

  function addExpense() {
    if (description.trim() === '' || amount === '') return;
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  }

  const filteredExpenses =
    filter === 'All'
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="form">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <button onClick={addExpense}>Add</button>
      </div>

      <div className="filter">
        <label>Filter by category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
      </div>

      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp.id}>
            <span>{exp.description}</span>
            <span className="category-tag">{exp.category}</span>
            <span>${exp.amount.toFixed(2)}</span>
            <button onClick={() => deleteExpense(exp.id)}>✕</button>
          </li>
        ))}
      </ul>

      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default App;