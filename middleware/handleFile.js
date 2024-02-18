const upload = (req, res, next) => {
    if(!req.file || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const sampleFile = req.files.sampleFile;
    const uploadPath = 'path/to/upload/directory/' + sampleFile.name;

    sampleFile.mv(uploadPath, (err) => {
        if(err) {
            return res.status(500).json({ error: err.message });
        }

        req.uploadPath = uploadPath;
        next();
    });
};

module.exports = {upload}