const jhMenu = require('./jhMenu.json')
const fs = require('fs');
const ubRestID = process.argv[2]
const {createObjectCsvWriter} = require('csv-writer')
const { v4: uuidv4 } = require('uuid');



 function reformatMenu (jhMenu) {
    const ubFormatMenu = []
    for (let i = 0; i < jhMenu.menu_categories.length; i++) {
        if (jhMenu.menu_categories[i].name === "Popular Items") {
            continue;
        }
        for (let j = 0; j < jhMenu.menu_categories[i].items.length; j++) {
            let item = {
                inventoryId: uuidv4(),
                name: jhMenu.menu_categories[i].items[j].name,
                description: jhMenu.menu_categories[i].items[j].description,
                category: jhMenu.menu_categories[i].name,
                price: parseFloat(jhMenu.menu_categories[i].items[j].price) * 100,
                currency: 'USD',
                allowSpecialInstructions: 'false',
                restaurantid_fk: ubRestID,
                cnid: jhMenu.menu_categories[i].items[j].id
            }
            ubFormatMenu.push(item);
                }
    }
    return ubFormatMenu;
}
const menu = reformatMenu(jhMenu)
fs.writeFileSync('/workspaces/vscode-remote-try-node/ubFormatMenu.json', JSON.stringify(menu))


const csvWriter = createObjectCsvWriter({
    path: '/workspaces/vscode-remote-try-node/ubFormatMenu.csv',
    header: [
        {id: 'inventoryId', title: 'inventoryId'},
        {id: 'name', title: 'name'},
        {id: 'description', title: 'description'},
        {id: 'price', title: 'price'},
        {id: 'currency', title: 'currency'},
        {id: 'category', title: 'category'},
        {id: 'allowSpecialInstructions', title: 'allowSpecialInstructions'},
        {id: 'restaurantid_fk', title: 'restaurantid_fk'},
        {id: 'cnid', title: 'cnid'}
    ]
});

csvWriter
    .writeRecords(menu)
    .then(() => console.log('The CSV file was written successfully'));
