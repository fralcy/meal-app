# Meal Planning App

A responsive meal planning web application built with React and modern web technologies.

## Demo

Live demo: [https://fralcy.github.io/meal-app/](https://fralcy.github.io/meal-app/)

## Features

- **Meal Plan** - Weekly meal schedule (Monday - Friday)
- **Recipes** - Browse and search recipe collection
- **Groceries** - Shopping list with categories and checkboxes
- **Discover** - Recipe suggestions (mock data)
- **Settings** - Theme toggle (Light/Dark) and preferences

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite 7 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + ShadCN UI |
| State | Zustand + LocalStorage persist |
| Data Fetching | TanStack Query + Axios |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM (HashRouter) |
| Icons | Lucide React |
| Deployment | GitHub Pages |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── api/                 # Axios config, Query client
├── components/
│   ├── ui/              # ShadCN components
│   └── layout/          # AppLayout, Header, BottomNav
├── features/
│   ├── meal-plan/       # Weekly schedule, DayCard
│   ├── recipes/         # RecipeList, RecipeCard
│   ├── groceries/       # GroceryList, AddForm
│   ├── discover/        # DiscoverFeed
│   └── settings/        # SettingsForm, ThemeToggle
├── pages/               # Route pages
├── store/               # Zustand store
├── types/               # TypeScript interfaces
├── validation/          # Zod schemas
└── data/                # Mock data
```

## Form Validation

Forms use **React Hook Form** with **Zod** schema validation:

| Form | Location | Validation |
|------|----------|------------|
| Add Meal | Meal Plan page | Name required, servings 1-50, meal type selection |
| Add Grocery | Groceries page | Name required, quantity > 0, category selection |

Schemas defined in `src/validation/schemas.ts`.

## Responsive Design

- **Mobile** (<640px): Single column, bottom navigation
- **Tablet** (640px+): 2-column grid, max-width 672px container

## License

MIT
