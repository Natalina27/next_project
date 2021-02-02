import  fs from "fs/promises";

export const increase = async () => {
    try {
        const source = await fs.readFile(path.resolve('views.json'), 'utf-8');
        const data = JSON.parse(source);
        const increasedValue = data.views + 1;
        data.views = increasedValue;

        await fs.writeFile(path.resolve('views.json'), JSON.stringify(data, null, 4));

        return increasedValue;
    } catch (error) {
        console.error(error.message)
    }
};
