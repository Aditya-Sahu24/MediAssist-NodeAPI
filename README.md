# MediAssist API

## Overview

This is a Node.js-based API for managing doctors, patients, appointment, medical records, prescription, billing and more. The project is structured with TypeScript and uses Webpack for bundling.

## Project Structure

```
MediAssist-ReactApp/
├── build-config.js        # Build configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── webpack.config.js     # Webpack bundling configuration
├── scripts/
│   └── obfuscate.js      # Script for code obfuscation
├── src/
│   ├── index.ts          # Main entry point of the API
│   ├── config/
│   │   └── db.ts         # Database configuration
│   ├── controllers/      # API controllers
│   ├── docs/             # API documentation (Swagger)
│   ├── routes/           # API routes
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Aditya-Kumar-Sahu-24/MediAssist-ReactApp.git
   cd MediAssist-ReactApp
   git pull origin master
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the environment variables in a `.env` file.

## Running the Application

### Development Mode

```sh
npm run dev
```

### Production Mode

```sh
npm run build
npm start
```

## API Endpoints

The API includes the following modules:

- **Doctor Details**
- **Patient Details**
- **Appointment Details**
- **Medical Record Details**
- **Prescription Details**
- **Billing Details**

## API Documentation

Swagger documentation is available. To view it, start the application and visit:

```
http://localhost:PORT/docs
```

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch and create a pull request.

## License

This project is licensed under the MIT License.

## Contact Information

For any queries or support, please contact:

- **Email:** aditya283270@gmail.com
- **GitHub:** (https://github.com/Aditya-Kumar-Sahu-24)
- **LinkedIn:** (https://www.linkedin.com/in/adityakumarsahu/)
