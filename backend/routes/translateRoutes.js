const express = require("express");
const router = express.Router();
const translate = require('translate-google');

router.post("/", async (req, res) => {
    const { text, language } = req.body;

    const translation = await translate(text, {from: 'auto', to: language});
    res.status(200).json({translation: translation});
});

module.exports = router;