// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// server.js
// ... previous code ...

/* app.post('/calculate', (req, res) => {
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
}); */
