// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false })); // สำหรับรับค่าจาก form

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: 'https://www.visitors-it.com/2024/07/test-form/', // Replace with your frontend origin
  })
);


// server.js
// ... previous code ...

 app.post('/', (req, res) => {
  const { principal, annualInterestRate, years, monthlyPayment } = req.body;

  const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = years * 12;

    let balance = principal;
    let totalInterest = 0;
    const payments = [];

    for (let i = 0; i < totalMonths; i++) {
        const interest = balance * monthlyInterestRate;
        totalInterest += interest;
        const principalPayment = monthlyPayment - interest;
        balance -= principalPayment;

        payments.push({
            month: i + 1,
            interest: interest.toFixed(2),
            principalPayment: principalPayment.toFixed(2),
            balance: balance.toFixed(2),
        });
    }

    res.json({
        totalInterest: totalInterest.toFixed(2),
        payments: payments,
    });
}); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});