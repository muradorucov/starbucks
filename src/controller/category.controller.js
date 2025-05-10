const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");

const getCategoryList = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isActive: true }).populate({
            path: 'children',
            select: 'name'
        }).populate({
            path: 'parentId',
            select: 'name'
        });


        res.status(200).json({
            message: "Category list fetch success",
            categories,
            total: categories.length
        })
    } catch (error) {

        res.status(500).json({
            message: "While fetching categories error",
            error
        });
    }
}

const getCategoryListForAdmin = async (req, res) => {
    try {
        const categories = await categoryModel.find({ isDelete: false }).populate({
            path: 'children',
            select: 'name'
        }).populate({
            path: 'parentId',
            select: 'name'
        });


        res.status(200).json({
            message: "Category list fetch success",
            categories,
            total: categories.length
        })
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
        }).where({ isDelete: false });

        if (!populatedCategory || populatedCategory.isDelete) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            message: "Single category fetch success",
            category: populatedCategory
        });
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
    try {
        const category = await categoryModel.findById(id);
        if (!category || category.isDelete) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name || category.name;

        if (category.parentId?.toString() !== parentId) {

            if (isParent) {
                category.isParent = true;
                const parentCategory = await categoryModel.findById(category.parentId);
                if (parentCategory) {
                    parentCategory.children = parentCategory.children.filter(childId => childId.toString() !== category._id.toString());
                    await parentCategory.save();
                }
            } else {

                if (category.isParent) {
                    category.isParent = false;
                    const parentCategory = await categoryModel.findById(parentId);
                    if (parentCategory) {
                        parentCategory.children.push(category._id);
                        await parentCategory.save();
                    }
                } else {
                    const newParentCategory = await categoryModel.findById(parentId);
                    if (newParentCategory) {
                        newParentCategory.children.push(category._id);
                        await newParentCategory.save();
                    }
                    const oldParentCategory = await categoryModel.findById(category.parentId);
                    if (oldParentCategory) {
                        oldParentCategory.children = oldParentCategory.children.filter(childId => childId.toString() !== category._id.toString());
                        await oldParentCategory.save();
                    }
                }
            }
            category.parentId = parentId || null;
        }

        await category.save();
        res.status(200).json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            message: "While Category edit error",
            error
        })
    }

}

const changeStatusForCategory = async (req, res) => {
    const categoryId = req.params.id

    try {

        const category = await categoryModel.findById(id).where({ isDelete: false }).lean();
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        const list = new Set();

        async function treeFunction(id) {
            list.add(id.toString());

            if (category?.children?.length) {
                for (let childId of category.children) {
                    await treeFunction(childId);
                }
            }
        }

        await treeFunction(categoryId);

        const categoryIds = Array.from(list);

        await categoryModel.updateMany(
            { _id: { $in: categoryIds } },
            { $set: { isActive: !category.isActive } }
        );

        await productModel.updateMany(
            { categoryId: { $in: categoryIds } },
            { $set: { isActive: !category.isActive } }
        );

        res.status(200).json({
            message: "Category status changed successfully",
            categoryIds
        })

    } catch (error) {
        res.status(500).json({
            message: "While Category delete error",
            error
        })

    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id

    try {
        const category = await categoryModel.findById(categoryId).where({ isDelete: false }).lean();
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        const list = new Set();

        async function treeFunction(id) {
            list.add(id.toString());
            if (category?.children?.length) {
                for (let childId of category.children) {
                    await treeFunction(childId);
                }
            }
        }

        await treeFunction(categoryId);

        const categoryIds = Array.from(list);

        await categoryModel.updateMany(
            { _id: { $in: categoryIds } },
            { $set: { isDelete: true, isActive: false } }
        );

        await productModel.updateMany(
            { categoryId: { $in: categoryIds } },
            { $set: { isDelete: true, isActive: false } }
        );

        res.status(200).json({
            message: "Category delete success",
            categoryIds
        })

    } catch (error) {
        res.status(500).json({
            message: "While Category delete error",
            error
        })

    }
}

module.exports = {
    getCategoryList,
    getCategoryListForAdmin,
    createCategory,
    editCategory,
    deleteCategory,
    changeStatusForCategory,
    getSingleCategory
}