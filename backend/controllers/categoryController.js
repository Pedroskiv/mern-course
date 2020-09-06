const Category = require("../models/Category");
// const { errorHandler }  = require("../helpers/dberrorHanlder");

// Crear categoría
exports.create = (req, res) =>
{
    const category = new Category(req.body);
    category.save((err, data) =>
    {
        if (err)
            return res.status(400).json({
                // error: errorHandler(err)
                error: "La categoría no se pudo crear"
            });
        res.json({data});
    });
}

// Listar categorías
exports.list = (req, res) =>
{
    Category.find().exec((err, data) =>
    {
        if (err)
            return res.status(400).json({
                error: "Categories could not be show"
            });
        res.json(data);
    });
}

// Borrar categoría
exports.remove = (req, res) =>
{
    let category = req.category;
    
    category.remove((err, data) =>
    {
        if (err)
            return res.status(400).json({
                error: errorHandler(err)
            });

        res.json({
            message: "Category successfully deleted"
        })
    })
}

// Categoría por ID
exports.categoryById = (req, res, next, id) =>
{
    Category.findById(id).exec((err, category) =>
    {
        if (err || !category)
            return res.status(400).json({
                error: "Category was not found or does not exist"
            });
        req.category = category;
        next(); // Continuar proceso
    })
}