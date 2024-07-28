const unformatedMenu = require('./menupages.json')
const fs = require('fs');
const ubRestID = process.argv[2]
const {createObjectCsvWriter} = require('csv-writer')



 function reformatMenu (unformatedMenu) {
    const ubFormatMenu = []
    for (let i = 0; i < unformatedMenu.restaurant.menu_category_list.length; i++) {
        for (let j = 0; j < unformatedMenu.restaurant.menu_category_list[i].menu_item_list.length; j++) {
            let item = {
                inventoryId: '<default>',
                name: unformatedMenu.restaurant.menu_category_list[i].menu_item_list[j].name,
                description: unformatedMenu.restaurant.menu_category_list[i].menu_item_list[j].description,
                category: unformatedMenu.restaurant.menu_category_list[i].menu_item_list[j].menu_category_name,
                price: unformatedMenu.restaurant.menu_category_list[i].menu_item_list[j].price.amount,
                currency: 'USD',
                allowSpecialInstructions: 'false',
                restaurantid_fk: ubRestID           
             }
            ubFormatMenu.push(item);
                }
    }
    return ubFormatMenu;
}
const menu = reformatMenu(unformatedMenu)
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
        {id: 'restaurantid_fk', title: 'restaurantid_fk'}    ]
});

csvWriter
    .writeRecords(menu)
    .then(() => console.log('The CSV file was written successfully'));
