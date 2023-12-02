
export const parcel_status = (status: String) => {
    switch (status) {
        case "ready_to_deliver":
            return <div>Pending</div>
        case "parcel_at_dropoff_locker":
            return <div>In drop-off locker</div>
        case "parcel_in_transportation":
            return <div>In transit</div>
        case "parcel_in_pickup_locker":
            return <div>Ready for pickup</div>
        case "reciever_recieved_parcel":
            return <div>Delivered</div>
    };
};

export const locker_location = (location: number) => {
    switch (location) {
        case 1:
            return <div>Locker 1 - Prisma Linnanmaa</div>
        case 2:
            return <div>Locker 2 - K-Market Kaijonharju</div>
        case 3:
            return <div>Locker 3 - Lild Tuira</div>
        case 4:
            return <div>Locker 4 - Lidl Pateniemi</div>
        case 5:
            return <div>Locker 5 - Prisma Raksila</div>
    }
};
