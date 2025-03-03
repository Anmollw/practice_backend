const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

function calculateSum(as,bs) {
    let ans = as+bs
    return ans;
}

app.get('/', (req, res) => {
    const as = parseInt(req.query.a) || 0; // d
    const bs = parseInt(req.query.b) || 0;
    const ans = calculateSum(as,bs);
    res.send(ans.toString());
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
