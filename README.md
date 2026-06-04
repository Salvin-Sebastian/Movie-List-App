# Cinematic Explorer (Movie-List-App)

A responsive, React-based web application that allows users to search for movies, series, and games, and view detailed information about them. Built with Vite and TypeScript, powered by the [OMDb API](https://www.omdbapi.com/).

## 🌐 Live Demo

**[View the Live Application](https://Salvin-Sebastian.github.io/Movie-List-App/)**

## ✨ Features

- **Search Content**: Easily search for movies, TV series, or games.
- **Pagination**: "Load More Results" functionality to browse through large search results effortlessly.
- **Detailed View**: Click on any movie to open a modal with comprehensive details (plot, ratings, cast, release year, genre, and more).
- **Responsive Design**: Modern, clean UI that works beautifully across mobile, tablet, and desktop devices.
- **Error Handling**: Graceful error states for empty searches or API errors.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS
- **Data Source**: OMDb API
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine. You will also need an API key from OMDb (it's free!).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Salvin-Sebastian/Movie-List-App.git
   cd Movie-List-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of the project and add your OMDb API key:
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```
   *(Note: You can get a free API key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx))*

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view it in the browser.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run deploy`: Builds the app and deploys the `dist` folder to GitHub Pages.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
