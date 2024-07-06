import fs from "fs";
import path from "path";

const DeleteImage = (file: any) => {
    try {
            const filePath = path.join(__dirname, "../public/images/", file);
            fs.unlinkSync(filePath);
            return {
                ok: true,
                message: "Delete photo successfuly!",
            };
    } catch (error) {
        console.log("Delete", error);
    }
}
export default DeleteImage