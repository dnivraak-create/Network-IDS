# NetGuard AI - Network Intrusion Detection System

## 📌 Project Overview
This project is a web-based **Network Intrusion Detection System (IDS)** using Machine Learning. It analyzes network packets to detect anomalies and classify attacks such as **DoS (Denial of Service)**, **ARP Spoofing**, and **Port Scanning**.

## 🚀 Quick Start (Frontend Demo)
Since this is a React application, you can view the **Simulated Demo** immediately by running the frontend:

1.  `npm install`
2.  `npm start`
3.  Open browser to the provided URL.
4.  Navigate to **Live Analysis** and click **Start Capture**. 
    *   *Note: By default, the frontend uses an internal simulation engine so you can demo it without the Python backend running.*

---

## 🐍 Running the Python Backend (Optional for Viva)
To run the full stack with the Python backend logic:

1.  **Navigate to backend folder:**
    ```bash
    cd backend
    ```

2.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Server:**
    ```bash
    python main.py
    ```
    The server will start at `http://localhost:8000`.

## 🛠 Features
1.  **Dashboard**: Real-time stats on packet counts and threat levels.
2.  **Live Analysis**: simulated packet stream classified by a Random Forest model.
3.  **Visualizations**: Charts showing attack distribution and traffic volume.
4.  **Help**: Educational documentation for Viva.

## 🧠 Machine Learning Details
*   **Algorithm**: Random Forest Classifier (Scikit-Learn).
*   **Features Used**: Source Port, Destination Port, Protocol, Packet Length.
*   **Classes**: Normal, DoS, ARP Spoof, Port Scan.
*   **Training**: The backend automatically trains a model on synthetic data on first run.

## 🎓 Viva Demo Guide
1.  **Intro**: "This is an IDS that uses ML to classify network traffic."
2.  **Show Dashboard**: Explain the KPIs (Total Packets, Alerts).
3.  **Live Analysis**: Turn it on. Select "DoS Attack" scenario. Show the red alerts appearing.
4.  **Visualizations**: Show the Pie Chart updating to reflect the DoS attack.
5.  **Theory**: Open the Help page to explain how Random Forest works.
