const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    
    // Separate numbers and alphabets
    const numbers = data.filter(x => !isNaN(x));
    const alphabets = data.filter(x => /^[a-zA-Z]+$/.test(x));
    
    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(x => /^[a-z]+$/.test(x));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().pop()] 
        : [];

    // Construct the response
    const response = {
        "is_success": true,
        "user_id": "your_name_ddmmyyyy", // Replace with your full name and DOB in format
        "email": "your_email@college.com", // Replace with your college email
        "roll_number": "your_roll_number", // Replace with your roll number
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({"operation_code": 1});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Corrected console.log statement
});
