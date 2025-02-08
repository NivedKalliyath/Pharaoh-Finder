# 🐫 Pharaoh-Finder

## 💻 Introduction

This project implements, Pharaoh Finder, an object detection system that identifies whether an aircraft is present in an image provided by the user, and classifies if the aircraft in the image is identified as an enemy aircraft. Using a simple ReactJS frontend and a Flask backend, the system lets users select one of four representative city options, upload an image, and then see an annotated boxed output. An alert is issued if the detected airplane class does not match the user’s selection, in which case it is considered as an enemy aircraft.


## 📖 Table of Contents

- [💻 Introduction](#introduction)
- [📚 Technology Stack](#technology-stack)
- [🔥 Features](#features)
- [🏎️ Local Installation](#local-installation)
- [👥 Contributors](#contributors)

## 📚 Technology Stack

- **Frontend:** ReactJS, Tailwind CSS
- **Backend:** Flask API
- **Machine Learning:** Transfer Learning Model (Based on YOLO V8)
- **Others:** HTML, CSS, JavaScript, Python, NumPy

## 🔥 Features

- **Aircraft Detection**: Effortlessly upload an image to have our AI model accurately detect and localize aircraft. Each identified aircraft is highlighted with a bounding box, providing clear visual confirmation of detection.

- **Aircraft Classification**:  Choose your home city from a predefined list representing each city’s fleet. The system then automatically classifies detected aircraft as either friendly (home city) or hostile (enemy city), based on the selection.

- **Alert System**: Immediately receive an alert if any aircraft in the image are classified as enemy. This real-time notification helps ensure prompt action when a potential threat is detected.


## 🏎️ Local Installation


Clone the project

```bash
  git clone https://github.com/nxd010/Pharaoh-Finder
```

Go to the project directory.

```bash
  cd Pharaoh-Finder
```

Go to the backend directory and start the backend server.

```bash
  cd backend
  python app.py
```

Go to the frontend directory and start the website to load the user interface.

```bash
  cd ..
  cd frontend
  npm run dev
```

## 👥 Contributors

Team Name : Five Big Booms!
* [Nischal Deo](https://github.com/nxd010)
* [Nived Kalliyath](https://github.com/NivedKalliyath)
* [Adithya Sarma](https://github.com/adithyasarma24)
* [Rushan Dayma](https://github.com/RushanDayma)
