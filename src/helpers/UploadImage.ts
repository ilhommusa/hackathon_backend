import path from "path";

const UploadImage = (file: any) => {
  try {
        if (
          file.mimetype !== "image/jpeg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/webp" &&
          file.mimetype !== "image/svg+xml"
        ) throw Error("File format is incorrect");

        const imgName = file.name.split(".");
        const fileName = file.md5 + new Date().getTime() + "." + imgName[imgName.length - 1];
        const filePath = path.join(__dirname, "../public/images/", fileName);

        file.mv(filePath, (err: any) => {
          if (err) throw Error("Save file error");
        });

        return {
          ok: true,
          message: "Upload photo successfuly!",
          file: {
              path: fileName,
          },
        };
  } catch (error) {
    console.log("Upload", error);
  }
};
export default UploadImage;