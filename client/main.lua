local nuiOpen = false

function openShopMenu(zone)
    nuiOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
        items = Config.Zones[zone].Items,
        zone = zone
    })
end

-- Create Blips
CreateThread(function()
    for k, v in pairs(Config.Zones) do
        for i = 1, #v.Pos do
            if v.ShowBlip then
                local blip = AddBlipForCoord(v.Pos[i])
                SetBlipSprite(blip, v.Type)
                SetBlipScale(blip, v.Size)
                SetBlipColour(blip, v.Color)
                SetBlipAsShortRange(blip, true)
                BeginTextCommandSetBlipName('STRING')
                AddTextComponentSubstringPlayerName(TranslateCap('shops'))
                EndTextCommandSetBlipName(blip)
            end

            exports.ox_target:addBoxZone({
                coords = v.Pos[i],
                size = vec3(1, 1, 2),
                rotation = 0,
                debug = false,
                options = {
                    {
                        name = 'shop:open',
                        event = 'esx_shops:openMenu',
                        icon = 'fa-solid fa-store',
                        label = TranslateCap('shop'),
                        zone = k
                    }
                }
            })
        end
    end
end)

RegisterNetEvent('esx_shops:openMenu', function(data)
    openShopMenu(data.zone)
end)

RegisterNUICallback('close', function(_, cb)
    nuiOpen = false
    SetNuiFocus(false, false)
    cb({})
end)

RegisterNUICallback('buy', function(data, cb)
    TriggerServerEvent('esx_shops:buyItem', data.item, data.amount, data.zone)
    cb({})
end)
