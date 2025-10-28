Config = {}
Config.DrawDistance = 7.5
Config.Locale = GetConvar('esx:locale', 'en')

Config.Zones = {
    TwentyFourSeven = {
        Items = {
            -- Food
            { name = "bread", label = TranslateCap('bread'), price = 15, category = "food" },
            { name = "sandwich", label = "Sandwich", price = 25, category = "food" },
            { name = "hamburger", label = "Hamburger", price = 35, category = "food" },
            { name = "chips", label = "Chips", price = 10, category = "food" },
            { name = "hotdog", label = "Hotdog", price = 30, category = "food" },

            -- Drinks
            { name = "water", label = TranslateCap('water'), price = 10, category = "drinks" },
            { name = "coke", label = "Coca-Cola", price = 15, category = "drinks" },
            { name = "fanta", label = "Fanta", price = 15, category = "drinks" },
            { name = "sprite", label = "Sprite", price = 15, category = "drinks" },
            { name = "energy_drink", label = "Energy Drink", price = 20, category = "drinks" },

            -- Other
            { name = "phone", label = "Phone", price = 500, category = "other" },
            { name = "medikit", label = "Medikit", price = 150, category = "other" },
            { name = "bandage", label = "Bandage", price = 50, category = "other" },
            { name = "repairkit", label = "Repair Kit", price = 250, category = "other" },
            { name = "lighter", label = "Lighter", price = 20, category = "other" }
        },
        Pos = {
            vector3(373.8, 325.8, 103.5), vector3(2557.4, 382.2, 108.6),
            vector3(-3038.9, 585.9, 7.9), vector3(-3241.9, 1001.4, 12.8),
            vector3(547.4, 2671.7, 42.1), vector3(1961.4, 3740.6, 32.3),
            vector3(2678.9, 3280.6, 55.2), vector3(1729.2, 6414.1, 35.0)
        },
        Size = 0.8, Type = 59, Color = 2, ShowBlip = true
    },

    RobsLiquor = {
        Items = {
            -- Alcoholic Drinks
            { name = "beer", label = "Beer", price = 18, category = "alcohol" },
            { name = "wine", label = "Wine", price = 30, category = "alcohol" },
            { name = "vodka", label = "Vodka", price = 55, category = "alcohol" },
            { name = "whiskey", label = "Whiskey", price = 65, category = "alcohol" },
            { name = "tequila", label = "Tequila", price = 60, category = "alcohol" },

            -- Snacks
            { name = "peanuts", label = "Peanuts", price = 12, category = "snacks" },
            { name = "pretzels", label = "Pretzels", price = 12, category = "snacks" },

            -- Other
            { name = "cigarett", label = "Cigarett", price = 22, category = "other" }
        },
        Pos = {
            vector3(1135.8, -982.2, 46.4), vector3(-1222.9, -906.9, 12.3),
            vector3(-1487.5, -379.1, 40.1), vector3(-2968.2, 390.9, 15.0),
            vector3(1166.0, 2708.9, 38.1), vector3(1392.5, 3604.6, 34.9),
            vector3(127.8, -1284.7, 29.2), vector3(-1393.4, -606.6, 30.3),
            vector3(-559.9, 287.0, 82.1)
        },
        Size = 0.8, Type = 93, Color = 2, ShowBlip = true
    },

    LTDgasoline = {
        Items = {
            -- Quick Snacks
            { name = "jerky", label = "Jerky", price = 18, category = "snacks" },
            { name = "donut", label = "Donut", price = 15, category = "snacks" },
            { name = "coffee", label = "Coffee", price = 12, category = "drinks" },

            -- Car Supplies
            { name = "repairkit", label = "Repair Kit", price = 250, category = "car" },
            { name = "jerry_can", label = "Jerry Can", price = 120, category = "car" },

            -- Other
            { name = "phone", label = "Phone", price = 500, category = "other" }
        },
        Pos = {
            vector3(-48.5, -1757.5, 29.4), vector3(1163.3, -323.8, 69.2),
            vector3(-707.5, -914.2, 19.2), vector3(-1820.5, 792.5, 138.1),
            vector3(1698.3, 4924.4, 42.0)
        },
        Size = 0.8, Type = 361, Color = 3, ShowBlip = true
    }
}