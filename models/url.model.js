const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
    {
        url_id: { type: String },
        original_url: {type: String}
    },
    {
      timestamps: true
    }
);

urlSchema.index({ original_url: 1}, { unique: true });

module.exports = mongoose.model("URL", urlSchema);
