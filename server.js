const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());

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

app.get('/interest', (req, res) => {
    const principal = parseInt(req.query.principal);
    const rate = parseInt(req.query.principal);
    const time=parseInt(req.query.time);
    const interest=(principal * rate * time)/100;
    const total= principal + interest
    res.send({
    total : total,
    interest: interest
    })
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
