# Customizable Professional E-Commerce Site

A modern, fully-featured e-commerce web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Features

- 🛍️ Product browsing by category
- 🔍 Search functionality
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist
- 📦 Order history
- 👤 User account management
- 🎨 Multiple theme support (ThemeSwitcher)
- 💳 Checkout flow
- 📱 Fully responsive design
- ✨ Smooth scroll reveal animations
- 🎉 Confetti effects on purchase

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context (auth, routing, cart, etc.)
├── data/           # Static product and theme data
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── types.ts        # TypeScript type definitions
└── utils/          # Utility functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home / landing page |
| `/category/:id` | Products by category |
| `/product/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/wishlist` | Saved items |
| `/orders` | Order history |
| `/account` | User account |
| `/about` | About page |
| `/contact` | Contact page |
| `/search?q=` | Search results |
