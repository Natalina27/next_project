import fs from "fs/promises";
import moment from "moment";

export const writeIntoData = (data, path) => {
        const updatedData = data.map((item) => {
            item.dateOfReceiving = moment().format("MMM Do YYYY");
            return item;
        });
    return fs.writeFile(path, JSON.stringify(updatedData, null, 4));
}