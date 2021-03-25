const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/number', (req, res) => {

    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ 'movieId': req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })
})

router.post('/favorited', (req, res) => {

    Favorite.find({ 'userFrom': req.body.userFrom, 'movieId': req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favorited: info.length > 0 })
        })
})

router.post('/removeFavorite', (req, res) => {
    Favorite.findOneAndDelete({ 'userFrom': req.body.userFrom, 'movieId': req.body.movieId })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true }) 
        })
})

router.post('/addFavorite', (req, res) => {
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

router.post('/getFavorites', (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favorites })
        })
})

module.exports = router;
