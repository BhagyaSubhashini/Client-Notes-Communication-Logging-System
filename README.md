<div align="center">

# 📒 Client Notes & Communication Logging System

### A Centralized Communication Management Platform for Client Support Teams

<p align="center">
A modern web application built to centralize client communication, maintain complete interaction history, improve collaboration among support staff, and ensure every client conversation is tracked with full accountability.
</p>

<br>

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-000000?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 About

The **Client Notes & Communication Logging System** is a centralized communication platform designed for organizations where multiple employees interact with the same clients.

Instead of relying on memory or scattered communication channels, every interaction is securely stored in one place with timestamps, user information, replies, file attachments, and client details.

The system ensures that every staff member has complete context before responding to a client, significantly improving customer service and internal collaboration.

---

# ✨ Key Features

## 👥 User Management

✔ Secure Login

✔ JWT Authentication

✔ Password Encryption

✔ Role-Based Access Control (RBAC)

✔ Super User & Normal User Roles

---

## 👤 Client Management

- Add Clients
- Update Client Details
- Delete Clients
- View Client Profiles
- Search Clients Instantly

Client Information includes:

- Full Name
- Phone Number
- Email Address
- Domain Name
- WHMCS Username

---

## 🔍 Smart Search

Search clients using:

- 📞 Phone Number
- 📧 Email Address
- 🌐 Domain Name
- 📝 Note ID

---

## 📝 Communication Notes

Each communication record stores:

- Unique Note ID
- Note Type
- Client Details
- Communication Content
- Author
- Timestamp
- File Attachments

Supported Note Types:

- Complaint
- Site Down
- General Note

---

## 💬 Reply System

Users can

- Reply to any note
- View reply history
- View reply timestamps
- See reply authors

Complete communication threads are preserved.

---

## 📎 File Attachments

Supports uploading files with notes.

Examples:

- Images
- PDFs
- Documents

---

## 🔔 Notifications

Super Users automatically receive dashboard notifications whenever a new communication note is created.

---

## 📱 SMS Integration

Integrated with **Text.lk SMS API**

Automatically sends clients an SMS containing their inquiry/reference ID after a note is created.

---

## 📊 Analytics Dashboard

Interactive dashboard displaying

- Total Clients
- Total Notes
- Complaints
- Site Down Reports
- General Notes
- User Activity
- Charts
- Summary Cards

---

## 📄 Export Reports

Export communication history as

- PDF
- Excel (.xlsx)

Export

- Individual Client Notes
- Entire System Notes

---

## 📱 Responsive Design

Fully responsive for

- Desktop
- Tablet
- Mobile Devices

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, React Router, Axios, Tailwind CSS, Lucide React, React Hot Toast |
| Backend | Node.js, Express.js, JWT, Multer, PDFKit, ExcelJS, Axios |
| Database | PostgreSQL (Neon Database) |
| Authentication | JWT + bcrypt |
| SMS Service | Text.lk API |
| File Storage | Local Storage |

---

# 📂 Project Structure

```text
Client-Notes-System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── uploads
│   │
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layout
│   │   ├── pages
│   │   └── services
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/client-notes-system.git

cd client-notes-system
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Frontend

```bash
cd ../frontend

npm install
```

---

# ⚙ Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

SMS_API_KEY=your_textlk_api_key

SMS_API_URL=https://app.text.lk/api/v3/sms/send
```

---

# ▶ Running the Project

### Backend

```bash
cd backend

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 User Roles

| Permission | Super User | Normal User |
|------------|------------|-------------|
| Login | ✅ | ✅ |
| Manage Users | ✅ | ❌ |
| Manage Clients | ✅ | ❌ |
| Search Clients | ✅ | ✅ |
| Add Notes | ✅ | ✅ |
| Reply Notes | ✅ | ✅ |
| Upload Files | ✅ | ✅ |
| View All Notes | ✅ | ✅ |
| Export Reports | ✅ | ❌ |
| Dashboard Analytics | ✅ | ❌ |
| Notifications | ✅ | ❌ |

---

# 📋 Main Modules

- Authentication
- User Management
- Client Management
- Notes Management
- Reply Management
- Notifications
- SMS Integration
- Analytics Dashboard
- Export Reports
- File Upload System

---

# 🔒 Security Features

- JWT Authentication
- bcrypt Password Hashing
- Role-Based Access Control
- Protected API Routes
- Secure File Upload
- Audit Trail
- Server-side Validation

---

# 📸 Screenshots

> Add screenshots here after deployment.

```
screenshots/
│
├── login.png
├── dashboard.png
├── clients.png
├── notes.png
├── analytics.png
└── exports.png
```

Example

| Login | Dashboard |
|--------|-----------|
| ![](screenshots/login.png) | ![](screenshots/dashboard.png) |

---

# 🎯 Future Enhancements

- 🔵 Real-time Notifications
- 🔵 Email Notifications
- 🔵 AWS S3 File Storage
- 🔵 Activity Logs
- 🔵 Advanced Search Filters
- 🔵 Multi-Organization Support
- 🔵 REST API Documentation
- 🔵 Dark Mode
- 🔵 Two-Factor Authentication

---

# 📈 Functional Highlights

✅ Centralized Client Communication

✅ Communication History

✅ File Attachments

✅ Reply Threads

✅ Dashboard Notifications

✅ SMS Integration

✅ Analytics Dashboard

✅ Export to PDF & Excel

✅ Responsive UI

✅ Secure Authentication

---

# 👨‍💻 Developer

**Bhagya Subhashini**

Bachelor of Information Technology (Undergraduate)

---

# 🙏 Acknowledgements

Special Thanks

- ITX Digital Services (PVT) LTD
- React.js
- Express.js
- PostgreSQL
- Neon Database
- PDFKit
- ExcelJS
- Text.lk SMS API

---

# 📜 License

This project is released under the **MIT License**.

Feel free to use and modify it for learning purposes.

---

<div align="center">

## ⭐ If you found this project useful

Please consider giving this repository a **Star ⭐**

**Happy Coding! 🚀**

</div>
