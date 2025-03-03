const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

function calculateSum(n) {
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        ans += i;
    }
    return ans;
}

app.get('/', (req, res) => {
    const n = parseInt(req.query.n) || 0; // d
    const ans = calculateSum(n);
    res.send(ans.toString());
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
