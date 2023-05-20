const { adModel } = require("../Models/ad.model");

// Post new Product
const postProduct = async (req, res) => {
  const { name, description, category, imageUrl, location, date, price } =
    req.body;

  try {
    const newAd = new adModel({
      name,
      description,
      category,
      imageUrl,
      location,
      date,
      price,
    });
    newAd.save();
    res.send(newAd);
  } catch (error) {
    res.status(500).send({ error: "Failed to save ad" });
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  try {
    const { category, sort, search, page } = req.query;

    const query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Search by product name if provided
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Retrieve the total count of ads matching the query for pagination
    const totalCount = await adModel.countDocuments(query);

    // Pagination parameters
    const perPage = 4;
    const currentPage = parseInt(page) || 1;
    const totalPages = Math.ceil(totalCount / perPage);

    // Sort by date if requested
    const sortOption = sort === "asc" ? "date" : "-date";

    // Fetch the ads based on the query, sorting, and pagination parameters
    const ads = await adModel
      .find(query)
      .sort(sortOption)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({ ads, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch ads" });
  }
};

const deletePostProduct = async (req, res) => {
  let adId = req.params.id;
  try {
    await adModel.findByIdAndDelete({ _id: adId });
    res.send({ msg: "ad delete successfully" });
  } catch (error) {
    res.send(400).send({ error: "Something Went Wrong" });
  }
};

module.exports = { postProduct, getAllProduct, deletePostProduct };
