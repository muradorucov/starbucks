const aboutModel = require("../model/about.model");

const getAboutInfo = async (req, res) => {
    try {
        const aboutInfo = await aboutModel.findOne({});
        if (!aboutInfo) {
            return res.status(404).json({
                message: "About info not found"
            })
        }
        return res.status(200).json({
            message: "About info fetched successfully",
            data: aboutInfo
        })

    } catch (error) {

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const updateOrCreateAboutInfo = async (req, res) => {
    const { description } = req.body;
    const image = req.file;


    try {
        if (!description && !image) {
            return res.status(400).json({
                message: "Description and image are required"
            })
        }

        const aboutInfo = {
            description,
            image: image.filename
        }
        const newInfo = await aboutModel.findOneAndUpdate({}, aboutInfo, { upsert: true, new: true });


        return res.status(200).json({
            message: "About info updated successfully",
            data: newInfo
        })



    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    getAboutInfo,
    updateOrCreateAboutInfo
}

