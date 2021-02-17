import fs from 'fs/promises';
import moment from "moment";

export const writeUsers = async(users) => {
     await fs.writeFile(`./data/users.json`, JSON.stringify(users, null, 4));
};

export const writeIntoData = async(path, data) => {
     const updatedData = data.map((item) => {
          item.dateOfReceiving = moment().format("MMM Do YYYY");
          return item;
     });
     return await fs.writeFile(path, JSON.stringify(updatedData, null, 4));
};