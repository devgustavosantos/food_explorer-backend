const DiskStorage = require("../../providers/DiskStorage");
const uploadConfigs = require("../../configs/upload");

class MealImageUpdateService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ meal_id, imageFilename }) {
    const mealInfos = await this.mealRepository.findById(meal_id);

    const diskStorage = new DiskStorage();

    if (mealInfos.image) {
      await diskStorage.deleteFile(mealInfos.image, uploadConfigs.MEALS_FOLDER);
    }

    const filename = await diskStorage.saveFile(
      imageFilename,
      uploadConfigs.MEALS_FOLDER
    );

    function generateTime() {
      const currentTime = new Date()
        .toISOString()
        .replace("Z", "")
        .replace("T", " ");

      const formattedTime = currentTime.substring(0, currentTime.length - 4);

      return formattedTime;
    }

    const mealUpdated = {
      meal_id,
      image: filename,
      updated_at: generateTime(),
    };

    await this.mealRepository.updateImage(mealUpdated);
  }
}

module.exports = MealImageUpdateService;
