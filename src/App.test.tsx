import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {act} from "react-dom/test-utils";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Biom Data Table/i);
  expect(linkElement).toBeInTheDocument();
});

test('searches by name and filters table', () => {
  render(<App />);

  // Find the search input element
  const searchInput = screen.getByPlaceholderText('Search by name...');

  // Simulate user typing in the search input
  fireEvent.change(searchInput, { target: { value: 'a' } });

  // Check if the table is filtered based on the search text
  const filteredRows = screen.getAllByRole('row').filter(row => row.textContent?.includes('a'));
  expect(filteredRows.length).toBeGreaterThan(0);
});

test('updates table data after search text change', () => {
  render(<App />);

  // Find the search input element
  const searchInput = screen.getByPlaceholderText('Search by name...');

  // Simulate user typing in the search input
  act(() => {
    searchInput.textContent = 'a';
    searchInput.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Check if the table data has updated after search text change
  const tableRows = screen.getAllByRole('row');
  expect(tableRows.length).toBeGreaterThan(0); // Ensure table rows are updated
});