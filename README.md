# SharePod  

**Technologies Used:**  
React, Tailwind CSS, Express, Node.js, MongoDB, Firebase, Redux, AWS S3  

## Overview  
SharePod is a scalable file-sharing platform built using the MERN stack, designed for seamless and reliable file sharing. With AWS S3 as the backbone for storage, the platform can efficiently handle over 10,000 file uploads, ensuring fast and secure file management. QR code generation enables easy file sharing, while Redux manages the state for real-time upload progress and metadata.  

## Features  
- **File Sharing Made Easy**: Upload, store, and share files effortlessly with QR code generation.  
- **Scalable Storage**: Transitioned to AWS S3 for faster, reliable uploads, supporting 10,000+ files.  
- **Real-Time Progress Tracking**: Redux-powered state management for live updates on uploads.  
- **Modern Design**: Built with React and styled using Tailwind CSS for a clean, user-friendly interface.  

## Key Achievements  
- **Performance Boost**: Optimized file uploads by integrating AWS S3, reducing upload times by 30%.  
- **Enhanced User Experience**: Added QR code generation for seamless file sharing.  
- **Reliable Storage**: Transitioned from local storage to AWS S3, improving scalability and reliability.  

## Getting Started  

### Prerequisites  
- Node.js installed on your system  
- MongoDB database setup  
- AWS S3 bucket and access credentials  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/sachethns/sharepod.git
   cd sharepod
2. Install dependencies for frontend and backen
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
3. Set up environment variables
   ```bash
   Create a .env file in the backend folder with your MongoDB, AWS S3, and Firebase credentials.

### Running the application
1. Start the backend server:
   ```bash
   cd backend
   npm start
2. Start the frontend server:
   ```bash
   cd frontend
   npm start
