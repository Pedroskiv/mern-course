const formidable    = require("formidable");
const _             = require("lodash");
const fs            = require("fs");

const Videogame = require("../models/Videogame");
// const { errorHandler }  = require("../helpers/dberrorHanlder");

// Crear videojuego
exports.create = (req, res) =>
{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => 
    {
        if (err)
            return res.status(400).json({
                error: "Image could not be uploaded"
            });

        const { name, description, price, category, quantity } = fields;
        let videogame = new Videogame(fields);

        if (files.photo)
        {
            if (files.photo.size > 1000000)
                return res.status(400).json({
                    error: "Image should be less than 1MB in size"
                });
            videogame.photo.data = fs.readFileSync(files.photo.path);
            videogame.photo.contentType = files.photo.type;
        }

        videogame.save((err, data) =>
        {
            if (err)
                return res.status(400).json({
                    error: "Something went wrong"
                });
            res.json(data);
        })
    });
}

// Listar videojuegos
exports.list = (req, res, next) =>
{
    let order   = req.query.order ? req.query.order : 'asc';
    let sortBy  = req.query.sortBy ? req.query.sortBy : 'name';

    Videogame.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .exec((err, data) => 
        {
            if (err)
                return res.status(400).json({
                    error: "Videogames not found"
                });
            res.json(data);
            next();
        })
}

// Borrar videojuego
exports.remove = (req, res) =>
{
    let videogame = req.videogame;
    
    videogame.remove((err, data) =>
    {
        if (err)
            return res.status(400).json({
                error: "Cannot be create the game"
            });

        res.json({
            message: "Videogame was successfully deleted"
        })
    })
}

// Videojuego por ID
exports.videogameById = (req, res, next, id) =>
{
    Videogame.findById(id)
        .populate("category")
        .exec((err, videogame) =>
        {
            if (err || !videogame)
                return res.status(400).json({
                    error: "Videogame was not found or does not exist"
                });

            req.videogame = videogame;
            next();
        })
}

// Mostrar imagen
exports.photo = (req, res, next) =>
{
    if (req.videogame.photo.data)
    {
        res.set("Content-Type", req.videogame.photo.contentType);
        return res.send(req.videogame.photo.data);
    }
    next();
}