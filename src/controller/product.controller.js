const productModel = require("../model/product.model");

const getProductList = async (req, res) => {
    const id = req.params.categoryId;
    try {
        const products = await productModel.find({ categoryId: id, isActive: true }).populate("categoryId", "name");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "While getting product list",
            error
        })
    }
}

const getAllProductList = async (req, res) => {
    try {
        const products = await productModel.find({ isDelete: false }).populate("categoryId", "name");
        res.status(200).json({
            message: "All product list fetch success",
            products,
            total: products.length
        });

    } catch (error) {
        res.status(500).json({
            message: "While getting all product list",
            error
        })

    }
}

const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const populateProduct = await productModel
            .findById(id)
            .populate("categoryId", "name")
            .where({ isActive: true });



        if (!populateProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product found",
            populateProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "While getting single product",
            error
        })
    }
}

const getSingleProductForAdmin = async (req, res) => {
    const { id } = req.params;
    try {

        const populateProduct = await productModel
            .findById(id)
            .populate("categoryId", "name")
            .where({ isDelete: false });



        if (!populateProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product found",
            populateProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "While getting single product",
            error
        })
    }
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

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    const image = req.file;

    try {
        const product = await productModel.findById(id);
        if (!product || product.isDelete) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.categoryId = categoryId || product.categoryId;
        product.image = image ? image.filename : product.image;


        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "While product edit",
            error
        })

    }
}

const changeStatusForProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product || product.isDelete) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        product.isActive = !product.isActive;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product status updated successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "While product status change",
            error
        })

    }
}


const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product || product.isDelete) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        product.isDelete = true;
        product.isActive = false;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product deleted successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "While product delete",
            error
        })

    }
}


module.exports = {
    getProductList,
    getSingleProduct,
    createProduct,
    editProduct,
    changeStatusForProduct,
    getAllProductList,
    getSingleProductForAdmin,
    deleteProduct
}
