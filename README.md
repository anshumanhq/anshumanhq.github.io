
---

## ⚙️ How It Works

1.  **Data Collection** – Official UPTAC closing ranks from 2023, 2024, and 2025 are stored as structured JSON files.
2.  **User Input** – The user provides a rank, category, seat type, and optional branch preference.
3.  **Matching Algorithm** – The JavaScript engine scans the cutoff data, compares the user's rank with historical trends, and calculates a "High/Medium/Low" chance for each college and branch per counselling round.
4.  **Results Display** – Results are grouped by college, sorted by the best chance, and displayed in an intuitive, expandable card format.

---

## 🗺️ Core Logic (High-Level)

```javascript
// Simplified example of the prediction flow
function predict(userRank, category, quota) {
    // 1. Filter cutoff data based on user criteria
    const filtered = cutoffData.filter(row => row.category === category && row.quota === quota);
    
    // 2. For each row, compare user rank with historical closing rank
    // 3. Assign a chance (High, Medium, Low) based on rank proximity
    // 4. Group results by college and branch
    // 5. Sort and return ranked predictions
}
```

---

## 🔧 Local Setup (Development)

To run this project locally on your machine:

1.  **Clone the repository**:
    ```
    git clone https://github.com/anshumanhq/anshumanhq.github.io.git
    cd anshumanhq.github.io/tools/uptacpredictor
    ```

2.  **Serve the files** – Since it's a static site, you can use any local server. For example:
    - Using Python 3:
      ```
      python -m http.server 8000
      ```
    - Using VS Code: Install the "Live Server" extension and click "Go Live".

3.  **Open your browser** and navigate to `http://localhost:8000`.

---

## 📊 Data Sourcing & Disclaimer

The data used in this tool is sourced from **publicly available official UPTAC counselling records** across multiple years. While every effort has been made to ensure accuracy, this tool is **not affiliated with, endorsed by, or representative of the official UPTAC counselling authority**.

> ⚠️ **Important:** All predictions are **estimates** based on historical trends. Actual admission outcomes depend on various factors, including the current year's applicant pool, seat availability, and counselling dynamics. Always refer to the official UPTAC portal for final decisions.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!  
If you have suggestions for improving the predictor or adding more data:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

## 📬 Contact & Support

Developed and maintained by **Anshuman Singh**.

- 📧 **Email**: anshumansingh3697@gmail.com  
- 🔗 **LinkedIn**: [Anshuman Singh](https://www.linkedin.com/in/anshuman-singh-662183303/)  
- 🐙 **GitHub**: [anshumanhq](https://github.com/anshumanhq)

For data correction, feature requests, or general inquiries, please use the Contact page on the live site or email directly.

---

## 📄 License

This project is open-source and available under the **MIT License**.  
You are free to use, modify, and distribute this software, provided that proper credit is given to the original author.

---

## 🌟 Acknowledgements

- Data sourced from official UPTAC counselling records (2023–2025).
- Icons provided by [Font Awesome](https://fontawesome.com/).
- Animations powered by [AOS](https://michalsnik.github.io/aos/).
- Built with ❤️ for the student community.

---

**Made with 💻 by Anshuman Singh**  
*"Empowering students with data-driven decisions."*