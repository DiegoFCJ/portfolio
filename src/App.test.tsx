import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home section', () => {
  render(<App />);
  const homeElement = screen.getByText(/Benvenuto nel mio Portfolio!/i); // Modifica con il testo che hai in Home
  expect(homeElement).toBeInTheDocument();
});

test('renders AboutMe section', () => {
  render(<App />);
  const aboutMeElement = screen.getByText(/About Me/i); // Modifica con il testo che hai in AboutMe
  expect(aboutMeElement).toBeInTheDocument();
});

test('renders Skills section', () => {
  render(<App />);
  const skillsElement = screen.getByText(/Skills/i); // Modifica con il testo che hai in Skills
  expect(skillsElement).toBeInTheDocument();
});

test('renders Projects section', () => {
  render(<App />);
  const projectsElement = screen.getByText(/Progetti/i); // Modifica con il testo che hai in Projects
  expect(projectsElement).toBeInTheDocument();
});

test('renders Contact section', () => {
  render(<App />);
  const contactElement = screen.getByText(/Contact/i); // Modifica con il testo che hai in Contact
  expect(contactElement).toBeInTheDocument();
});
