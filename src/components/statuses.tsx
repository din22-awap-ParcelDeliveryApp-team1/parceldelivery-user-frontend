
export const parcel_status = (status: String) => {
    switch (status) {
        case "ready_to_deliver":
            return "Pending";
        case "parcel_at_dropoff_locker":
            return "In drop-off locker";
        case "parcel_in_transportation":
            return "In transit";
        case "parcel_in_pickup_locker":
            return "Ready for pickup";
        case "reciever_recieved_parcel":
            return "Delivered";
        default:
            return "-";
    };
};

export const locker_location = (location: number) => {
    switch (location) {
        case 1:
            return "Locker 1 - Prisma Linnanmaa";
        case 2:
            return "Locker 2 - K-Market Kaijonharju";
        case 3:
            return "Locker 3 - Lild Tuira";
        case 4:
            return "Locker 4 - Lidl Pateniemi";
        case 5:
            return "Locker 5 - Prisma Raksila";
        default:
            return "-";
    }
};
