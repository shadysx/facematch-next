<div align="center">

# 🎭 FaceMatch

### A modern face recognition web application powered by advanced AI technology

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

</div>

## ✨ Overview

FaceMatch is a cutting-edge web application that combines modern frontend technologies with powerful AI capabilities for facial recognition. Upload any face image and discover similar matches using state-of-the-art artificial intelligence.

## 🛠 Tech Stack

### Frontend Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework for production
- **UI Library**: [React 19](https://react.dev/) - JavaScript library for user interfaces
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- **Data Management**:
  - [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management

### Backend Integration

FaceMatch is powered by [insightface-ai-engine](https://github.com/shadysx/insightface-ai-engine), a custom AI engine that I built on top of:

- [dlib](http://dlib.net/) - Advanced face recognition algorithms
- [OpenCV](https://opencv.org/) - Computer vision and image processing

<div align="center">

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/shadysx/facematch-next.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and set the environment variables:

```bash
cp .env.example .env
```

4. Generate DB from Prisma Schema:

```bash
npx prisma migrate deploy
```

5. Generate the Prisma client:

```bash
npx prisma generate
```

6. Start the development server:

```bash
npm run dev
```

7. Make sur you have the AI Engine running:
   [facematch-ai-engine](https://github.com/shadysx/insightface-ai-engine)

---

Made with 💜 by [shadysx](https://github.com/shadysx)

</div>
