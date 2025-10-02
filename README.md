# 🧑‍💼 TheBestJobPortal

**TheBestJobPortal** is a full-stack job posting web application that allows users to register, log in, and manage job listings. Built with a React frontend and a Spring Boot backend, it features secure JWT-based authentication and a clean, responsive UI for seamless job interactions.

---

## ✨ Features

- 🔐 User Registration & Login (JWT Auth)
- 📄 Add, Edit, and Delete Job Listings
- 🔍 View All Jobs with Tech Stack Filtering
- 👥 Role-based Access: Only job creators can add jobs, but all users can view or edit any listing
- 🧭 Clean navigation with intuitive UI components

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React.js, CSS (Dark Theme UI)        |
| Backend      | Spring Boot, Spring Security, JWT    |
| Database     | H2 / PostgreSQL (configurable)       |
| Auth         | JSON Web Tokens (JWT)                |
| Deployment   | Local / Cloud-ready                  |

---

## 📁 Project Structure

```
TheBestJobPortal/
├── backend/
│   ├── src/
│   ├── application-sample.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Backend (Spring Boot)

1. Navigate to the backend folder:
   ```bash
   cd job_app
   ```
2. Copy `application-sample.properties` to `application.properties` and update credentials:
   ```bash
   cp application-sample.properties application.properties
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### 🎨 Frontend (React)

1. Navigate to the frontend folder:
   ```bash
   cd job-app-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## 🧪 Usage

- Register a new account or log in
- Use the "+ Add Job" button to post a new listing
- View all jobs, including those posted by other users
- Edit or delete jobs directly from the listing interface

---

## 📌 Notes

- The backend uses JWT for secure authentication and role validation.
- The frontend is styled with a dark theme and orange highlights for clarity and contrast.
- All jobs are editable by any logged-in user, but only the original poster can add new jobs.

---

## 👨‍💻 Author

**Sumit Madaan**  
Full Stack Developer | Spring-Boot | JAVA Developer | Tech Enthusiast

📧 [sumitmadaan16@gmail.com](mailto:sumitmadaan16@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/sumitmadaan16)

<img width="1882" height="909" alt="Screenshot 2025-10-02 185846" src="https://github.com/user-attachments/assets/e46f6bc5-a43e-405e-a412-a183bf24189c" />

---

<img width="1904" height="954" alt="Screenshot 2025-10-02 185855" src="https://github.com/user-attachments/assets/7a939821-ba54-4373-8488-1ada53e1cf96" />

---

<img width="1897" height="942" alt="Screenshot 2025-10-02 190237" src="https://github.com/user-attachments/assets/cb1fd027-1632-45e1-9272-707f73dcec5b" />

---

<img width="1851" height="927" alt="Screenshot 2025-10-02 190337" src="https://github.com/user-attachments/assets/f389f23b-9735-431f-9cb5-1649b7931404" />

---

<img width="1847" height="977" alt="Screenshot 2025-10-02 190350" src="https://github.com/user-attachments/assets/48d032e0-7317-4d4c-91be-1c4715200628" />
