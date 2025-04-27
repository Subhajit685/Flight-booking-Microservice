# ✈️ Flight Booking System — Microservices Architecture

This is a full-stack **Flight Booking System** built using a **microservices** architecture.

## 🏗️ Project Structure

The system is divided into five services:

| Service | Description |
| :--- | :--- |
| **API Gateway** | Acts as a single entry point (reverse proxy) to route requests to backend services. |
| **User Service** | Handles user authentication, registration, and management. |
| **Airplane Service** | Manages airplanes, airports, and flight schedules. |
| **Booking Service** | Manages flight bookings, cancellations, and booking history. |
| **Notification Service** | Sends email notifications for booking confirmations and cancellations. |

---

## 🛠️ Technologies Used

- **Node.js** + **Express.js** (Backend development)
- **MySQL** (Database for all services)
- **RabbitMQ** (Message broker for inter-service communication)
- **Docker** + **Docker Compose** (Containerization and orchestration)
- **Nodemailer** (Email notifications)

---

## 📦 How to Run Locally

### 1. Clone the repository 
- git clone https://github.com/Subhajit685/Flight-booking-Microservice.git

### 2. Prerequisites
- Docker installed

### 3. Run this docker compose commend
- docker compose up --build

