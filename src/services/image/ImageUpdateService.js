const DiskStorage = require("../../providers/DiskStorage");

class ImageUpdateService {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ id, imageFilename, folder }) {
    const infos = await this.repository.findById(id);

    const diskStorage = new DiskStorage();

    if (infos.image) {
      await diskStorage.deleteFile(infos.image, folder);
    }

    const filename = await diskStorage.saveFile(imageFilename, folder);

    await this.repository.updateImage({ id, image: filename });
  }
}

module.exports = ImageUpdateService;
