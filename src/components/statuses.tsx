// create a script that can be used to display the status of a parcel

export const parcel_status = (status: number) => {
    switch (status) {
        case 0:
            return <div>Pending</div>
        case 1:
            return <div>In drop-off locker</div>
        case 2:
            return <div>In transit</div>
        case 3:
            return <div>Ready for pickup</div>
        case 4:
            return <div>Delivered</div>
    };
};

export const locker_location = (location: number) => {
    switch (location) {
        case 1:
            return <div>Locker 1 - Prisma Linnanmaa</div>
        case 2:
            return <div>Locker 2 - CityMarket Kaakkuri</div>
        case 3:
            return <div>Locker 3 - Prisma Limingantulli</div>
        case 4:
            return <div>Locker 4 - Lidl City Center</div>
        case 5:
            return <div>Locker 5 - CityMarket Rusko</div>
    }
};
