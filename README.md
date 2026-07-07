````markdown
# Client Notes & Communication Logging System

A centralized web-based communication logging platform developed to help organizations manage client interactions efficiently. The system enables support teams to maintain a complete history of client communications, ensuring that every staff member has the necessary context before responding to a client.

This project was developed for **ITX Digital Services (PVT) LTD** as a final software solution to improve internal communication, client support, and record management.

---

## 📌 Features

### Authentication & Authorization
- Secure user authentication using JWT
- Role-Based Access Control (RBAC)
- Two user roles:
  - Super User
  - Normal User
- Password hashing using bcrypt

---

### User Management (Super User)
- Create new users
- Delete users
- Reset user passwords
- Manage user accounts

---

### Client Management
- Add new clients
- Edit client details
- Delete clients
- View complete client information
- Fast client search

Client information includes:
- Full Name
- Phone Number
- Email Address
- Domain Name
- WHMCS Username

---

### Smart Client Search

Search clients instantly using:

- Phone Number
- Email Address
- Domain Name
- Note ID

---

### Notes Management

Users can create communication records for clients.

Each note contains:

- Unique Note ID
- Note Type
  - Complaint
  - Site Down
  - General Note
- Note Content
- Timestamp
- Author
- Optional File Attachment

Features:

- Add notes
- View all notes
- Reply to notes
- View reply history
- File attachments
- Complete audit trail

Notes cannot be edited or deleted, ensuring data integrity.

---

### Reply System

Users can:

- Reply to any note
- View complete reply history
- See timestamps
- See reply author

---

### Notifications

Super Users receive dashboard notifications whenever a new note is created.

---

### SMS Integration

Integrated with **Text.lk SMS API**.

When enabled, clients automatically receive an SMS containing their inquiry/reference ID after a new note is created.

---

### Dashboard Analytics

Includes visual analytics such as:

- Total Clients
- Total Notes
- Complaints
- Site Down Reports
- General Notes
- User Activity
- Charts and Summary Cards

---

### Export Reports

Export communication history as:

- PDF
- Excel (.xlsx)

Export options include:

- Individual Client Notes
- Complete System Notes

---

### File Uploads

Supports attachment uploads for notes.

Examples:

- Images
- PDFs
- Documents

---

### Responsive Design

Fully responsive interface supporting:

- Desktop
- Tablet
- Mobile Devices

---

## 🛠 Technology Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- PDFKit
- ExcelJS
- Axios

### Database

- PostgreSQL (Neon Database)

---

## 📂 Project Structure

```
client-notes-system/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── uploads/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/client-notes-system.git

cd client-notes-system
```

---

### 2. Install Backend Dependencies

```bash
cd backend

npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../frontend

npm install
```

---

## 🗄 Database Setup

Create a PostgreSQL database (Neon is recommended).

Update your `.env` file inside the backend folder.

Example:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

SMS_API_KEY=your_textlk_api_key

SMS_API_URL=https://app.text.lk/api/v3/sms/send
```

---

## ▶ Running the Application

### Backend

```bash
cd backend

npm run dev
```

---

### Frontend

```bash
cd frontend

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 🔐 User Roles

### Super User

Has full access to the system.

Permissions:

- Manage users
- Manage clients
- View all notes
- Reply to notes
- Export reports
- View analytics
- Receive notifications

---

### Normal User

Permissions:

- Search clients
- View client details
- Add notes
- Upload attachments
- Reply to notes
- View communication history

---

## 📊 Main Modules

- Authentication
- User Management
- Client Management
- Notes Management
- Reply System
- Notifications
- SMS Integration
- File Upload
- Analytics Dashboard
- Export Reports

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control
- Protected API Routes
- Secure File Uploads
- Audit Trail
- Server-side Validation

---

## 📷 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Client Management
- Notes Page
- Analytics Dashboard
- Export Reports

Example:

```
screenshots/

login.png

dashboard.png

clients.png

notes.png

analytics.png
```

---

## 🚀 Future Improvements

- Email Notifications
- Advanced Search Filters
- SMS Delivery Logs
- Cloud Storage (AWS S3)
- Activity Logs
- Multi-Organization Support
- Dark Mode
- REST API Documentation
- Two-Factor Authentication
- Real-Time Notifications using WebSockets

---

## 📄 Functional Highlights

- Centralized communication tracking
- Complete client communication history
- Fast client search
- File attachment support
- Reply management
- SMS notifications
- Dashboard analytics
- Export to PDF & Excel
- Secure authentication
- Responsive UI

---

## 👨‍💻 Developed By

**Bhagya Subhashini**

Bachelor of Information Technology (Undergraduate)

---

## 📄 License

This project was developed as an academic and organizational software solution.

You are free to fork and modify it for learning purposes. Please retain appropriate attribution where applicable.

---

## 🙏 Acknowledgements

Special thanks to:

- ITX Digital Services (PVT) LTD
- React.js
- Express.js
- PostgreSQL
- Neon Database
- PDFKit
- ExcelJS
- Text.lk SMS API

---

## ⭐ If you found this project helpful

Please consider giving the repository a **Star ⭐** on GitHub.
````
