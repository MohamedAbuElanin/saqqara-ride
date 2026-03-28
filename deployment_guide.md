# Deploying saqqara-ride to GitHub Pages 🚀

This is your complete, beginner-friendly, and production-ready guide to deploying your interactive Vite + React project, **saqqara-ride**, live on GitHub Pages!

## 🤔 Why won't a React + Vite project run directly on GitHub Pages?

If you just push your `src` folder and `App.jsx` to GitHub Pages, you'll see a blank screen or errors. Why?
**Web browsers don't natively speak modern React or JSX.** 

Tools like Vite are "bundlers". While you write in rich, modern JavaScript (`.jsx`), Vite's job is to compile, bundle, and translate all your files, components, and paths into highly optimized standard vanilla HTML, CSS, and JS. Pushing your unbuilt codebase is like serving raw eggs and flour; Vite's `build` command bakes the cake (in a folder called `dist/`) that GitHub Pages can actually serve to visitors.

---

## Step 1: Install the `gh-pages` package

First, you need a helper tool to automate pushing your compiled code to GitHub. In your terminal, run:

```bash
npm install gh-pages --save-dev
```

---

## Step 2: Configure `package.json`

GitHub Pages needs to know where your project will live, and we need to set up the automation scripts to deploy it smoothly.

1. Add a `"homepage"` property at the top level of your `package.json`.
2. Add `"predeploy"` and `"deploy"` commands into your `"scripts"`.

Replace `<your-github-username>` with your actual GitHub username:

```json
{
  "name": "saqqara-ride",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "homepage": "https://<your-github-username>.github.io/saqqara-ride",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "gh-pages": "^6.1.1",
    "vite": "^8.0.3"
  }
}
```

---

## Step 3: Configure `vite.config.js`

When Vite builds your project, it assumes it will be hosted at the root domain (e.g., `https://example.com/`). But on GitHub Pages, it's hosted in a sub-path (`/saqqara-ride/`). We have to tell Vite the "base" path so it knows how to properly link the JS and CSS files.

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/saqqara-ride/',
})
```

---

## Step 4: Important Architecture Notes

> [!WARNING]
> **Sounds and Images Paths**
> Never hardcode paths as pure strings (e.g., `new Audio('/Sounds/laugh.mp3')`) because the `/saqqara-ride/` base URL will break them in production.
> **Fix:** Always use ES6 imports as we did earlier! (e.g., `import laughMp3 from './Sounds/laugh sound.mp3'`). Vite will automatically calculate the correct production hashed URL during the build and place everything neatly in your `dist/` folder.

> [!IMPORTANT]
> **React Router constraints**
> Currently, this project has one page, so this isn't an issue. However, if you add `react-router-dom` in the future for multiple pages (like `/about`), **GitHub Pages will return a 404 error** if a user refeshes the page. 
> **Fix:** You must use `<HashRouter>` instead of `<BrowserRouter>` if deploying to GitHub Pages, or use a customized `404.html` redirect hack.

---

## Step 5: Push the Source Code to GitHub

Before deploying, your uncompiled code needs to be stored on GitHub. Update everything so it's ready.

```bash
# Initialize git if you haven't already
git init

# Add all your files
git add .
git commit -m "Initial commit - Saqqara Ride ready"

# Make sure you've created an empty repo on GitHub first, then link it:
git remote add origin https://github.com/<your-github-username>/saqqara-ride.git

# Set the main branch
git branch -M main

# Push the source code to GitHub
git push -u origin main
```

---

## Step 6: Deploy to GitHub Pages!

Now for the magic. Simply run your deploy script from the terminal:

```bash
npm run deploy
```

### What happens behind the scenes?
1. The **`predeploy`** script automatically runs first (`npm run build`). Vite compiles everything into a new folder called `dist/`.
2. The **`deploy`** script takes that `dist/` folder and pushes it to a special branch on your repository called `gh-pages`.

### Final GitHub Settings:
1. Go to your repository on GitHub.com.
2. Click **Settings** > **Pages** (on the left sidebar).
3. Under **Source**, ensure the branch is set to **`gh-pages`** and the folder is **`/(root)`**.
4. Save! Your live link will be shown at the top of that settings page in about 2-3 minutes. Enjoy your live troll site! 🎉
