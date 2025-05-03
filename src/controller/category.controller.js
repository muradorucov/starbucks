const categoryModel = require("../model/category.model");

const getCategoryList = async (req, res) => {
    try {
        const categories = await categoryModel.find().populate({
            path: 'children',
            select: 'name isParent'
        }).populate({
            path: 'parentId',
            select: 'name'
        });
        res.status(200).json(categories)


    } catch (error) {

        res.status(500).json({
            message: "While fetching categories error",
            error
        });
    }
}

const createCategory = async (req, res) => {
    const { name, isParent, parentId } = req.body
    try {

        const category = {
            name,
            isParent,
            children: [],
            parentId: parentId || null
        }
        const newCategory = await categoryModel.create(category);

        if (!isParent) {
            const parentCategory = await categoryModel.findById(parentId);
            parentCategory.children.push(newCategory._id);
            await parentCategory.save();
        }

        res.status(201).json({
            message: "new Category create success",
            category: newCategory
        })
    } catch (error) {
        res.status(500).json({
            message: "While Category create error",
            error
        })
    }
}
const getSingleCategory = async (req, res) => {
    const { id } = req.params
    try {
        const populatedCategory = await categoryModel.findById(id).populate({
            path: 'parentId',
            select: 'name'
        }).populate({
            path: 'children',
            select: 'name'
        });

        if (!populatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(populatedCategory);
    } catch (error) {
        res.status(500).json({
            message: "While fetching single category error",
            error
        });
    }
}

const editCategory = async (req, res) => {
    const { name, isParent, parentId } = req.body
    const { id } = req.params

}

const deleteCategory = () => {

}

module.exports = {
    getCategoryList,
    createCategory,
    editCategory,
    deleteCategory,
    getSingleCategory
}