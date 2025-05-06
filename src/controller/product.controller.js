const productModel = require("../model/product.model");

const getProductList = async (req, res) => {
    const id = req.params.categoryId;
    try {
        const products = await productModel.find({ categoryId: id }).populate("categoryId", "name");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "While getting product list",
            error
        })

    }
}
const getSingleProduct = async (req, res) => {

}
const createProduct = async (req, res) => {
    const { name, description, categoryId } = req.body;
    const image = req.file;
    try {

        const product = {
            name,
            description,
            categoryId,
            image: image.filename
        }

        const newProduct = await productModel.create(product)

        res.status(201).json({
            message: "New Product create at success",
            newProduct
        })


    } catch (error) {
        res.status(500).json({
            message: "While product create ",
            error
        })
    }

}
const editProduct = () => {

}
const changeStatusForProduct = () => {

}


module.exports = {
    getProductList,
    getSingleProduct,
    createProduct,
    editProduct,
    changeStatusForProduct
}
