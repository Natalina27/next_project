import fs from 'fs/promises';

export const readFromJson = async(path) => {
    const json = await fs.readFile(path, 'utf-8');
    return JSON.parse(json);
}

export const readUser = async () => {
    return await readFromJson(`./data/users.json`);
}

export const readCars = async () => {
    return await readFromJson(`./data/cars.json`);
}

export const readDiscounts = async () => {
    return await readFromJson(`./data/discounts.json`);
}

export const readNews = async () => {
    return await readFromJson(`./data/news.json`);
}