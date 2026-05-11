# Library

A minimalist digital library application built as part of the JavaScript curriculum from [The Odin Project](https://www.theodinproject.com).

## Preview

Live Demo: [View Live Preview](https://odin-library-bx.netlify.app/?utm_source=chatgpt.com)

---

## Overview

This project explores object constructors, DOM manipulation, dynamic rendering, event delegation, and application state management using vanilla JavaScript.

Users can:

* Add books to a personal library
* Toggle read status
* Remove books from the collection
* Manage books through a responsive card-based interface

The application follows a separation-of-concerns approach where:

* Book data is stored independently in JavaScript objects and arrays
* The UI is dynamically rendered from the application state

---

## Features

* Dynamic book rendering
* Custom modal form for adding books
* Responsive grid layout
* Toggle read/unread status
* Delete books from library
* Unique IDs using `crypto.randomUUID()`
* Event delegation for scalable interaction handling
* Built with semantic HTML and accessibility considerations

---

## Built With

* HTML5
* Tailwind CSS v4.2
* Vanilla JavaScript
* Netlify

---


## Project Requirements

This project was completed following the specifications from the Odin Project assignment, including:

* Creating book objects using a constructor
* Storing books in an array
* Dynamically rendering books to the DOM
* Adding new books through a form
* Removing books from the library
* Toggling read status
* Associating DOM elements using unique data attributes

---

## Folder Structure

```text
project-library/
│
├── index.html
├── script.js
├── tailwind.config.js
├── package.json
├── package-lock.json
│
├── src/
│   ├── input.css
│   └── output.css
│
└── README.md
```

---

## Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
```

Install dependencies:

```bash
npm install
```

Start Tailwind watcher:

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

Open `index.html` in your browser.

---

## Acknowledgements

Project assignment and curriculum provided by [The Odin Project](https://www.theodinproject.com).
