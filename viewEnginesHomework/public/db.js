(function () {
    'use strict';

    var phones = [
        {
            name: 'Samsung Galaxy s5',
            price: 1200
        },
        {
            name: 'Samsung Galaxy s6',
            price: 1600
        },
        {
            name: 'Nokia lumia 630',
            price: 600
        },
        {
            name: 'LG G3',
            price: 750
        },
    ];

    var tablets = [
        {
            name: 'Lenovo A4000',
            price: 550
        },
        {
            name: 'Samsung Galaxy Tab7',
            price: 250
        },
        {
            name: 'Sony Xperia Tab Z',
            price: 1100
        }
    ];

    var wearables = [
        {
            name: 'Sony Smartwatch 2',
            price: 220
        },
        {
            name: 'Sony Smartwatch 3',
            price: 400
        },
        {
            name: 'Galaxy Gear',
            price: 385
        }
    ];

    var description = {generic: 'The Gadget smartphone was launched in May 2012. The phone comes with a 4.80-inch touchscreen display with a resolution of 720 pixels by 1280 pixels at a PPI of 306 pixels per inch.The The Gadget is powered by 1.4GHz quad-core and it comes with 1GB of RAM. The phone packs 16GB of internal storage that can be expanded up to 64GB via a microSD card. As far as the cameras are concerned, the The Gadget packs a 8-megapixel primary camera on the rear and a 1.9-megapixel front shooter for selfies. The The Gadget runs Android 4 and is powered by a 2100mAh removable battery. It measures 136.60 x 70.60 x 8.60 (height x width x thickness) and weighs 133.00 grams.'};

    module.exports = {
        phones: phones,
        tablets: tablets,
        wearables: wearables,
        description: description
    }
} ());
