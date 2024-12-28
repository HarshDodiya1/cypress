<div align="center">
  <h1>🌲 Cypress</h1>
  <p>A Powerful Real-time Collaboration Platform</p>

  ![RTCursorImage](https://github.com/user-attachments/assets/63091013-2d2e-425b-b89d-913bfa2d093a)

  <div>
    <img src="https://img.shields.io/badge/Next.js%2013-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/WebSocket-4353FF?style=for-the-badge" alt="WebSocket" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/shadcn-ui-000000?style=for-the-badge" alt="shadcn-ui" />
    <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </div>

  <br />

  <p>An editor with multi cursor functionality using Nextjs 13, Websockets, Supabase Realtime, Real-time presence, Custom Rich text editor, Update profile settings.</p>
</div>

## 📑 Table of Contents

 1. [Features](#features)
 2. [🛠️ Technology Stack](#️-technology-stack)
 3. [🚀 Quick Start Guide](#-quick-start-guide)
 4. [🎯 Key Features in Detail](#-key-features-in-detail)
 5. [💫 Core Features](#-core-features)
 6. [🤝 Contributing](#-contributing)
 7. [📄 License](#-license)
 8. [🌟 Show your support](#-show-your-support)


## Features

### Real-time Collaboration
![Real-time Collaboration](https://github.com/user-attachments/assets/a9bbff5d-6386-4ad6-b28b-48b4d2ae8112)
<div align="left">
  Watch your team's cursors move and text selections update instantly, making remote collaboration feel natural and intuitive.
</div>

### Workspace Management
![Workspace Creation](https://github.com/user-attachments/assets/ae8a60b4-6bc8-4063-b907-f7cdece0a7e2)
<div align="left">
  Create and organize workspaces effortlessly, providing your team with a structured environment for their projects.
</div>

### Shared Workspace Experience
![Shared Workspace](https://github.com/user-attachments/assets/56772bbe-e33b-434e-859a-f6f33605a43a)
<div align="left">
  Collaborate in real-time with team members in shared workspaces, enhancing productivity and communication.
</div>

### Smart File Organization
![Folder Creation](https://github.com/user-attachments/assets/84949e7a-0c7d-4bd7-bd63-b9078c0eea40)
<div align="left">
  Keep your work organized with intuitive folder management and hierarchical structure.
</div>

### Document Recovery
![Trash and Restore](https://github.com/user-attachments/assets/ab42c0fe-8cca-4f48-82e2-f2c23666cf71)
<div align="left">
  Never lose important work with our comprehensive trash and restore functionality.
</div>

## 🛠️ Technology Stack

### 🎨 Frontend
- **Next.js 14** 🚀: Server-side rendered React applications
- **Tailwind CSS** 💅: Utility-first styling framework
- **Socket.io Client** 🔌: Real-time communication
- **Quill** ✍️: Rich text editor with cursor support
- **Shadcn UI** 🎯: Beautifully designed components library
- **React Hook Form** 📝: Form validation and handling

### ⚙️ Backend & Infrastructure
- **Next Auth** 🔐: Authentication with Google and GitHub providers
- **Prisma ORM** 🗃️: Type-safe database toolkit
- **Supabase** ⚡: Backend-as-a-service platform
- **Socket.io** 🔄: WebSocket server implementation

### 🔧 Development & Utilities
- **TypeScript** 📘: Static type checking
- **Zod** ✅: Schema validation
- **TailwindCSS Animate** 💫: Animation utilities

## 🚀 Quick Start Guide

### 📋 Prerequisites
- Node.js 16 or higher ⚡
- npm or yarn 📦
- Git 🔄

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshDodiya1/cypress.git
   cd cypress
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   ```env
    # Database URL
    # The URL to connect to your database.
    DATABASE_URL=
    
    # Supabase URL
    # The URL of your Supabase project. 
    NEXT_PUBLIC_SUPABASE_URL=
    
    # Supabase Anon Key
    # The anonymous key for your Supabase project.
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    
    # The service role key for your Supabase project.
    SERVICE_ROLE_KEY=
    
    # JWT Secret
    # The secret key used to sign JSON Web Tokens (JWT). This should be a long, random string.
    # generate directly via terminal by running: openssl rand -base64 32
    JWT_SECRET=
    
    # Site URL
    # The URL of your site.
    NEXT_PUBLIC_SITE_URL=
    
    # The secret key used by NextAuth.js for signing and encrypting session tokens. 
    NEXTAUTH_SECRET=
    
    # Google Credentials
    # The client ID and client secret for Google OAuth.
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    
    # Github Credentials
    # The client ID and client secret for GitHub OAuth.
    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Key Features in Detail

### Live Cursor Tracking
![Cursor Tracking](https://github.com/user-attachments/assets/63091013-2d2e-425b-b89d-913bfa2d093a)
See your teammates' cursors in real-time as they move across the workspace.

### Team Collaboration
<img src="https://github.com/user-attachments/assets/f844fad2-ef24-4abf-8070-af19e0d465b7" width="400" alt="Add Collaborators" />
<div align="left">Easily add team members to your workspace and manage permissions.</div>

### Workspace Creation
<img src="https://github.com/user-attachments/assets/42510f24-ce4b-4960-9d8b-ed596ba5c07f" width="400" alt="Create Workspace" />
<div align="left">Set up new workspaces in seconds with our intuitive interface.</div>

### File Recovery
<img src="https://github.com/user-attachments/assets/6b8dfc72-e3f3-4bf9-b919-38e54364c076" width="400" alt="Trash Management" />
<div align="left">Robust trash management system for recovering deleted items.</div>


## 💫 Core Features

- **Real-time Cursor Tracking** 🖱️: See collaborators' cursors in real-time
- **Live Text Selection** ✨: Share and observe text selections instantly
- **Workspace Management** 📂: Create and organize shared workspaces
- **File Organization** 📁: Intuitive folder structure and management
- **Trash & Restore** 🔄: Comprehensive file recovery system
- **Authentication** 🔐: Secure user authentication with NextAuth
- **Responsive Design** 📱: Works seamlessly across devices

## 🤝 Contributing

We welcome contributions to Cypress! Here's how you can help:

1. Fork the repository 🍴
2. Create your feature branch (`git checkout -b feature/AmazingFeature`) 
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`) 
4. Push to the branch (`git push origin feature/AmazingFeature`) 
5. Open a Pull Request 

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
  <p>Built with ❤️ by Harsh Dodiya</p>
  
  <a href="https://github.com/HarshDodiya1/cypress/issues">Report Bug</a>
  ·
  <a href="https://github.com/HarshDodiya1/cypress/issues">Request Feature</a>
</div>
