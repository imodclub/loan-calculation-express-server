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
    origin: '*', // Replace with your frontend origin
  })
);


// server.js
// ... previous code ...

 app.post('/calculate', (req, res) => {
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

app.post('/calculate-loan', (req, res) => {
  const { loanAmount, annualInterestRate, months } = req.body;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = months;

  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  let remainingPrincipal = loanAmount;
  const results = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingPrincipal * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;

    results.push({
      month: i,
      monthlyPayment: monthlyPayment.toFixed(2),
      principalPayment: principalPayment.toFixed(2),
      interestPayment: interestPayment.toFixed(2),
      remainingPrincipal: remainingPrincipal.toFixed(2),
    });
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});